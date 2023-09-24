import express from 'express';
import { addUser, getUsers } from '../controllers/users.js';

const route = express.Router();

route.post('/addUser', addUser);
route.get('/getUsers', getUsers);

export {route as userRoute};