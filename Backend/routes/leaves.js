import express from 'express';
import { addLeavesUserBased, getLeaves, getLeavesUserBased } from '../controllers/leaves.js';

const route = express.Router();

route.post('/add-leaves', addLeavesUserBased);
route.get('/leaves', getLeaves);
route.get('/leaves/:email', getLeavesUserBased);

export {route as leaveRoutes}