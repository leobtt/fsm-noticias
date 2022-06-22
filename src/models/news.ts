import mongoose from 'mongoose'

const newsModel = new mongoose.Schema({
  title: String,
  content: String,
  category: String
})

const News = mongoose.model('Noticias', newsModel)

export { News }