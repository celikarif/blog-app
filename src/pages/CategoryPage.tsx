import React, { useEffect, useState } from 'react';
import { Table, Button, Input } from 'reactstrap';
import { CategoryDto } from '../types/CategoryDto';

import { toast } from 'react-toastify';
import { deleteCategory, getAllCategories, saveCategory, updateCategory } from '../services/categoryService';

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [editMode, setEditMode] = useState<number | null>(null);
  const [categoryName, setCategoryName] = useState<string>('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryList = await getAllCategories();
        setCategories(categoryList);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  const handleSave = async () => {
    if (categoryName.trim() === '') {
      toast.error('Category name cannot be empty');
      return;
    }

    try {
      const newCategory: CategoryDto = { name: categoryName };
      const savedCategory = await saveCategory(newCategory);
      const updatedCategories = await getAllCategories();
      setCategories(updatedCategories);
      setCategoryName('');
      toast.success('Category added successfully');
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error('Failed to save category');
    }
  };

  const handleEdit = (category: CategoryDto) => {
    setEditMode(category.id || null);
    setCategoryName(category.name || '');
  };

  const handleUpdate = async () => {
    if (!editMode || categoryName.trim() === '') {
      toast.error('Category name cannot be empty');
      return;
    }

    try {
      const updatedCategory: CategoryDto = { id: editMode, name: categoryName };
      const result = await updateCategory(updatedCategory);
      setCategories((prev) =>
        prev.map((cat) => (cat.id === result.id ? result : cat))
      );
      setEditMode(null);
      setCategoryName('');
      toast.success('Category updated successfully');
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Failed to update category');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      toast.success('Category deleted successfully');
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Category Management</h2>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="mb-2"
        />
        {editMode ? (
          <Button color="warning" onClick={handleUpdate}>
            Update Category
          </Button>
        ) : (
          <Button color="primary" onClick={handleSave}>
            Add Category
          </Button>
        )}
      </div>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th >#</th>
            <th >Category Name</th>
            <th style={{ width: '200px' }} >Options</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.id}>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td>
                <div className="d-flex gap-2 justify-content-center">
                  <Button
                    color="warning"
                    size="sm"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => handleDelete(category.id!)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryPage;
