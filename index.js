import express from "express"
import indexRouter from "./routes/index.routes.js"

const app = express();

app.listen(5030, console.log("http://localhost:5000"));