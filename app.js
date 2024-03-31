require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");

const booksRouter = require("./routes/api/books");
const usersRouter = require("./routes/api/users");
const goalsRouter = require("./routes/api/goals");
const resultRouter = require("./routes/api/result");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();
// });
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.json());
app.use(cookieParser());

app.use("/api/books", booksRouter);
app.use("/api/users", usersRouter);
app.use("/api/goals", goalsRouter);
app.use("/api/result", resultRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 404, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
