import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { Users } from './models/user'

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

Users.count({ username: 'leobtt' })
  .then(total => {
    console.log(total)
    if (total === 0) {
      const user = new Users({
        username: 'leobtt',
        password: 'adb123'
      })
      user.save(() => console.log('user created'))
    } else {
      console.log('user created skipped')
    }
  })