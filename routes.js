const express = require("express");
const router = express.Router();
const userController = require("./controllers/user");
const todoController = require("./controllers/todo");

//GET Routes

router.get("/todo", todoController.getTodo);

//POST Routes

router.post("/signup", userController.signUp);

router.post("/login", userController.loginIn);

router.post("/todo", todoController.createTodo);

//PUT Routes

router.put("/todo", todoController.updateTodo);

//DELETE Routes

router.delete("/todo", todoController.deleteTodo);

module.exports = router;
