import { models } from "../models/index.js";

const allTodo = async (req, res) => {
  const { id } = req.params; // Extracts the userId from the URL params

  if (!id) {
    return res
      .status(400)
      .json({ message: "Please create an account to add todos" });
  }

  try {
    const Todos = await models.Todo.findAll({
      where: { userId: id },
      include: {
        model: models.User, // Include the associated User model
        as: "user", // Use the alias defined in the association / relation
        attributes: ["id", "fullname", "email"], // Specify which user attributes to return (you can customize this)
      },
    });

    if (Todos.length === 0) {
      return res.status(400).json({ message: "Please add todos first" });
    }

    res.status(200).json({ Todos });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching todos." });
  }
};

const addTodo = async (req, res) => {
  const { userId } = req.params;
  const { title, description } = req.body;

  // Validate the input fields
  if (!title || !description || !userId) {
    return res
      .status(400)
      .json({ error: "Title and description are required." });
  }

  try {
    // Create a new todo
    const newTodo = await models.Todo.create({
      title,
      description,
      userId,
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
  const { title, description, id } = req.body;
  let obj = {};
  if (title) {
    obj.title = title;
  }
  if (description) {
    obj.description = description;
  }
  await models.Todo.update(obj, {
    where: {
      id,
    },
  });
  const todo = await models.Todo.findByPk(1);

  return res.status(200).json({
    message: "Todo updated successfully.",
    updatedTodo: todo, // Return the updated row
  });
};

const deleteTodo = async (req, res) => {
  const id = req.body.todoId;
  try {
    // Delete the user where the 'id' matches the given todoId
    const result = await models.Todo.destroy({
      where: {
        id,
      },
    });

    if (result === 0) {
      res.status(400).json({ message: "No Todo found with the given ID." });
    } else {
      res.status(201).json({ message: "Todo deleted successfully." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting Todo:", error });
  }
};

export { addTodo, updateTodo, deleteTodo, allTodo };
