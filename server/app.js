const { ApolloServer } = require("apollo-server-express");
var express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Load schema & resolvers
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");
// Load db methods
const mongoDataMethods = require("./data/db");

const app = express();
app.use(cors());
//Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://khanhchau:khanhchau211@cluster0.otixw.mongodb.net/Cluster0?retryWrites=true&w=majority",
      {
        useNewUrlParser: false,
        useUnifiedTopology: true,
      }
    );

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

let server = null;
async function startServer() {
  server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ mongoDataMethods }),
  });

  await server.start();
  server.applyMiddleware({ app });
}
startServer();

app.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
});
