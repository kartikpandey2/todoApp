const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const jwtSecret = "IamTodoApp";

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let newUser = new userModel({
      name,
      email,
      password
    });

    if (name && email && password) {
      newUser = await newUser.save();
      return res.status(200).json({ status: true, data: newUser });
    } else {
      return res.status(400).json({ status: false });
    }
  } catch (err) {
    console.log(err);
    res.status(504).json({ status: false });
  }
};

const loginIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await userModel.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    const token = jwt.sign(
      {
        data: {
          email: foundUser.email
        }
      },
      jwtSecret,
      { expiresIn: "7d" }
    );
    if (isPasswordValid) {
      return res.status(200).json({ status: true, token });
    } else {
      return res.status(404).json({ status: false });
    }
  } catch (err) {
    console.log(err);
    res.status(504).json({ status: false });
  }
};

module.exports = {
  signUp,
  loginIn
};
