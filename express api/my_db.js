const mongoose = require("mongoose");

//** connection to database */
const conn_str ="mongodb+srv://root:root@cluster0.uwslr.mongodb.net/Collage?retryWrites=true&w=majority";

mongoose
  .connect(conn_str, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected successfully..."))
  .catch((error) => console.log(error));

const userSchema = new mongoose.Schema({
  name: String,
  branch: String,
  year: String,
  age: Number,
  city: String
});

const user = new mongoose.model("students", userSchema);

/** Express Mongoose Integration **/
const express = require("express");
const app = express();
const router = express.Router();

router.get("/:id", async (req, res) => {
  /** getting user email */
  console.log(req.params.id);
  let data = await user.find({ _id: req.params.id });
  console.log(data);

  // res.send(req.params);
  res.send(data);
});

router
  .route("/")
  .get(async (req, res) => {
    let data = await user.find(); // collection_name.find()
    console.log(data);
    res.send(data);
  })
module.exports = router;
