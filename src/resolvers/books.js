const Books = {
  register_by: async ({ register_by }, args, { User }) => {
    return await User.findOne({ _id: register_by })
  },
  writted_by: async ({ writted_by }, args, { Author }) => {
    return await Author.findOne({ _id: writted_by })
  },
}

export default Books
