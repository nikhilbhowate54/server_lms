const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/lms";

mongoose
  .connect(uri)
  .then(() => {
    console.log("database is conneted");
  })
  .catch((err) => console.error(err));
