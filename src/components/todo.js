import React, { useState, useRef, useEffect } from "react";
import "./todo.css";
import { IoMdDoneAll } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId ,setEditID]=useState(0)

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim()) {
      if (editId) { // Check if editing
        const updatedTodos = todos.map((to) => {
          if (to.id === editId) {
            return { ...to, list: todo }; // Update the todo text
          }
          return to;
        });
        setTodos(updatedTodos);
        setEditID(0);
        setTodo('');
      } else {
        // If not editing, add new todo
        setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
        setTodo('');
      }
    }
  };

  const onDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };



  const onComplete = (id) => {
    let complete=todos.map((list)=>{
        if(list.id===id){
            return({...list,status:!list.status})
        }
        return list
    })
    setTodos(complete)
  };

  const onEdit =(id)=>{
    const editTodo=todos.find((to)=>to.id===id)
    setTodo(editTodo.list)
    setEditID(editTodo.id)
  }





  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Enter Your ToDo"
          className="form-control"
          onChange={(event) => setTodo(event.target.value)}
        />
        <button type="submit">{editId ? 'Edit':'Add'}</button>
      </form>
      <div className="list">
        <ul>
          {todos.map((item, index) => (
            <li className="list-items" key={index}>
              <div id={item.status ? 'list-item' : ""}>{item.list}</div>
              <span>
                <IoMdDoneAll
                  className="list-item-icons"
                  id="complete"
                  title="Complete"
                  onClick={()=>onComplete(item.id)}
                />
                <FiEdit className="list-item-icons" id="edit" title="Edit" onClick={()=>onEdit(item.id)} />
                <MdDelete
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={()=>onDelete(item.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
