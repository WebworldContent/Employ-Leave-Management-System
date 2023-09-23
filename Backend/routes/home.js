import express from 'express';
import { getInfo } from '../controllers/home.js';

const route = express.Router();

route.get('/', getInfo);

export default route;