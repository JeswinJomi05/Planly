import { useState,useEffect } from 'react';
import { Plus, Check, Trash2, Circle } from 'lucide-react';
import './TodoList.css';
import api from "../lib/axios";
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchTodo = async () => {
      try {
        const res = await api.get(`/tasks`);
        console.log("Fetched todo:", res.data);
        setTodos(res.data);
      } catch (error) {
        console.log("Error in fetching todo", error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchTodo();
  }, []);

  
  

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setLoading(true);
    try {
      const res = await api.post("/tasks", {
        title: newTodo,
      });
      fetchTodo(); // ✅ update UI instantly
      setNewTodo('');
    } catch (error) {
      console.log("Error creating task", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t._id === id);
    if (!todo) return;
    console.log("Toggling task:", id, "Current state:", !todo.isCompleted);
    try {
        await api.put(`/tasks/${id}`, {
          title: todo.title,
          isCompleted: !todo.isCompleted
        });
      setTodos(todos.map(t => 
        t._id === id ? { ...t, isCompleted: !t.isCompleted } : t
      ));
    } catch (error) {
      console.log("Error updating task", error);
    }
  };

  const deleteTodo = async (id) => {
     try {
      await api.delete(`/tasks/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.log("Error deleting task", error.response || error);
    }
    
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
        {loading ? <p>Loading...</p> : (
        <ul className="todo-list">
          {
          todos?.map(
            todo => (
            <div key={todo._id}>
            <li className={`todo-item glass ${todo.isCompleted ? 'completed' : ''}`}>
              <button 
                className="todo-toggle"
                onClick={() => toggleTodo(todo._id)}
              >
                {todo.isCompleted ? <Check className="checked-icon" size={20}/> : <Circle className="unchecked-icon" size={20}/>}
              </button>
              <span className="todo-text">{todo.title}</span>
              <button 
                className="todo-delete"
                onClick={() => deleteTodo(todo._id)}
              >
                <Trash2 size={18} />
              </button>
            </li>
            </div>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
};

export default TodoList;
