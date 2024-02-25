const { DataTypes, Model } = require('sequelize');
const sequelize = require("../db/connection")

class Blog extends Model { }

Blog.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        blog_text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'blog'
    }
);

module.exports = Blog;

