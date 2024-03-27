const app = require("./app");
const mongoose = require("mongoose");
const { DB_HOST } = process.env;
const { PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
