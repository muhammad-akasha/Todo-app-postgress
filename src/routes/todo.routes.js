import express from "express";
import {
  addTodo,
  allTodo,
  deleteTodo,
  updateTodo,
} from "../controllers/todos.controllers.js";

const router = express.Router();

router.get("/gettodos", allTodo);
router.post("/addtodo", addTodo);
router.delete("/deletetodo", deleteTodo);
router.patch("/updatetodo", updateTodo);

export default router;
