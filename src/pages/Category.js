import React, { useState } from "react";
import categoriesStore from "../store/categories";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import Table from "../component/Table.";

const Category = () => {
  const { categories, addCategory, removeCategory } = categoriesStore();
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      addCategory(newCategory);
      setNewCategory("");
    }
  };

  const categoryData = categories.map((name, index) => ({
    id: index + 1,
    name: name,
  }));

  const columns = [
    { field: "id", header: "No" },
    { field: "name", header: "Kategori" },
    {
      field: "action",
      header: "Aksi",
      body: (rowData) => (
        <Button
          label="Hapus"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={() => removeCategory(rowData.name)}
        />
      ),
    },
  ];

  return (
    <div className="p-5">
      <h1 className="mb-5 text-center font-bold">Manajemen Kategori</h1>

      <div className="mb-5">
        <InputText
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Tambahkan kategori"
          className="mr-3"
        />
        <Button onClick={handleAddCategory}>Tambah</Button>
      </div>
      <Table showGridlines columns={columns} data={categoryData} />
    </div>
  );
};

export default Category;

