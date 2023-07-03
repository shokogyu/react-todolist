import './App.css';
import { useMemo, useState } from "react";
import TodoAddForm from './components/TodoAddForm';
import { INIT_TODOS, INIT_UNIQUE_ID } from './constant/data';

function App() {

  /* Todoリスト */
  const [todoItems, setTodoItems] = useState(INIT_TODOS);
  /* ID採番 */
  const [uniqueID, setUniqueID] = useState(INIT_UNIQUE_ID)
  /* 検索キーワード */
  const [searchKeyword, setSearchKeyword] = useState("");

  const showTodoList = useMemo(() => {
    return todoItems.filter((todo) => {
      // 検索キーワードに部分一致したTodoだけを一覧表示する
      const regexp = new RegExp("^" + searchKeyword, "i");
      return todo.title.match(regexp);
    });
  }, [todoItems, searchKeyword]);

  const handleDeleteTodo = (id, title) => {
    // const {ids, title} = props;
    if (window.confirm(`「${title}」のtodoを削除しますか？`)) {
      // 削除するid以外のtodoリストを再編集
      // filterを用いた方法
      const newTodoList = todoItems.filter((todo) => todo.id !== id);

      // 削除するTodoの配列番号を取り出してspliceで削除する方法もある
      // const newTodoList = [...todoList];
      // const deleteIndex = newTodoList.findIndex((todo) => todo.id === targetId);
      // newTodoList.splice(deleteIndex, 1);

      // todoを削除したtodo listで更新
      setTodoItems(newTodoList);
    }
  }

  const handleSearchTodo = (e) => {
    setSearchKeyword(e.target.value);
  }

  return (
    <div className="app">
      <div className="app-inner">
        <h1 className='app-title'>TODO LIST</h1>
        <p className="app-desc">
          Reactを使ってTodoリストを作成しました。<br />
          【機能】新規登録（Enterキーで追加）/ 削除 / 前方一致検索 /
        </p>
        <div className="app-container">
          <div className='add-area'>
            <p className='add-title'>Add Todo</p>
            <div className='add-form-area'>
              <TodoAddForm
                todoItems={todoItems}
                setTodoItems={setTodoItems}
                uniqueID = {uniqueID}
                setUniqueID = {setUniqueID}
              />
            </div>
          </div>
          <div className='search-area'>
            <div className='search-form-area'>
              <input
                type="text"
                className='search-input'
                placeholder='Search Keyword'
                onChange={(e) => handleSearchTodo(e)}
              />
            </div>
          </div>
          <div className='todo-area'>
            <ul className='todo-list'>
              {showTodoList.length < 1 ? (
                <p>Todoが0件、もしくはマッチするTodoがありません</p>
              ) : (
                <>
                  {showTodoList.map((todo) => {
                    return (
                      <>
                        <li className='todo-item' key={todo.id}>
                          {/* <input type="checkbox" id={todo.id} />
                          <label htmlFor="" for={todo.id}>{todo.title}</label> */}
                          {todo.title}
                          <button className='todo-delete-button' onClick={() => handleDeleteTodo(todo.id, todo.title)}>削除</button>
                        </li>
                      </>
                    )
                  })}
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
