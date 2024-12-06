import axios from 'axios';
import { PostDto } from '../types/PostDto';

const BASE_URL = 'http://localhost:8080/post';

export const savePost = async (postDto: PostDto): Promise<PostDto> => {
  try {
    const response = await axios.post(`${BASE_URL}/save`, postDto);
    return response.data;
  } catch (error) {
    console.error('Error saving Post:', error);
    throw error;
  }
};
    
export const fetchAllPosts = async (): Promise<PostDto[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/listOfPosts`);
    return response.data.data;
  } catch (error) {
    console.error('Error saving Post:', error);
    throw error;
  }
};


export const fetchPostById= async (id: number): Promise<PostDto> => {
  try {
    const response = await axios.get(`${BASE_URL}/getPostById`, {
      params: { id: id }, 
    });
    return response.data.data;
  } catch (error) {
    console.error('Error saving Post:', error);
    throw error;
  }
};

export const updatePost = async (postDto: PostDto): Promise<PostDto> => {
  try {
    const response = await axios.put(`${BASE_URL}/update`, postDto);
    return response.data;
  } catch (error) {
    console.error('Error update Post:', error);
    throw error;
  }
};


export const deletePost = async (id: number): Promise<void> => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete` , 
      {
        params: { id: id }, 
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error update Post:', error);
    throw error;
  }
};