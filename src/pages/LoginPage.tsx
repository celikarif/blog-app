import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { FaUser, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    if (formData.username && formData.password) {
      toast.success('Login successful');
    } else {
      toast.error('Please fill in both fields');
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
        background: 'linear-gradient(to bottom, #6a11cb, #2575fc)',
        padding: 4,
      }}
    >
      <Typography
        variant="h3"
        color="white"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          marginBottom: 4,
          fontSize: '2.5rem',
        }}
      >
        Login
      </Typography>
      <Box
        sx={{
          width: '400px',
          backgroundColor: 'white',
          borderRadius: 8,
          padding: 5,
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <FaUser style={{ marginRight: 16, fontSize: '2rem' }} />
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            fullWidth
            size="medium"
            value={formData.username}
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
            value={formData.password}
            onChange={handleChange}
          />
        </Box>
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: '#2575fc',
            fontSize: '1.5rem',
            padding: '16px',
            borderRadius: 4,
            '&:hover': { backgroundColor: '#6a11cb' },
          }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
