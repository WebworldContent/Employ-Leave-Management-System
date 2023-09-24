import express from 'express';
import { addUser } from '../controllers/users.js';

const route = express.Router();

route.post('/addUser', addUser);

export {route as userRoute};