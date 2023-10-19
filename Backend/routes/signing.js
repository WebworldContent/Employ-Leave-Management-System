import express from "express";
import {registerUser, loginUser} from '../controllers/users.js';

const route = express.Router();

route.post('/register', registerUser);
route.post('/login', loginUser);

export {route as signingRoute};