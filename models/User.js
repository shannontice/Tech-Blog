const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/connection');
const { hash, compare } = require('bcrypt');
const Blog = require('./Blog');

class User extends Model {
    toJSON() {
        const user = Object.assign({}, this.get());
        delete user.password;

        return user;
    }

    async validatePass(formPassword) {
        const isValid = await compare(formPassword, this.password);

        return isValid;
    }
}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                message: 'That username already exists.'
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: 4,
                    message: 'Password must be at least 4 characters.'
                }
            }
        }
    },
    {
        sequelize,
        modelName: 'user',
        hooks: {
            async beforeCreate(user) {
                user.password = await hash(user.password, 10);

                return user;
            }
        }
    }
)


User.hasMany(Blog);
Blog.belongsTo(User);

module.exports = User;