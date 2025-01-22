import { models } from "../models/index.js";

const allTodo = async (req, res) => {
  const Todos = await models.Todo.findAll();
  if (Todos.length === 0) {
    return res.status(400).json({ message: "Please Add Todo First" });
  }

  res.status(200).json({ Todos });
};

const addTodo = async (req, res) => {
  const { title, description } = req.body;
  console.log(models);

  // Validate the input fields
  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required." });
  }

  try {
    // Create a new todo
    const newTodo = await models.Todo.create({
      title,
      description,
    });

    // Respond with the created todo
    return res.status(201).json({
      message: "Todo created successfully.",
      todo: newTodo,
    });
  } catch (error) {
    console.error("Error creating todo:", error);

    // Handle any database or server errors
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTodo = async (req, res) => {
  const { title, description } = req.body;
  let obj = {};
  if (title) {
    obj.title = title;
  }
  if (description) {
    obj.description = description;
  }
  await models.Todo.update(obj, {
    where: {
      id: 1,
    },
  });
  const todo = await models.Todo.findByPk(1);

  return res.status(200).json({
    message: "Todo updated successfully.",
    updatedTodo: todo, // Return the updated row
  });
};

const deleteTodo = async (req, res) => {
  const userId = req.body.userId;
  try {
    // Delete the user where the 'id' matches the given userId
    const result = await models.Todo.destroy({
      where: {
        id: userId,
      },
    });

    if (result === 0) {
      res.status(400).json({ message: "No user found with the given ID." });
    } else {
      res.status(201).json({ message: "User deleted successfully." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user:", error });
  }
};

export { addTodo, updateTodo, deleteTodo, allTodo };
