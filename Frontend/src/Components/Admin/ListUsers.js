import React, {useState, useEffect, useCallback, Fragment} from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { isValidUser } from "../Util/Helper.js";

export const ListUsers = ({port}) => {
    const [users, setusers] = useState([]);
    const navigate = useNavigate();

    const getUsers = useCallback(async () => {
        const response = await fetch(`http://localhost:${port}/user/getUsers`, {
            method: 'GET',
            credentials: 'include',
        });
        if (!isValidUser(response)) {
            return navigate('/login');
        }
        const usersInfo = await response.json();
        setusers(usersInfo);
    }, [port, navigate]);

    const deleteUser = async (email) => {
        const response = await fetch(`http://localhost:${port}/user/delete-user`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({email})
        });
        if (!isValidUser(response)) {
            return navigate('/login');
        }
        const deletedResponse = await response.json();
        console.log(deletedResponse);
    };

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    console.log(users);

    return (
        <>
        <Typography variant="h5">List of Users</Typography>
        <List style={{ backgroundColor: '#fff', borderRadius: '20px', marginTop: '30px' }}>
          {users.map((data) => 
          <Fragment key={data.userID}><ListItem>
                <ListItemText primary={data.username}/>
                <ListItemText><Avatar alt="user" src={data.image} sx={{ width: 36, height: 36 }} /></ListItemText>
                <ListItemText primary={data.email} />
                <Button variant="contained" color="primary" onClick={() => navigate(`/addUser/${data.email}`)} style={{marginRight: '10px'}}>
                Edit
                </Button>
                <Button variant="contained" color="secondary" onClick={() => deleteUser(data.email)}>
                Delete
                </Button>
                </ListItem>
                <Divider />
          </Fragment>) }
        </List>
        </>
    );
};
