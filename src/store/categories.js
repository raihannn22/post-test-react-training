
import { create } from 'zustand';

const categoriesStore = create((set) => ({
  categories: JSON.parse(localStorage.getItem('categories')) || [],
  
  addCategory: (category) =>
    set((state) => {
      const updatedCategories = [...state.categories, category];
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
      return { categories: updatedCategories };
    }),
  
  removeCategory: (category) =>
    set((state) => {
      const updatedCategories = state.categories.filter((c) => c !== category);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
      return { categories: updatedCategories };
    }),
}));

export default categoriesStore;
