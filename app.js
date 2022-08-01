const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Requiring user route inport
const userRoutes = require('./routes/users');

//Requiring user model
const User = require('./models/usermodel');

dotenv.config({path : './config.env'});

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
}).then(()=>
{
    console.log("connecting to ON db")
}).catch((err)=>
{
    console.log(err);
})

//middleware for session
app.use(session({
    secret : 'Just a simple login/sign up application.',
    resave : true,
    saveUninitialized : true
}));

app.use(passport.initialize()); //to initalize passport middleware
app.use(passport.session());   //to use passport session
passport.use(new LocalStrategy({usernameField : 'email'}, User.authenticate()));  //using local strategy
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//middleware flash messages
app.use(flash());

//setting middlware globally
app.use((req, res, next)=> {
    res.locals.success_msg = req.flash(('success_msg'));
    res.locals.error_msg = req.flash(('error_msg'));
    res.locals.error = req.flash(('error'));
    res.locals.currentUser = req.user; //for current user
    next();
});

app.use(bodyParser.urlencoded({extended:true}));  //foer body parser
app.set('views', path.join(__dirname, 'views')); //for including  views folder
app.set('view engine', 'ejs');   //for setting view engine
app.use(express.static('public'));  //for including public folder

app.use(userRoutes);

app.listen(process.env.PORT, ()=> {
    console.log('Server is started');
});