const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, {
    foreignKey: 'user_id',
    // onDelete: 'CASCADE',
    // fill out the rest of the belongsTo relationship
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    // fill out the rest of the hasMany relationship
});

Comment.belongsTo(User, {
    // fill out the rest of the belongsTo relationship
    through: Post,
    foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
})

module.exports = {
    User,
    Comment,
    Post
};