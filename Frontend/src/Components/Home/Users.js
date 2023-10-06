import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

const checkOnline = (isOnline) => isOnline ? 'https://www.pngkey.com/png/detail/106-1060763_green-dot-icon-png-green-online-dot-png.png' : 'https://png.pngitem.com/pimgs/s/118-1185703_button-red-dot-circle-hd-png-download.png';

export const Users = ({port}) => {
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
        <Box sx={{ width: '100%'}} >
            <TableContainer sx={{ maxHeight: 390 }} component={Paper} style={{backgroundColor: '#c2e9fb'}}>
            <Table stickyHeader aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell >Name</TableCell>
                        <TableCell align="right" >Profile</TableCell>
                        <TableCell align="right" >Email</TableCell>
                        <TableCell align="right" >Online</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((row) => (
                        <TableRow
                        key={row.userID}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.username}
                        </TableCell>
                        <TableCell align="right"><Avatar alt="user" src={row.image} sx={{ width: 36, height: 36 }} /></TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right"><Avatar alt="online" src={checkOnline(row.status)} sx={{ width: 20, height: 20 }} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Box>
    );
}