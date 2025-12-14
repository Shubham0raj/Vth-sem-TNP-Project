require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const questionRoutes = require("./routes/questionRoutes");
const userRoutes = require("./routes/userRoutes");


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/questions", questionRoutes);
app.use("/api/users", userRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected");
})
.catch((err) => {
  console.log("MongoDB connection error:", err);
});

app.get("/", (req, res) => {
  res.send("Quiz backend running with DB");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
