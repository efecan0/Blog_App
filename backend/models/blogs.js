const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

var blogsSchema = new Schema({
    img: String,
    title: {
        type: String,
        unique: true
    },
    description: String,
    body: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: { type: Number, default: 0 },
    comments: [commentSchema]
}, {
    timestamps: true
})

var Blogs = mongoose.model('Blog', blogsSchema);

module.exports = Blogs