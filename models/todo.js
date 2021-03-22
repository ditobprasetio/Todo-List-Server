'use strict';

module.exports = (sequelize, DataTypes) => {
  class Todo extends sequelize.Sequelize.Model{}

  Todo.init({
    // attributes
    task: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'task title is required'
        },
        notNull: {
          args: true,
          msg: 'task title is required'
        }
      }
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'description is required'
        },
        notNull: {
          args: true,
          msg: 'description is required'
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfter: {
          args: `${new Date().toLocaleDateString()}`,
          msg: "The date is already past"
        },
        notEmpty: {
          args: true,
          msg: 'Date is required'
        },
        notNull: {
          args: true,
          msg: 'Date is required'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Todo'
    // options
  })
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
  };
  return Todo;
};