const Authors = {
  register_by: async ({ register_by }, args, { User }) => {
    return await User.findOne({ _id: register_by })
  },
  books: async ({ _id }, args, { Book }) => {
    return await Book.find({ writted_by: _id })
  },
}

export default Authors
