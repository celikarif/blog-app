import axios from 'axios';
import { CommentDto } from '../types/CommentDto';

const BASE_URL = 'http://localhost:8080/comment';

export const saveComment = async (commentDto: CommentDto): Promise<CommentDto> => {
  try {
    const response = await axios.post(`${BASE_URL}/save`, commentDto);
    return response.data;
  } catch (error) {
    console.error('Error saving Post:', error);
    throw error;
  }
};
    

export const fetchCommentsByPostId= async (postId: number): Promise<CommentDto[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/getAllCommentsByPostId`, {
        params: { postId: postId }, 
      });
      return response.data.data;
    } catch (error) {
      console.error('Error saving Post:', error);
      throw error;
    }
  };


  
export const deleteCommentById= async (id: number): Promise<void> => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete`, {
        params: { id: id }, 
      });
      return response.data.data;
    } catch (error) {
      console.error('Error saving Post:', error);
      throw error;
    }
  };


  export const updateComment = async (commentDto: CommentDto): Promise<CommentDto> => {
    try {
      const response = await axios.put(`${BASE_URL}/update`, commentDto);
      return response.data;
    } catch (error) {
      console.error('Error update Post:', error);
      throw error;
    }
  };