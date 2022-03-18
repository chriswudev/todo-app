import { useState, useEffect, createContext } from 'react';
import Storage from 'services/storage';

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [viewMode, setViewMode] = useState('list');
  const [todos, setTodos] = useState([]);
  const [originalTodos, setOriginalTodos] = useState([]);

  const getTodos = () => {
    setTodos(Storage.getTodos());
    setOriginalTodos(Storage.getTodos());
  };

  const addTodo = (todo) => {
    Storage.addTodo(todo);
    setTodos(Storage.getTodos());
  };

  const editTodo = (todo) => {
    Storage.editTodo(todo);
    setTodos(Storage.getTodos());
  };

  const deleteTodo = (todoId) => {
    Storage.removeTodo(todoId);
    setTodos(Storage.getTodos());
  };

  const handleSearch = (search) => {
    const filteredTodos = originalTodos.filter((todo) =>
      todo.description.toLowerCase().includes(search.toLowerCase())
    );
    setTodos(filteredTodos);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const values = {
    viewMode,
    todos,
    getTodos,
    addTodo,
    editTodo,
    deleteTodo,
    handleSearch,
    setViewMode,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
