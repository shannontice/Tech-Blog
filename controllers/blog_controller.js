const User = require('../models/User');
const Blog = require('../models/Blog');

module.exports = {
    async getPosts(req, res) {
        try {
            const blogPost = await Blog.findAll({
                include: {
                    model: User
                }
            })

            res.send(blogPost)
        }
        catch (err) {
            console.log(err)
        }
    },
    async onePost(req, res) {
        const blogPost_id = req.params.id
        try {
            const blogPost = await Blog.findOne({
                where:{
                    id: blogPost_id
                }
            })
            if (blogPost) {
                return res.send(blogPost)
            }
            res.send({
                message: 'No blog post not found'
            })
        }
        catch (err) {
            console.log(err)
        }
    },
    async createPost(req, res) {
        const newPostData= req.body
        try {
            const newPost = await Blog.create(newPostData)

            res.send(newPost)
        }
        catch (err) {
            console.log(err)
        }
    },
    async deletePost(req, res) {
        const blogPost_id = req.params.id

        try {
            await Blog.destroy({
                where: {
                    id: blogPost_id

                }
            })

            res.send({
                message: 'Post Deleted!'
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}