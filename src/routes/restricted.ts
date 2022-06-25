import express from 'express'

const router = express.Router()

router.get('/noticias', (req, res) => {
  return res.send('noticias restritas')
})

export { router as restrictedRouter }