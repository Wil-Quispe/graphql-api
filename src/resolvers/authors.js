import { getUserId } from "../utils"

const Authors = {
  register_by: async ({ register_by }, args, { request, User }) => {
    const userId = getUserId(request)
    return await User.findOne({ _id: register_by })
  },
  books: async ({ _id }, args, { request, Book }) => {
    const userId = getUserId(request)
    return await Book.find({ writted_by: _id })
  },
}

export default Authors
