import express from "express";
import route from "./routes/home.js";
import {userRoute} from "./routes/users.js";
import { leaveRoutes } from "./routes/leaves.js";
import cors from "cors"; // Correct import

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/', route);
app.use('/user', userRoute);
app.use('/leaves', leaveRoutes);

app.listen(PORT, () => {
    console.log('listening on port', PORT);
})
