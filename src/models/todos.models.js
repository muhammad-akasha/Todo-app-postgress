import { DataTypes } from "sequelize";

const createTodoModel = (sequelize) => {
  const Todo = sequelize.define(
    "todo",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Title cannot be empty" },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Description cannot be empty" },
        },
      },
    },
    {
      timestamp: true,
      tableName: "todo",
    }
  );

  return Todo;
};

export { createTodoModel };
