const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

// dot en configuration
dotenv.config();

// DB Connection
connectDb();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// route

app.use("/auth", require("./routes/authRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/restaurant", require("./routes/restaurantRoutes"));
app.use("/category", require("./routes/categoryRoutes"));
app.use("/food", require("./routes/foodRoutes"));

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to Food Server");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
