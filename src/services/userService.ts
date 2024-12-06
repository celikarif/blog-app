import axios from 'axios';
import { UserDto } from '../types/UserDto';

const BASE_URL = 'http://localhost:8080/user';

export const saveUser = async (userData: UserDto): Promise<UserDto> => {
  try {
    const response = await axios.post(`${BASE_URL}/save`, userData);
    return response.data;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
};


export const fetchAllUsers = async (): Promise<UserDto[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllUsers`);
    return response.data.data;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
};


    