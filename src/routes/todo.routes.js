import express from "express";
import {
  addTodo,
  allTodo,
  deleteTodo,
  updateTodo,
} from "../controllers/todos.controllers.js";

const router = express.Router();

router.post("/user/:id/getalltodo", allTodo);
router.post("user/:id/addtodo", addTodo);
router.delete("/deletetodo", deleteTodo);
router.patch("/updatetodo", updateTodo);

export default router;
