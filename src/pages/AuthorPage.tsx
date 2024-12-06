import React, { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';
import { UserDto } from '../types/UserDto';
import { fetchAllUsers } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthorPage: React.FC = () => {
  const [authors, setAuthors] = useState<UserDto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const userList = await fetchAllUsers();
        setAuthors(userList);
      } catch (error) {
        console.error('Error fetching authors:', error);
        toast.error('Failed to load authors');
      }
    };
    fetchAuthors();
  }, []);

  const handleAddAuthor = () => {
    navigate('/register');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-center mb-0">Author Management</h2>
        <Button color="primary" onClick={handleAddAuthor}>
          Add Author
        </Button>
      </div>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Birthday</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author, index) => (
            <tr key={author.id}>
              <td>{index + 1}</td>
              <td>{author.name}</td>
              <td>{author.email}</td>
              <td>
                {author.birthday
                  ? new Date(author.birthday).toLocaleDateString()
                  : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AuthorPage;
