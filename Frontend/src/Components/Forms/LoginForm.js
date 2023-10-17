import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const API_PORT = 3001;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const formContainerStyle = {
    maxWidth: '300px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
  };

  const buttonStyle = {
    marginTop: '16px',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = async(data) => {
    return await fetch(`http://localhost:${API_PORT}/user/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const reponse = await login(formData);
      const responseBody = await reponse.json();
      console.log(responseBody);
      if (responseBody.success) {
        navigate('/');
      }
    } catch(err) {
        console.log(err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form style={formContainerStyle} onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={buttonStyle}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
