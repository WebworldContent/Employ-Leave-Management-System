import express from "express";
import route from "./routes/home.js";
import { userRoute } from "./routes/users.js";
import { leaveRoutes } from "./routes/leaves.js";
import { signingRoute } from "./routes/signing.js";
import cors from "cors"; // Correct import
import cookieParser from 'cookie-parser';
import { Authorization } from "./utils/jwtAuth.js";

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/user',signingRoute);
app.use('/', Authorization, route);
app.use('/user', Authorization, userRoute);
app.use('/leaves',Authorization, leaveRoutes);

app.listen(PORT, () => {
    console.log('listening on port', PORT);
})
