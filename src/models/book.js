import { Schema, model } from "mongoose"

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  writted_by: {
    type: Schema.ObjectId,
    ref: "Author",
  },
  register_by: {
    type: Schema.ObjectId,
    ref: "User",
  },
})

export default model("Book", bookSchema)
