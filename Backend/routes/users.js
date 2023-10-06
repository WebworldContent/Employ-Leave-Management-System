import express from 'express';
import { addUser, getUsers, getUsersByEmail } from '../controllers/users.js';

const route = express.Router();

route.post('/addUser', addUser);
route.get('/getUsers', getUsers);
route.get('/getUser/:email', getUsersByEmail);

export {route as userRoute};