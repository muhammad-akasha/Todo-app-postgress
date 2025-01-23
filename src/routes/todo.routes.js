import express from "express";
import {
  addTodo,
  allTodo,
  deleteTodo,
  updateTodo,
} from "../controllers/todos.controllers.js";
import authenticateUser from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/user/getalltodo", authenticateUser, allTodo);
router.post("/user/addtodo", authenticateUser, addTodo);
router.delete("/deletetodo", authenticateUser, deleteTodo);
router.patch("/updatetodo", authenticateUser, updateTodo);

export default router;
