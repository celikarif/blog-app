import axios from 'axios';
import { CategoryDto } from '../types/CategoryDto';

const BASE_URL = 'http://localhost:8080/category';

export const saveCategory = async (categoryDto: CategoryDto): Promise<CategoryDto> => {
  try {
    const response = await axios.post(`${BASE_URL}/save`, categoryDto);
    return response.data;
  } catch (error) {
    console.error('Error saving category:', error);
    throw error;
  }
};
    

export const getAllCategories = async (): Promise<CategoryDto[]> => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data.data; 
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const updateCategory = async (categoryDto: CategoryDto): Promise<CategoryDto> => {
  try {
    const response = await axios.put(`${BASE_URL}/update`, categoryDto);
    return response.data;
  } catch (error) {
    console.error('Error saving category:', error);
    throw error;
  }
};
export const deleteCategory = async (id: number) :  Promise<void> => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete`, {
      params: { id: id }, 
    });
    return response.data;
  } catch (error) {
    console.error('Error saving category:', error);
    throw error;
  }
};