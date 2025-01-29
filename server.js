const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
var cors = require("cors");
require("./db");
const appRoutes = require("./routes");
const PORT = process.env.PORT || 5000;
const dotenv = require("dotenv");

// dot env config
dotenv.config();

app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/api", appRoutes);

// app.use((_, res) => {
//   res.send({
//     message: "Not found!",
//   });
// });

app.listen(PORT, (req, res) => {
  console.log("Server is listening on port 5000");
});
