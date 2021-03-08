import { getUserId } from '../utils'

const Query = {
  user: async (_, { _id }, { request, User }) => {
    // const userId = getUserId(request)
    if (!_id) return await User.find({})
    return await User.find({ _id })
  },
  author: async (_, { _id }, { request, Author }) => {
    // const userId = getUserId(request)
    if (!_id) return await Author.find({})
    return await Author.find({ _id }, {})
  },
  book: async (_, { _id }, { request, Book }) => {
    // const userId = getUserId(request)
    if (!_id) return await Book.find({})
    return await Book.find({ _id })
  },
}

export default Query
