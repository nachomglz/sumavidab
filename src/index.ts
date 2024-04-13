// importar express
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import mainRouter from './routes'
import morgan from 'morgan'

// crear aplicacion de express
let app = express()

// anadir funcionalidad a express
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173'
}))

// Anadir logger (morgan)
app.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined'))

// anadir routers externos
app.use("/api", mainRouter)
app.use("/api/test", (req, res) => {
    return res.json({ message: "Hello world" })
})

mongoose
  .connect(process.env.DB_URL ?? "")
     .then(() => {
        console.log("Mongo DB Connected")
        app.listen(4040, () => {
            console.log("=======================================")
            console.log("=======================================")
            console.log("Api corriendo en: http://localhost:4040")
            console.log("=======================================")
            console.log("=======================================")
        })
     })
     .catch((e) => {
        console.error("DB Connection error...")
        console.error(e.toString())
     })

