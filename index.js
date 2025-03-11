import 'dotenv/config'
import express from "express"
import cors from 'cors'
import morgan from 'morgan'
import indexRouter from "./routes/index.routes.js"
import itemsRouter from './routes/items.routes.js'
import items2Router from './routes/items2.routes.js'
import items3Router from './routes/items3.routes.js'
import loginRouter from './routes/login.routes.js'
import { connectMongo } from './utils/mongodb.js'


const app = express();

connectMongo()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(indexRouter)
app.use(itemsRouter)
app.use(loginRouter)
app.use(items2Router)
app.use(items3Router)

app.listen(5030, console.log("http://localhost:5030"));