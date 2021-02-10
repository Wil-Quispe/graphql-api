const Query = {
  user: async (_, { _id }, { User }) => {
    if (!_id) return await User.find({})
    return await User.find({ _id })
  },
  author: async (_, { _id }, { Author }) => {
    if (!_id) return await Author.find({})
    return await Author.find({ _id })
  },
  book: async (_, { _id }, { Book }) => {
    if (!_id) return await Book.find({})
    return await Book.find({ _id })
  },
}

export default Query
