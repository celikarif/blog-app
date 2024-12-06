import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { FaUser, FaLock, FaEnvelope, FaCalendarAlt, FaIdCard } from 'react-icons/fa';
import { saveUser } from '../services/userService';
import { UserDto } from '../types/UserDto';
import { toast } from 'react-toastify';

const CreateUserPage: React.FC = () => {
  const [formData, setFormData] = useState<UserDto>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value || undefined,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await saveUser(formData);
      toast.success("Author saved successfully");
    } catch (error) {
      toast.error("Failed to save Author");
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 4,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          marginBottom: 4,
          fontSize: '2rem',
        }}
      >
        Add Author
      </Typography>
      <Box
        sx={{
          width: '600px',
          backgroundColor: '#f8f9fa',
          borderRadius: 8,
          padding: 5,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <FaIdCard style={{ marginRight: 16, fontSize: '2rem' }} />
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            fullWidth
            size="medium"
            value={formData.name || ''}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <FaUser style={{ marginRight: 16, fontSize: '2rem' }} />
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            fullWidth
            size="medium"
            value={formData.username || ''}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <FaLock style={{ marginRight: 16, fontSize: '2rem' }} />
          <TextField
            label="Password"
            name="password"
            variant="outlined"
            fullWidth
            size="medium"
            type="password"
            value={formData.password || ''}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <FaEnvelope style={{ marginRight: 16, fontSize: '2rem' }} />
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            size="medium"
            type="email"
            value={formData.email || ''}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <FaCalendarAlt style={{ marginRight: 16, fontSize: '2rem' }} />
          <TextField
            label="Birthday"
            name="birthday"
            variant="outlined"
            fullWidth
            size="medium"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.birthday || ''}
            onChange={handleChange}
          />
        </Box>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: '#007bff',
            fontSize: '1.2rem',
            padding: '10px',
            borderRadius: 4,
            '&:hover': { backgroundColor: '#0056b3' },
          }}
          onClick={handleSubmit}
        >
          Save Author
        </Button>
      </Box>
    </Box>
  );
};

export default CreateUserPage;
