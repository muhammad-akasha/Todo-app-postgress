import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

const createUserModel = (sequelize) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Fullname cannot be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: "Invalid email format" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 17],
            msg: "Password must be between 6 and 17 characters",
          },
        },
      },
    },
    {
      hooks: {
        beforeSave: async (user, options) => {
          if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      },
    },
    {
      timestamp: true,
      tableName: "user",
    }
  );

  return User;
};

export { createUserModel };
