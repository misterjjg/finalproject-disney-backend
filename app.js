require("dotenv").config();

const { PORT = 3001, NODE_ENV, CONNECTION } = process.env;

const express = require("express");

const app = express();

const mongoose = require("mongoose");

if (NODE_ENV === "production") {
  mongoose.connect(CONNECTION);
} else {
  mongoose.connect("mongodb://127.0.0.1:27017/news_explorer_db");
}

const cors = require("cors");

app.use(cors());

const { errors } = require("celebrate");

const limiter = require("./utils/RateLimiter");

const { requestLogger, errorLogger } = require("./middlewares/logger");

app.use(requestLogger);

app.use(limiter);

const routes = require("./routes");

app.use(express.json());
app.use(routes);

app.use(errorLogger);

app.use(errors());

const ErrorHandler = require("./middlewares/ErrorHandler");

app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log("Database is connected");
  console.log(`App is listening on port: ${PORT}`);
});
