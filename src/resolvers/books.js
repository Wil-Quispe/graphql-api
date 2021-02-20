import { getUserId } from "../utils"

const Books = {
  register_by: async ({ register_by }, args, { request, User }) => {
    const userId = getUserId(request)
    return await User.findOne({ _id: register_by })
  },
  writted_by: async ({ writted_by }, args, { request, Author }) => {
    const userId = getUserId(request)
    return await Author.findOne({ _id: writted_by })
  },
}

export default Books
