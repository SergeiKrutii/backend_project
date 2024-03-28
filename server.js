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
    process.exit(1); // Выход из процесса Node.js в случае ошибки подключения к базе данных
  }
};

connectToDatabase(); // Подключаемся к базе данных

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

// mongoose
//   .connect(MONGOHOST, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     app.listen(port, "0.0.0.0", () => {
//       console.log("Database connection successful");
//     });
//   })
//   .catch((error) => {
//     console.log(error.message);
//     process.exit(1);
//   });
