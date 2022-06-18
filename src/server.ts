import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
const app = express()
const port = process.env.PORT || 3000
const mongo = process.env.MONGO || 'mongodb://docker:docker@localhost:27017/?authMechanism=DEFAULT&authSource=admin'


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => res.render('index'))

mongoose
  .connect(mongo)
  .then(() => {
    app.listen(port, () => console.log(`listening on port: ${port}`))
  })