import express from "express";
import route from "./routes/home.js";
import {userRoute} from "./routes/users.js";
import { leaveRoutes } from "./routes/leaves.js";

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', route);
app.use('/user', userRoute);
app.use('/leaves', leaveRoutes);

app.listen(PORT, () => {
    console.log('listening on port', PORT);
})
