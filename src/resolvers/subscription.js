import { getUserId } from '../utils'

const Subscription = {
  author: {
    subscribe: (_, args, { request, pubsub }) => {
      console.log(request)
      // const userId = getUserId(request)
      return pubsub.asyncIterator('author')
    },
  },
  book: {
    subscribe: (_, { _id }, { request, pubsub }) => {
      // const userId = getUserId(request)
      return pubsub.asyncIterator(`book-${_id}`)
    },
  },
}

export default Subscription
