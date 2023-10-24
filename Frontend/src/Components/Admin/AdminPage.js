import React, { useCallback, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import HolidayCalendar from '../Admin/HolidayCalender';
import { ListUsers } from './ListUsers';
import { useNavigate } from 'react-router-dom';

const API_PORT = 3001;
const drawerWidth = 240;

function AdminPage() {
  const navigate = useNavigate();

  const checkUserAccessablity = useCallback(async() => {
    const response = await fetch(`http://localhost:${API_PORT}/user/user-type`, {
      method: 'GET',
      credentials: 'include',
    });
    const userType = await response.json();

    if (userType[0]?.user_type !== 'super') {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    checkUserAccessablity();
  }, [checkUserAccessablity]);

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: '#1976D2' }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, backgroundColor: 'rgb(0 0 0 / 82%)', color: '#fff'},
          
        }}
      >
        <Toolbar />
        <List>
          <ListItem style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <ListItemText primary="Add Users Leaves" style={{cursor: 'pointer'}} onClick={() => navigate('/addUserLeaves')}/>
            <ListItemText primary="Add Users" style={{cursor: 'pointer'}} onClick={() => navigate('/addUser')}/>
          </ListItem>
        </List>
      </Drawer>
      <main style={{ flexGrow: 1, padding: '24px' }}>
        <Toolbar />
        <HolidayCalendar port={API_PORT}/>
        <ListUsers port={API_PORT} />
      </main>
    </div>
  );
}

export default AdminPage;
