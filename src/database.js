import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
mongoose
  .connect(`${process.env.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(res => console.log('conected to database'))
  .catch(err => console.log(err))
