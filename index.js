import 'dotenv/config'
import express from "express"
import indexRouter from "./routes/index.routes.js"
import itemsRouter from './routes/items.routes.js'
import loginRouter from './routes/login.routes.js'

const app = express();

app.use(express.json())
app.use(indexRouter)
app.use(itemsRouter)
app.use(loginRouter)

app.listen(5030, console.log("http://localhost:5030"));