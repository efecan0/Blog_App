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
    img: { data: Buffer, contentType: String },
    title: String,
    body: String,
    likes: { type: Number, default: 0 },
    comments: [commentSchema]
}, {
    timestamps: true
})

var Blogs = mongoose.model('Blog', blogsSchema);

module.exports = Blogs