const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");

const schema = require("./schema/schema");

dotEnv.config();
const app = express();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to the database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
