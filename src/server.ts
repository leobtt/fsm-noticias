import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = process.env.PORT || 3000
const mongo = process.env.MONGO || 'mongodb://localhost/noticias'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.json({ initial: 'Hello World!!!' }))

app.listen(port, () => console.log(`listening on port: ${port}`))