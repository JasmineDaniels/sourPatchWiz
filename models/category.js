const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    //id 
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    //category_name
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
      onDelete: 'CASCADE'
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
    sequelize
  }
);

module.exports = Category;