import env from 'dotenv'
env.config()
import { GraphQLServer, PubSub } from 'graphql-yoga'
import Query from './resolvers/query'
import Mutation from './resolvers/mutation'
import Subscription from './resolvers/subscription'
import Authors from './resolvers/authors'
import Books from './resolvers/books'
import User from './models/user'
import Author from './models/author'
import Book from './models/book'
import './database'

const pubsub = new PubSub()
const resolvers = { Query, Mutation, Subscription, Authors, Books }
const context = { User, Author, Book, pubsub }
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      ...context,
    }
  },
})

server.start({ port: process.env.PORTS }, ({ port }) =>
  console.log('Server running in port', port)
)
