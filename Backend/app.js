import express from "express";
import route from "./routes/home.js";

const app = express();
const PORT = 3000;
app.use(express.json());

app.use('/', route);

app.listen(PORT, () => {
    console.log('listening on port', PORT);
})
