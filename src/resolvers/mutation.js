import {
  generateToken,
  hashPassword,
  validatePassword,
  getUserId,
} from '../utils'

const Mutation = {
  signUp: async (_, { data }, { User }) => {
    const password = await hashPassword(data.password)
    const { email, ...rest } = data
    const emailTaken = await User.findOne({ email })
    if (emailTaken) throw new Error('Email is taken')
    const newUser = new User({ email, ...rest, password })  
    return {
      user: await newUser.save(),
      token: generateToken(newUser._id),
    }
  },
  login: async (_, { data }, { User }) => {
    const user = await User.findOne({ email: data.email })
    const isValid = await validatePassword(data.password, user.password)
    if (!isValid) throw new Error('Password not correct')
    return {
      user,
      token: generateToken(user._id),
    }
  },
  updateUser: async (_, { data }, { request, User }) => {
    const userId = getUserId(request)
    const { _id, password, ...rest } = data
    const UserExist = await User.findOne({ _id })
    if (!UserExist) throw new Error('User not found')
    let newPassword
    if (password) {
      newPassword = await hashPassword(password)
    }
    return await User.findOneAndUpdate(
      { _id },
      { password: newPassword, ...rest },
      { new: true }
    )
  },
  deleteUser: async (_, { _id }, { request, User }) => {
    const userId = getUserId(request)
    const UserExists = await User.findOne({ _id })
    if (!UserExists) throw new Error('User not found')
    return await User.findOneAndRemove({ _id })
  },

  createAuthor: async (_, { data }, { request, User, Author, pubsub }) => {
    const userId = getUserId(request)
    const { register_by, ...rest } = data
    const UserExist = await User.findOne({ _id: register_by })
    if (!UserExist) throw new Error('User not found')
    const newAuthor = new Author({ register_by, ...rest })
    pubsub.publish('author', {
      author: {
        mutation: 'created',
        data: newAuthor,
      },
    })
    return await newAuthor.save()
  },
  updateAuthor: async (_, { data }, { request, User, Author, pubsub }) => {
    const userId = getUserId(request)
    if (data.register_by) {
      const { _id, register_by, ...rest } = data
      const authorExist = await Author.findOne({ _id })
      const userExist = await User.findOne({ _id: register_by })
      if (!userExist) throw new Error('User not found')
      if (!authorExist) throw new Error('Author not found1')
      const updatedAuthor = await Author.findOneAndUpdate(
        { _id },
        { register_by, ...rest },
        { new: true }
      )
      pubsub.publish('author', {
        author: {
          mutation: 'updated',
          data: updatedAuthor,
        },
      })
      return updatedAuthor
    }
    const { _id, ...rest } = data
    const authorExist = await Author.findOne({ _id })
    if (!authorExist) throw new Error('Author not found2')
    const updatedAuthor = await Author.findOneAndUpdate(
      { _id },
      { ...rest },
      { new: true }
    )

    pubsub.publish('author', {
      author: {
        mutation: 'updated',
        data: updatedAuthor,
      },
    })
    return updatedAuthor
  },
  deleteAuthor: async (_, { _id }, { request, Author, pubsub }) => {
    const userId = getUserId(request)
    const authorExist = await Author.findOne({ _id })
    if (!authorExist) throw new Error('Author not exist')
    const deletedAuthor = await Author.findOneAndRemove({ _id })
    pubsub.publish('author', {
      author: {
        mutation: 'deleted',
        data: deletedAuthor,
      },
    })
    return deletedAuthor
  },

  createBook: async (_, { data }, { request, User, Author, Book, pubsub }) => {
    const userId = getUserId(request)
    const { register_by, writted_by, _id, ...rest } = data
    const UserExist = await User.findOne({ _id: register_by })
    if (!UserExist) throw new Error('User not found')
    const authorExist = await Author.findOne({ _id: writted_by })
    if (!authorExist) throw new Error('Author not found')
    const newBook = await Book({ register_by, writted_by, _id, ...rest })

    pubsub.publish(`book-${_id}`, {
      book: {
        mutation: 'created',
        data: newBook,
      },
    })

    return await newBook.save()
  },
  updateBook: async (_, { data }, { request, Book, pubsub }) => {
    const userId = getUserId(request)
    const { _id, ...rest } = data
    const bookExist = await Book.find({ _id })
    if (!bookExist) throw new Error('Book not found')
    const updatedBook = await Book.findOneAndUpdate(
      { _id },
      { ...rest },
      { new: true }
    )

    pubsub.publish(`book-${_id}`, {
      book: {
        mutation: 'updated',
        data: updatedBook,
      },
    })

    return updatedBook
  },
  deleteBook: async (_, { _id }, { request, Book, pubsub }) => {
    const userId = getUserId(request)
    const bookExist = await Book.findOne({ _id })
    if (!bookExist) throw new Error('Book not found')
    const deletedBook = await Book.findOneAndRemove({ _id })

    pubsub.publish(`book-${_id}`, {
      book: {
        mutation: 'deleted',
        data: deletedBook,
      },
    })

    return deletedBook
  },
}

export default Mutation
