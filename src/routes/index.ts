import express from 'express'
import { Users } from '../models/user'

const router = express.Router()

router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/login', async (req, res) => {
  const user = await Users.findOne({ username: req.body.username })
  const isValid = await user.checkingPassword(req.body.password)

  if (isValid) {
    req.session.user = user
    return res.redirect('/restrito/noticias')
  } else {
    return res.redirect('/login')
  }
})



export { router }