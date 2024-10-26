const express = require("express");
const app = express();
const mongoose = require("mongoose");
const tasks = require("./routes/tasks");
const cors = require("cors")
require("dotenv").config();
const notFound = require('./middleware/notFound');
const handleError = require('./middleware/error-handler');

//middleware
app.use(express.json());
app.use(cors());

app.use("/api/v1/tasks", tasks);
app.use(notFound);
//to handle error inside async await
app.use(handleError);

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to DB successfully"))
  .catch((err) => console.log(err));

app.listen(process.env.Port, () => {
  console.log("Server Running...");
});
