const { User, Item } = require("../models/User");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  let { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email }); 
  } catch {
    const error = new Error("no user found please check at once");
    return next(error);
  }
  if (!existingUser || existingUser.password != password) {
    const error = Error("wrong details check it");
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      "secretkeysppearshere",
      { expiresIn: "2h" }
    );
  } catch (error) {
    console.log(error);
    const err = new Error("something went wrong");
    return next(err);
  }
  res.status(200).json({
    sucess: true,
    data: {
      userId: existingUser.id,
      email: existingUser.email,
      token: token,
      password:existingUser.password
    },
  });
};
const register = async (req, res,next) => {
  const { name, email, password } = req.body;
  const newUser = User({
    name,
    email,
    password,
    creation_date: moment().format("MMMM Do YYYY, h:mm:ss a"),
    cousres:[] 
  });
  try { 
    await newUser.save();
  } catch (error) {
    const err = new Error("Error! somethink went wrong");
    next(error);
  }
  let token;
  try {
    token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
      },

      "secretkeysppearshere",
      { expiresIn: "2h" }
    );
  } catch {
    const error = new Error("something went wrong");
    return next(error);
  }
  res.status(201).json({
    sucess: true,
    data: {
      userId: newUser.id,
      email: newUser.email,
      token: token,
      password:newUser.password
    },
  });
};
const uploadItem = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const imagePath = req.file ? req.file.path : null; // Path of the uploaded image

    if (!imagePath) {
      return res.status(400).json({ message: "Image is required." });
    }

    // Create a new item
    const newItem = new Item({
      title,
      description,
      link,
      image: imagePath,
    });

    await newItem.save();
    res
      .status(201)
      .json({ message: "Item created successfully!", item: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

const userList = async (req, res) => {
  try {
    const allUser = await User.find({});
    res.status(200).json(allUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const userUpdate = async (req, res) => {
  const { id } = req.params; // Extract user ID from the route parameter
  const updateData = req.body; // Extract the update data from the request body

  try {
    // Use findByIdAndUpdate to update the user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } // Options: return updated document & validate
    );

    // Check if user was found and updated
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser); // Respond with the updated user
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle errors (e.g., invalid ID, validation errors)
  }
};
const courseList = async (req, res) => {
  try {
    const allCourse = await Item.find({});
    res.status(200).json(allCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const courseDelete = async (req, res) => {
  const { id } = req.params;
  console.log(req.data); 

  try {
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res
      .status(200)
      .json({ message: "Item deleted successfully", item: deletedItem });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Failed to delete item" });
  }
};
module.exports = {
  login,
  register,
  uploadItem,
  userList,
  userUpdate,
  courseList,
  courseDelete,
};
