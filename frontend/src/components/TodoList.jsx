import { useState } from 'react';
import { Plus, Check, Trash2, Circle } from 'lucide-react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Review Planly designs', completed: true },
    { id: 2, text: 'Implement Notes feature', completed: false },
    { id: 3, text: 'Update User Profile', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([{ id: Date.now(), text: newTodo, completed: false }, ...todos]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <header className="page-header">
        <h1>Todo List</h1>
        <p>Stay on top of your daily tasks.</p>
      </header>

      <div className="glass todo-board">
        <form onSubmit={addTodo} className="todo-form">
          <input 
            type="text" 
            className="input-glass" 
            placeholder="What needs to be done?" 
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            <Plus size={20} />
            <span>Add</span>
          </button>
        </form>

        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className={`todo-item glass ${todo.completed ? 'completed' : ''}`}>
              <button 
                className="todo-toggle"
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.completed ? <Check className="checked-icon" size={20}/> : <Circle className="unchecked-icon" size={20}/>}
              </button>
              <span className="todo-text">{todo.text}</span>
              <button 
                className="todo-delete"
                onClick={() => deleteTodo(todo.id)}
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
