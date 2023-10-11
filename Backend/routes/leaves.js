import express from 'express';
import { addLeavesUserBased, getLeaves, getLeavesUserBased, addHolidays, getHolidays } from '../controllers/leaves.js';

const route = express.Router();

route.post('/add-leaves', addLeavesUserBased);
route.get('/leaves', getLeaves);
route.get('/leaves/:email', getLeavesUserBased);
route.post('/holidays', addHolidays);
route.get('/get-holidays', getHolidays);

export {route as leaveRoutes}