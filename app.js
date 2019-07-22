var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var User = require('./models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var indexRoutes = require('./routes/index');
var authRoutes = require('./routes/auth');
var itemRoutes = require('./routes/items');
var flash = require('connect-flash');


app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.use(flash());
mongoose.connect(process.env.databaseUrl, {useNewUrlParser:true, useFindAndModify: false});
// mongoose.connect("mongodb+srv://sbaglivi:Lifeanddeath1995@cluster0-rctet.mongodb.net/firstapp?retryWrites=true&w=majority", {useNewUrlParser:true, useFindAndModify: false});

app.use(require('express-session')({
    secret: 'This is the red wheelbarrow',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("message");
    next();
})

app.set("view engine","ejs");

app.use(authRoutes);
app.use(indexRoutes);
app.use(itemRoutes);


//app.listen(3000, ()=>{
//    console.log(`Currently listening on port ${3000}`);
//})
app.listen(process.env.PORT || 3000, process.env.IP, ()=>{
    console.log(`Currently listening on port ${process.env.PORT}`);
});
