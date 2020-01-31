const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// connect to database
connectDB();

// initialise middleware
app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
// app.use("/api/profile", require("./routes/profile"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
