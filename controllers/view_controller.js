const User = require('../models/User');
const Blog = require('../models/Blog');

module.exports = {
    async getUser(req, res, next) {
        const user = await User.findByPk(req.session.user_id);
        req.user = user && user.get({ plain: true });

        next();
    },
    async showHomepage(req, res) {
        res.render("home", {
            title: "TechBlog",
            home: true,
            user: req.user,
        });
    },
    async signUpForm(req, res) {
        res.render("forms/signup", {
            title: "Sign Up",
            register: true,
        });
    },
    async signInForm(req, res) {
        res.render("forms/signin", {
            title: "Sign In",
            login: true,
        });
    },
    async showDashboard(req, res) {
        const users = await User.findAll();
        const blogs = await Blog.findAll({
            include: User,
            attributes: [
                "title",
                "blog_text"
            ],
        });
        res.render("dashboard", {
            title: "Dashboard",
            users: users.map((userObj) => userObj.get({ plain: true })),
            blogs: blogs.map((postObj) => postObj.get({ plain: true })),
            user: req.user,
        });
    },
    async blogPostForm(req, res) {
        res.render("forms/blogpost", {
            title: "Write a Blog Post",
            user: req.user,
        });
    },
    async usersPosts(req, res) {
        const user_id = req.session.user_id

        const user = await User.findByPk(user_id)
        console.log('hello', user)
        const blogPosts = await Blog.findAll({

            where: {
                userId: user_id
            },
            include: User,
            attributes: [
                "title",
                "blog_text"
            ],
        });

        console.log('blog posts', blogPosts)
        res.render("userdata", {
            title: "Your Posts",
            blogPosts: blogPosts.map((blogPostObj) => blogPostObj.get({ plain: true })),
            user: req.user,
        });

    },
    async logOut(req, res) {
        // Clear the user ID from the session to log them out
        req.session.destroy();
        res.redirect("/");
      }
}