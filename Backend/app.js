import express from "express";
import route from "./routes/home.js";
import { userRoute } from "./routes/users.js";
import { leaveRoutes } from "./routes/leaves.js";
import { signingRoute } from "./routes/signing.js";
import cors from "cors"; // Allow cross origin else due to port difference req & res won't work
import { Authorization } from "./utils/jwtAuth.js";

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({credentials:true}));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.use('/user', signingRoute);
app.use('/', route);
app.use('/user', Authorization, userRoute);
app.use('/leaves', Authorization, leaveRoutes);

app.listen(PORT, () => {
    console.log('listening on port', PORT);
})
