import React, { useState } from 'react';
import categoriesStore from '../store/categories';
import toDoStore from '../store/toDoStore';

const TodoPage = () => {
  const { categories } = categoriesStore();
  const { todos, addTodo, removeTodo } = toDoStore();
  const [newTodo, setNewTodo] = useState({ description: '', date: '', category: '' });

  const handleAddTodo = () => {
    if (newTodo.description.trim() && newTodo.date && newTodo.category) {
      addTodo(newTodo);
      setNewTodo({ description: '', date: '', category: '' });
    }
  };

  return (
    <div className="container">
      <h2>Manajemen To-Do</h2>
      <div>
        <input
          type="text"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          placeholder="Deskripsi"
        />
        <input
          type="date"
          value={newTodo.date}
          onChange={(e) => setNewTodo({ ...newTodo, date: e.target.value })}
        />
        <select
          value={newTodo.category}
          onChange={(e) => setNewTodo({ ...newTodo, category: e.target.value })}
        >
          <option value="">Pilih Kategori</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        <button onClick={handleAddTodo}>Tambah</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Deskripsi</th>
            <th>Tanggal</th>
            <th>Kategori</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index}>
              <td>{todo.description}</td>
              <td>{todo.date}</td>
              <td>{todo.category}</td>
              <td>
                <button onClick={() => removeTodo(todo.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoPage;
