const Subscription = {
  author: {
    subscribe: (_, args, { pubsub }) => {
      return pubsub.asyncIterator("author")
    },
  },
  book: {
    subscribe: (_, { _id }, { pubsub }) => {
      return pubsub.asyncIterator(`book-${_id}`)
    },
  },
}

export default Subscription
