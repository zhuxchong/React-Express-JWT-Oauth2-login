const express = require("express");
const app = express();
app.use(express.json());
var cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());

const mongoURI = `mongodb url`;
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
app.use("/user", require("./routes/user"));
app.use("/", require("./routes/index"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started at ${PORT}`));
