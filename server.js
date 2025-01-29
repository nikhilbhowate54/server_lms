const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
var cors = require("cors");
require("./db");
const appRoutes = require("./routes");

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

app.listen(5000, (req, res) => {
  console.log("Server is listening on port 5000");
});
