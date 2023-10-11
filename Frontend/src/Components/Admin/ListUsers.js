import React, {useState, useEffect} from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Divider } from "@mui/material";

export const ListUsers = ({port}) => {
    const [users, setusers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const response = await fetch(`http://localhost:${port}/user/getUsers`);
            const usersInfo = await response.json();
            setusers(usersInfo);
        };
        getUsers();
    });

    return (
        <>
        <Typography variant="h5">List of Users</Typography>
        <List style={{ backgroundColor: '#fff', borderRadius: '20px', marginTop: '30px' }}>
          {users.map((data) => 
          <><ListItem key={data.userID}>
                <ListItemText primary={data.username}/>
                <ListItemText><Avatar alt="user" src={data.image} sx={{ width: 36, height: 36 }} /></ListItemText>
                <ListItemText primary={data.email} />
                <Button variant="contained" color="primary" onClick={() => { /* Handle edit */ }} style={{marginRight: '10px'}}>
                Edit
                </Button>
                <Button variant="contained" color="secondary" onClick={() => { /* Handle delete */ }}>
                Delete
                </Button>
          </ListItem>
          <Divider /></>) }
        </List>
        </>
    );
};
