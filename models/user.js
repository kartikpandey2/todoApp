const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const modelSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  todo: [todoSchema]
});

modelSchema.pre("save", async function(next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
  } catch (err) {
    console.log(err);
  }
});

module.exports = mongoose.model("user", modelSchema);
