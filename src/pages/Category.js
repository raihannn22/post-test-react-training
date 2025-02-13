import React, { useState } from 'react';
import categoriesStore from '../store/categories';

const Category = () => {
  const { categories, addCategory, removeCategory } = categoriesStore();
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      addCategory(newCategory);
      setNewCategory('');
    }
  };

  return (
    <div className="container">
      <h2>Manajemen Kategori</h2>
      <div>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Tambahkan kategori"
        />
        <button onClick={handleAddCategory}>Tambah</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Kategori</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td>{category}</td>
              <td>
                <button onClick={() => removeCategory(category)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
