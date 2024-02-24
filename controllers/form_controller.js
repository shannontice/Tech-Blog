const User = require('../models/User');
const Blog = require('../models/Blog');

module.exports = {
    async createUser (req, res) {
        try {
            const user = await User.create(req.body);
            req.session.user_id = user.id;
            res.redirect('/dashboard');
        }
        catch (err) {
            let messages;
            messages = [err.message]
            if (err.errors) {
                messages = err.errors.map(eObj => eObj.message); 
            }
            req.session.errors = messages;
            console.log(err);
            res.redirect('/signup')
        }
    },
    async userSignIn (req, res) {
        const { username, password } = req.body
        try {
            const user = await User.findOne({
                where: {
                    username
                }
            })
    
            // User is not found
            if (!user) {
                req.session.errors = ['A user with that username does not exist'];
    
                 return res.redirect('/signup');
    
            }
    
            // Validate their password
            const valid_pass = await user.validatePass(password);
    
            if(!valid_pass) {
                req.session.errors = ['Password is invalid'];
    
                return res.redirect('/login');
            }
    
            req.session.user_id= user.id;
    
            res.redirect('/dashboard')
    
    
        }
        catch (err) {
            let messages;
            console.log(err);
            messages = [err.message]
            if (err.errors) {
                messages = err.errors.map(eObj => eObj.message); 
            }
            req.session.errors = messages;
            console.log(err);
            res.redirect('/signup')
        }
    }, 
    async createPost (req, res) {
        try {
            const { title, blog_text } = req.body;
            const userId = req.session.user_id;

            await Blog.create({
                title,
                blog_text,
                userId: userId
              });
    
            res.redirect('/dashboard?post_added=true');
        }
        catch (err) {
            console.log(err)
            res.redirect('/create/post')
        }
    }
}