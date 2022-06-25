import express from 'express'

const router = express.Router()

router.get('/login', (req, res) => {
  return res.render('login')
})

export { router }