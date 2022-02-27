import logo from './logo.svg';
import React, { useState, useReducer } from 'react'
import './App.css';

const ACTIONS = {
  ADD_TODO: 'add_todo',
  TOGGLE_TODO: 'toggle_todo',
  DELETE_TODO: 'delete_todo'
}

const reducer = (todos, action) => {
  switch(action.type) {
    case ACTIONS.ADD_TODO :
      return [...todos, newToDo(action.payload.name)]
    case ACTIONS.TOGGLE_TODO :
      return todos.map(todo=>{
        if(todo.id === action.payload.id)
        {
            return {...todo, complete:!todo.complete}
        }
        return todo
    }) 
    case ACTIONS.DELETE_TODO:
      return todos.filter(todo=> todo.id!=action.payload.id)
  }
}

const newToDo = (name) => {
  return {id: Date.now(), name: name, complete : false}
}

function App() {

  const [ name, setName ] = useState('')
  
  const [todos, dispatch] = useReducer(reducer, []);
  console.log(todos)
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({type:ACTIONS.ADD_TODO, payload:{name: name}})
    setName('')
  }

  return (
    <div className="App">
    <form onSubmit = {handleSubmit}>
     <h1 style={{color: 'blue', background: 'gold'}}>Todo Application</h1>
     <input
      type="text"
      style={{fontSize: '4rem', marginTop:'3rem'}}
      value={name}
      placeholder="Please enter a task"
      onChange={(e)=>{setName(e.target.value)}}
      />
      <div style={{marginTop: '2rem',}}>
      <button 
      style={{ fontSize: '2rem'}}
      onClick={handleSubmit}>Submit</button>
      </div>
      </form>
      {
        todos.map((todo)=>(
          <div style={{marginTop: '2rem', display:'flex', justifyContent: 'center'}}>
          <div style={{fontSize: '4rem', marginRight: '3rem', color: todo.complete ? 'green': 'red'}}>{todo.name}</div>
          <button style={{fontSize: '2rem', marginRight: '2rem'}} onClick = { () => {dispatch({type:ACTIONS.TOGGLE_TODO, payload:{id: todo.id}})}}>Toggle</button>
          <button style={{fontSize: '2rem'}} onClick = { () => {dispatch({type:ACTIONS.DELETE_TODO, payload:{id: todo.id}})}}>Delete</button>
        </div>
        ))
      }
     
    </div>
  );
}

export default App;
