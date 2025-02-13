import React from 'react'
import { create } from 'zustand';

const toDoStore = create((set) => ({
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    addTodo: (todo) =>
      set((state) => {
        const updatedTodos = [...state.todos, todo];
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        return { todos: updatedTodos };
      }),

    updateTodo: (id, updatedTodo) =>
      set((state) => {
        const updatedTodos = state.todos.map((todo) =>
          todo.id === id ? { ...todo, ...updatedTodo } : todo
        );
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        return { todos: updatedTodos };
      }),
      
    deleteTodo: (id) =>
      set((state) => {
        const updatedTodos = state.todos.filter((todo) => todo.id !== id);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        return { todos: updatedTodos };
      }),
  }));

export default toDoStore