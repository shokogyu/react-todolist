import React from 'react'

const TodoAddForm = (props) => {

  // 分割代入
  const {setTodoItems, todoItems, uniqueID, setUniqueID} = props;

  const handleAddTodo = (e) => {
    if (!e.nativeEvent.isComposing && e.key === 'Enter' && e.target.value !== "") {
      const nextUniqueId = uniqueID + 1;

      const newTodoList = [
        ...todoItems,
        {
          id: nextUniqueId,
          title: e.target.value,
        },
      ];
      setTodoItems(newTodoList);
      setUniqueID(nextUniqueId);
      document.getElementById('addInputForm').value = ''
    }
  }

  return (
    <input
      type="text"
      className='add-input'
      id='addInputForm'
      placeholder='New Todo'
      onKeyDown={(e) => handleAddTodo(e)}
    />
  )
}

export default TodoAddForm