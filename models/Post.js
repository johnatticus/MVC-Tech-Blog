const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/config");

class Post extends Model {
    // // set up a method to run on instance data (per user) to check passwords
    // checkPassword(loginPw) {
    //     return bcrypt.compareSync(loginPw, this.password);
    //   }
};

Post.init(
    { 
        // Finish the user model
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id',
            },
        },
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscore: true,
    modelName: "Post"
    }
);

module.exports = Post;// Finish the rest of this model