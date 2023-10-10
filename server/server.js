const express = require("express");
const { readdirSync } = require("fs");
const morgan = require("morgan");
const cors = require("cors");
const bodyParse = require("body-parser");
const connectDB = require("./Config/db")

const app = express();
connectDB()

app.post("/testdb", (req, res) => {
  const { supid, fname, lanem, tel, email } = req.body;
});

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParse.json({ limit: "10MB" }));

readdirSync("./Routes").map((item) => {
  console.log(item);
  app.use("/api", require("./Routes/" + item));
});

app.listen(5000, () => console.log("Server is Running 5000"));
