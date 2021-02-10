import { Schema, model } from "mongoose"

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  register_by: {
    type: Schema.ObjectId,
    ref: "User",
  },
})

export default model("Author", authorSchema)
