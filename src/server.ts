import express, { application } from 'express'
import mongoose from 'mongoose'
import path from 'path'
import session from 'express-session'

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any }
  }
}

import { Users } from './models/user'

import { router } from './routes'
import { newsRouter } from './routes/news'
import { restrictedRouter } from './routes/restricted'

const app = express()
const port = process.env.PORT || 3000
const mongo = process.env.MONGO || 'mongodb://docker:docker@localhost:27017/?authMechanism=DEFAULT&authSource=admin'

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: 'fsm-noticias'
}))

app.use('/', router)
app.use('/noticias', newsRouter)
app.use('/restrito', restrictedRouter)

app.use('/restrito', (req, res, next) => {
  if ('user' in req.session) {
    return next()
  }
  return res.redirect('/login')
})


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