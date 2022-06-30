const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate')

const Blogs = require('../models/blogs');

const blogRouter = express.Router();

blogRouter.use(bodyParser.json());

blogRouter.route('/')
    .get(async (req, res, next) => {
        try {
            var blogs = await Blogs.find({});
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(blogs)
        } catch (err) {
            next(err)
        }
    })
    .post(authenticate.verifyUser, async (req, res, next) => {
        try {
            var blog = await Blogs.create({ "author": req.user._id, "body": req.body.body });
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.json(blog);
            console.log("Blog Created")
        } catch (err) {
            next(err)
        }
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        console.log('put')
        res.statusCode = 403;
        res.end('PUT operation is not supported on /blog')
    })
    .delete(authenticate.verifyAdmin, async (req, res, next) => {
        try {
            var result = await Blogs.remove({})
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(result);
        } catch (err) {
            next(err)
        }
    })

blogRouter.route('/:blogId')
    .get(async (req, res, next) => {
        try {
            const blog = await Blogs.findById(req.params.blogId)
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(blog)
        } catch (err) {
            next(err)
        }
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, async (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation is not supported on /blog/' + req.params.blogId)
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, async (req, res, next) => {
        try {
            const blog = await Blogs.findByIdAndUpdate(req.params.blogId, { $set: req.body })
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(blog)
        } catch (err) {
            next(err)
        }
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, async (req, res, next) => {
        try {
            const result = await Blogs.findByIdAndRemove(req.params.blogId)
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(result)
        } catch (err) {
            next(err)
        }
    })

blogRouter.route('/:blogId/comments')
    .get(async (req, res, next) => {
        try {
            const blog = await Blogs.findById(req.params.blogId).populate('comments.author')
            if (blog != null) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(blog.comments);
            } else {
                err = new Error(`Blog ${req.params.blogId} not found`);
                err.status = 404;
                return next(err);
            }
        } catch (err) {
            next(err)
        }
    })
    .post(authenticate.verifyUser, async (req, res, next) => {
        try {
            let blog = await Blogs.findById(req.params.blogId);
            if (blog != null) {
                req.body.author = req.user._id;
                blog.comments.push(req.body);
                const savedBlog = await blog.save();
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(savedBlog);
            }
        } catch (err) {
            next(err)
        }
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation is not supported on /blogs/' + req.params.blogId + '/comments')
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, async (req, res, next) => {
        try {
            var blog = await Blogs.findById(req.params.blogId);
            if (blog != null) {
                for (var i = (blog.comments.length - 1); i >= 0; i--) {
                    blog.comments.id(blog.comments[i]._id).remove();
                }
                var savedBlog = await blog.save();
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(savedBlog)
            } else {
                err = new Error(`Blog '${req.params.blogId}' not found`)
                err.status = 404;
                return next(err)
            }
        } catch (err) {
            next(err)
        }
    })

blogRouter.route('/:blogId/comments/:commentId')
    .get(async (req, res, next) => {
        try {
            const blog = await Blogs.findById(req.params.blogId);
            if (blog != null && blog.comments.id(req.params.commentId)) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(blog.comments.id(req.params.commentId));
            } else if (blog == null) {
                err = new Error(`Blog '${req.params.blogId}' not found`);
                err.status = 404;
                return next(err);
            } else {
                err = new Error(`Comment '${req.params.commentId}' not found`);
                err.status = 404;
                return next(err);
            }
        } catch (err) {
            next(err)
        }
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end(`POST operation is not supported on /blog/${req.params.blogId}/comments/${req.params.commentId}`);
    })
    .put(authenticate.verifyUser, async (req, res, next) => {
        try {
            var blog = await Blogs.findById(req.params.blogId);
            if (blog != null && blog.comments.id(req.params.commentId)) {
                if (blog.comments.id(req.params.commentId).author._id.toString() != req.user._id.toString()) {
                    err = new Error('You are not authorized to perform this operation');
                    err.status = 403;
                    return next(err);
                }
                if (req.body.rating) {
                    blog.comments.id(req.params.commentId).rating = req.body.rating;
                }

                if (req.body.comment) {
                    blog.comments.id(req.params.commentId).comment = req.body.comment;
                }
                var savedBlog = await blog.save();
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(savedBlog);
            } else if (blog == null) {
                err = new Error('Blog ' + req.params.blogId + ' not found');
                err.status = 404;
                return next(err);
            } else {
                err = new Error('Comment ' + req.params.commentId + ' not found');
                err.status = 404;
                return next(err);
            }
        } catch (err) {
            next(err)
        }
    })
    .delete(authenticate.verifyUser, async (req, res, next) => {
        try {
            var blog = await Blogs.findById(req.params.blogId);
            if (blog != null && blog.comments.id(req.params.commentId)) {
                if (blog.comments.id(req.params.commentId).author._id.toString() != req.user._id.toString()) {
                    err = new Error('You are not authorized to perform this operation');
                    err.status = 403;
                    return next(err);
                }
                blog.comments.id(req.params.commentId).remove();

                var savedBlog = await blog.save()
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(savedBlog);

            } else if (blog == null) {
                err = new Error('Blog ' + req.params.blogId + ' not found');
                err.status = 404;
                return next(err);
            } else {
                err = new Error('Comment ' + req.params.commentId + ' not found');
                err.status = 404;
                return next(err);
            }
        } catch (err) {
            next(err)
        }
    })

module.exports = blogRouter;