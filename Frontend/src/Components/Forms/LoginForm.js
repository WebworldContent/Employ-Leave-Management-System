import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login submission, e.g., sending data to a server
    console.log(formData);
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
