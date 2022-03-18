export const TODO_ITEMS_KEY = 'todoItems';

const Storage = {
  getTodos() {
    const rawItems = localStorage.getItem(TODO_ITEMS_KEY);
    if (rawItems) {
      return JSON.parse(rawItems);
    }
    return [];
  },
  addTodo(todo) {
    const todos = this.getTodos();
    const newId = todos.length ? todos[todos.length - 1].id + 1 : 1;
    todo.id = newId;
    todos.push(todo);
    localStorage.setItem(TODO_ITEMS_KEY, JSON.stringify(todos));
  },
  editTodo(todo) {
    const todos = this.getTodos();
    const updatedTodos = todos.map((item) =>
      item.id === todo.id ? todo : item
    );
    localStorage.setItem(TODO_ITEMS_KEY, JSON.stringify(updatedTodos));
  },
  removeTodo(todoId) {
    const todos = this.getTodos();
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    localStorage.setItem(TODO_ITEMS_KEY, JSON.stringify(newTodos));
  },
};

export default Storage;
