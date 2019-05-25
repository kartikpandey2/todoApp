const userModel = require("../models/user");
const jwtVerificaton = require("../utils/jwtVerification");

const getTodo = async (req, res) => {
  try {
    console.log(req.headers.authorization);
    const jwtToken = jwtVerificaton(req.headers.authorization);
    if (!jwtToken) {
      return res.status(401).json({ status: false });
    }

    const queryObj = { email: jwtToken.data.email };
    const user = await userModel.findOne(queryObj);
    if (user) {
      return res.status(200).json({ status: true, data: user.todo });
    } else {
      return res.status(404).json({ status: false });
    }
  } catch (err) {
    console.log(err);
    res.status(504).json({ status: false });
  }
};

const createTodo = async (req, res) => {
  try {
    console.log(req.headers.authorization);
    const jwtToken = jwtVerificaton(req.headers.authorization);
    if (!jwtToken) {
      return res.status(401).json({ status: false });
    }
    const { title, description } = req.body;
    if (title && description) {
      const queryObj = { email: jwtToken.data.email };
      const updateObj = { $push: { todo: { title, description } } };
      const updateUser = await userModel.findOneAndUpdate(queryObj, updateObj, {
        new: true
      });

      if (updateUser) {
        return res.status(200).json({ status: true, data: updateUser.todo });
      } else {
        return res.status(404).json({ status: false });
      }
    } else {
      return res.status(400).json({ status: false });
    }
  } catch (err) {
    console.log(err);
    res.status(504).json({ status: false });
  }
};

const updateTodo = async (req, res) => {
  try {
    const jwtToken = jwtVerificaton(req.headers.authorization);
    if (!jwtToken) {
      return res.status(401).json({ status: false });
    }
    const { title, description, id } = req.body;
    if (title && description && id) {
      const queryObj = { email: jwtToken.data.email };
      const updateObj = {
        $set: {
          "todo.$[elem].title": title,
          "todo.$[elem].description": description
        }
      };
      const options = {
        new: true,
        arrayFilters: [{ "elem._id": id }]
      };
      const updateUser = await userModel.findOneAndUpdate(
        queryObj,
        updateObj,
        options
      );

      if (updateUser) {
        return res.status(200).json({ status: true, data: updateUser.todo });
      } else {
        return res.status(404).json({ status: false });
      }
    } else {
      return res.status(400).json({ status: false });
    }
  } catch (err) {
    console.log(err);
    res.status(504).json({ status: false });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const jwtToken = jwtVerificaton(req.headers.authorization);
    if (!jwtToken) {
      return res.status(401).json({ status: false });
    }
    const { id } = req.body;
    if (id) {
      const queryObj = { email: jwtToken.data.email };
      const updateObj = {
        $pull: {
          todo: { _id: id }
        }
      };
      const options = {
        new: true
      };
      const updateUser = await userModel.findOneAndUpdate(
        queryObj,
        updateObj,
        options
      );

      if (updateUser) {
        return res.status(200).json({ status: true, data: updateUser.todo });
      } else {
        return res.status(404).json({ status: false });
      }
    } else {
      return res.status(400).json({ status: false });
    }
  } catch (err) {
    console.log(err);
    res.status(504).json({ status: false });
  }
};

module.exports = {
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
};
