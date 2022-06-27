const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


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
    .post(async (req, res, next) => {
        try {
            var blog = Blogs.create(req.body);
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.json(blog);
            console.log("Blog Created")
        } catch (err) {
            next(err)
        }
    })

module.exports = blogRouter;