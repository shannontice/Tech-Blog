const express = require('express');
const {engine} = require('express-handlebars');
const session = require( 'express-session');



const db = require('./db/connection')
const PORT = 3001;
const app = express();

// Add Routes 
const blog_routes = require('./routes/blog_routes');
const view_routes = require('./routes/view_routes');
const form_routes = require('./routes/form_routes');
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Share public files
app.use(express.static('./public'))
// Handlebars extentions
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');


// Initialize Sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 60 * 60 * 1000}
}));
// Load Routes
app.use('/api', [blog_routes])
app.use('/', [view_routes, form_routes])


db.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            console.log('Server Port:', PORT)
        })
    })