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
          onClick={() => deleteTodo(rowData.todo.id)}
        />
      ),
    },
  ];

  return (
    <div className="p-5">
      <h2 className="mb-5 text-center font-bold">Manajemen To-Do</h2>
      <div className="grid p-fluid gap-3">
        {/* Deskripsi */}
        <div className="col-12 md:col-4">
          <label htmlFor="description" className="block font-bold mb-2">
            Deskripsi
          </label>
          <InputText
            id="description"
            type="text"
            value={newTodo.description}
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
            placeholder="Deskripsi"
          />
        </div>

        {/* Tanggal */}
        <div className="col-12 md:col-4">
          <label htmlFor="date" className="block font-bold mb-2">
            Tanggal
          </label>
          <Calendar
            id="date"
            value={newTodo.date ? new Date(newTodo.date) : null}
            onChange={(e) => {
              if (e.value) {
                const formattedDate = `${e.value.getFullYear()}-${String(
                  e.value.getMonth() + 1
                ).padStart(2, "0")}-${String(e.value.getDate()).padStart(
                  2,
                  "0"
                )}`;
                setNewTodo({ ...newTodo, date: formattedDate });
              } else {
                setNewTodo({ ...newTodo, date: "" });
              }
            }}
            placeholder="Tanggal"
            dateFormat="dd/mm/yy"
            showIcon
          />
        </div>

        {/* Kategori */}
        <div className="col-12 md:col-4">
          <label htmlFor="category" className="block font-bold mb-2">
            Kategori
          </label>
          <Dropdown
            id="category"
            value={newTodo.category}
            onChange={(e) => setNewTodo({ ...newTodo, category: e.value })}
            options={categories.map((category) => ({
              label: category,
              value: category,
            }))}
            placeholder="Pilih Kategori"
            className="w-full"
          />
        </div>

        {/* Tombol Tambah */}
        <div className="col-12 flex justify-content-start">
          <Button
            label="Tambah"
            onClick={handleAddTodo}
            className="p-button-primary max-w-14rem"
          />
        </div>
      </div>

      <Table columns={columns} data={categoryData} />
    </div>
  );
};

export default TodoPage;
