import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', function (next) {
  const user = this

  if (!user.isModified('password')) {
    return next()
  }

  bcrypt.genSalt((err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash
      return next()
    })
  })
})

userSchema.methods.checkingPassword = function (password: string) {
  return new Promise((resolve, rejected) => {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) {
        rejected(err)
      } else {
        resolve(isMatch)
      }
    })
  })
}

const Users = mongoose.model('User', userSchema)

export { Users }