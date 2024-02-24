const router = require('express').Router();
const { createUser, userSignIn, createPost } = require('../controllers/form_controller');

// Sign-up
router.post('/signup', createUser);

// Sign-In
router.post('/signin', userSignIn);

// Create Blog Post
router.post('/create/post', createPost);

module.exports = router;