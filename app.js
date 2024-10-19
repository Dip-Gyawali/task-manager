const express = require("express");
const app = express();
const mongoose = require("mongoose");
const tasks = require("./routes/tasks");
const cors = require("cors")
require("dotenv").config();

//middleware
app.use(express.json());
app.use(cors());

app.use("/api/v1/tasks", tasks);

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to DB successfully"))
  .catch((err) => console.log(err));

app.listen(process.env.Port, () => {
  console.log("Server Running...");
});
