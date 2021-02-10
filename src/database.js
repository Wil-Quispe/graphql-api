import mongoose from "mongoose"
// ;(async () => {
//   try {
//     await mongoose.connect(
//       "mongodb+srv://mongodb:1234@mongo-demo.k08ar.mongodb.net/node-gql?retryWrites=true&w=majority",
//       { useNewUrlParser: true, useUnifiedTopology: true }
//     )
//     console.log("conected is database")
//   } catch (error) {
//     console.error(error)
//   }
// })()

mongoose
  .connect(
    "mongodb+srv://mongodb:1234@mongo-demo.k08ar.mongodb.net/node-gql?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(res => console.log("conected to database"))
  .catch(err => console.log(err))
