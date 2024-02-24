const router = require('express').Router()
const {getPosts, onePost, createPost, deletePost} = require('../controllers/blog_controller')

// Get All Blog Posts
router.get('/blog', getPosts);

// Get Blog Post by ID
router.get('/blog/:id', onePost);

// Post a Blog Post
router.post('/blog', createPost)

// Delete a Blog Post
router.delete('/blog/:id', deletePost);

module.exports = router;