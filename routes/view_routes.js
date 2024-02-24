const router = require('express').Router();
const {getUser, showHomepage, signUpForm, signInForm, showDashboard, blogPostForm, usersPosts, logOut} = require('../controllers/view_controller');

function protect(req, res, next) {
    if (req.session.user_id) {
        return next();
    }

    res.redirect('/login')
}

// Show homepage
router.get('/', getUser, showHomepage);
// Show signup form
router.get('/signup', signUpForm);
// Show signin form
router.get('/signin', signInForm);
// Show dashboard 
router.get('/dashboard', protect, getUser, showDashboard);
// Show page to create blog post
router.get('/create/post', getUser, blogPostForm);
//Show the users posts
router.get('/userdata', getUser, usersPosts);
//Logout
router.get('/logout', logOut);

module.exports = router;