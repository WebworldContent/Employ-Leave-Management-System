import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

function createData(imageUrl, name, email, isOnline) {
    return { imageUrl, name, email, isOnline };
}

const checkOnline = (isOnline) => isOnline ? 'https://www.pngkey.com/png/detail/106-1060763_green-dot-icon-png-green-online-dot-png.png' : 'https://png.pngitem.com/pimgs/s/118-1185703_button-red-dot-circle-hd-png-download.png';
const rows = [
    createData('https://qph.cf2.quoracdn.net/main-qimg-3fcfc588de60c74f2ca81baf03bdbc0b-lq', 'Frozen yoghurt', 'a@gmail.com', false),
    createData('https://i.pinimg.com/736x/42/b0/cc/42b0ccfb23b67c687334281b6f9fb5c2.jpg', 'Ice cream sandwich', 'a@gmail.com', true),
    createData('https://qph.cf2.quoracdn.net/main-qimg-3fcfc588de60c74f2ca81baf03bdbc0b-lq', 'Eclair', 'a@gmail.com', false),
    createData('https://qph.cf2.quoracdn.net/main-qimg-3fcfc588de60c74f2ca81baf03bdbc0b-lq', 'Cupcake', 'a@gmail.com', true),
    createData('https://i.pinimg.com/736x/42/b0/cc/42b0ccfb23b67c687334281b6f9fb5c2.jpg', 'Gingerbread', 'a@gmail.com', false),
    createData('', 'Ice cream sandwich', 'a@gmail.com', true),
    createData('https://qph.cf2.quoracdn.net/main-qimg-3fcfc588de60c74f2ca81baf03bdbc0b-lq', 'Eclair', 'a@gmail.com', true),
    createData('https://i.pinimg.com/736x/42/b0/cc/42b0ccfb23b67c687334281b6f9fb5c2.jpg', 'Cupcake', 'a@gmail.com', false),
    createData('https://qph.cf2.quoracdn.net/main-qimg-3fcfc588de60c74f2ca81baf03bdbc0b-lq', 'Gingerbread', 'a@gmail.com', true)
];
  
export const Users = () => {
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
                    {rows.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right"><Avatar alt="user" src={row.imageUrl} sx={{ width: 36, height: 36 }} /></TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right"><Avatar alt="online" src={checkOnline(row.isOnline)} sx={{ width: 20, height: 20 }} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Box>
    );
}