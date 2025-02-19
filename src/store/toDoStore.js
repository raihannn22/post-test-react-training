import { create } from "zustand";

const toDoStore = create((set) => ({
  todos: JSON.parse(localStorage.getItem("todos")) || [],
  addTodo: (todo) =>
    set((state) => {
      const newTodo = { id: Date.now(), ...todo }; // Tambah ID unik
      const updatedTodos = [...state.todos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
      // const updatedTodos = [...state.todos, todo, ];
      // localStorage.setItem('todos', JSON.stringify(updatedTodos));
      // return { todos: updatedTodos };
    }),

  deleteTodo: (id) =>
    set((state) => {
      const updatedTodos = state.todos.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    }),
}));

export default toDoStore;
