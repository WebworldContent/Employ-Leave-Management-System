// SimpleForm.js
import React, { useEffect, useState, useCallback } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem,
  Select,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const defaultData = {
  username: '',
  email: '',
  password: '',
  user_type: 'normal',
};

export default function UsersForm() {
  const API_PORT = 3001;
  const [formData, setFormData] = useState(defaultData);
  const navigate = useNavigate();
  const { email: updateEmailId } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchUserData = useCallback(async(updateEmailId) => {
    const response = await fetch(`http://localhost:${API_PORT}/user/getUser/${updateEmailId}`);
    const userData = await response.json();
    setFormData(userData[0]);
  }, [API_PORT]);

  useEffect(() => {
    if (updateEmailId) {
      fetchUserData(updateEmailId);
    }
  }, [fetchUserData, updateEmailId]);

  const addUser = async(data) => {
    await fetch(`http://localhost:${API_PORT}/user/addUser`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  };

  const updateUser = async(data) => {
    await fetch(`http://localhost:${API_PORT}/user/update-user/${updateEmailId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (updateEmailId) {
        updateUser(formData);
      } else {
        addUser(formData);
      }
      setFormData(defaultData);
      navigate('/admin');
    } catch(err) {
        console.log(err);
    }

  };

  console.log(updateEmailId, formData);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {updateEmailId ? 'Update' : 'Add' } User Leaves
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email" // Use type "tel" for phone numbers
          value={formData.email}
          onChange={handleChange}
          margin="normal"
        />
        {!updateEmailId && <TextField
          fullWidth
          label="Password"
          name="password"
          type="password" // Use type "tel" for phone numbers
          value={formData.password}
          onChange={handleChange}
          margin="normal"
        />}

        <Select
          fullWidth
          label="User Type"
          name="user_type"
          value={formData.user_type}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="super">Super</MenuItem>
        </Select>
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          style={{ marginTop: '16px' }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};
