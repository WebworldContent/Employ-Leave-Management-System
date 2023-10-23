import express from 'express';
import { addUser, getUsers, getUsersByEmail, updateUsers, deleteUsers, getUserType } from '../controllers/users.js';

const route = express.Router();

route.post('/addUser', addUser);
route.get('/getUsers', getUsers);
route.get('/getUser/:email?', getUsersByEmail);
route.put('/update-user/:email', updateUsers);
route.delete('/delete-user', deleteUsers);
route.get('/user-type', getUserType);

export {route as userRoute};