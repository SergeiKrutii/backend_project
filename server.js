const app = require("./app");
const mongoose = require("mongoose");
const { MONGOHOST } = process.env;
const port = process.env.PORT || 3001;

mongoose
  .connect(MONGOHOST)
  .then(() => {
    app.listen(port, "0.0.0.0", () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
