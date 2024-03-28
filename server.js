const app = require("./app");
const mongoose = require("mongoose");
const { MONGOHOST } = process.env;
const port = process.env.PORT || 3001;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGOHOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    process.exit(1);
  }
};

connectToDatabase();

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
