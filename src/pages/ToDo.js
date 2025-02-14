import React, { useState } from "react";
import categoriesStore from "../store/categories";
import toDoStore from "../store/toDoStore";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import Table from "../component/Table.";

const TodoPage = () => {
  const { categories } = categoriesStore();
  const { todos, addTodo, deleteTodo } = toDoStore();
  const [newTodo, setNewTodo] = useState({
    description: "",
    date: "",
    category: "",
  });

  const handleAddTodo = () => {
    if (newTodo.description.trim() && newTodo.date && newTodo.category) {
      addTodo(newTodo);
      setNewTodo({ description: "", date: "", category: "" });
    }
  };
  const categoryData = todos.map((todo, index) => ({
    id: index + 1,
    todo: todo,
  }));

  const columns = [
    { field: "todo.description", header: "Deskripsi" },
    { field: "todo.date", header: "Tanggal" },
    { field: "todo.category", header: "Kategori" },
    {
      field: "action",
      header: "Aksi",
      body: (rowData) => (
        <Button
          label="Hapus"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={() => deleteTodo(rowData.id)}
        />
      ),
    },
  ];

  return (
    <div className="p-5">
      <h2 className="mb-5 text-center font-bold">Manajemen To-Do</h2>
      <div>
        <InputText
          type="text"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
          placeholder="Deskripsi"
        />

        <Calendar
          value={newTodo.date}
          onChange={(e) => setNewTodo({ ...newTodo, date: e.target.value })}
          dateFormat="dd/mm/yy"
          showIcon
        />
        

        {/* <input
          type="date"
          value={newTodo.date}
          onChange={(e) => setNewTodo({ ...newTodo, date: e.target.value })}
        /> */}

        <Dropdown
          value={newTodo.category}
          onChange={(e) => setNewTodo({ ...newTodo, category: e.target.value })}
          options={categories}
          optionLabel="name"
          placeholder="Select Category"
          className="w-full md:w-14rem"
        />
        <Button onClick={handleAddTodo}>Tambah</Button>
      </div>

      <Table columns={columns} data={categoryData} />
  
        {/* <select
          value={newTodo.category}
          onChange={(e) => setNewTodo({ ...newTodo, category: e.target.value })}
        >
          <option value="">Pilih Kategori</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select> */}
      {/* <table>
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
                <button onClick={() => deleteTodo(todo.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default TodoPage;
