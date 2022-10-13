var express = require('express'),
    router = express.Router({mergeParams: true}),
    passport = require('passport'),
    User = require('../models/user');

router.get('/register', function(req,res){
    res.render('register');
})
router.post('/register',function(req,res){
    User.register(new User({username: req.body.username}), req.body.password, function(err){
        if(!err){
            passport.authenticate("local")(req, res, function(){
                res.redirect('/');
            })
        } else {
            console.log(err);
            res.redirect('/')
        }
    })
})
router.get('/login',function(req,res){
    res.render('login');
})
router.post('/login', passport.authenticate("local", {failureRedirect: '/login'}), function(req,res){
    res.redirect(req.session.backURL ||  '/');
    delete req.session.returnTo;
})
router.post('/logout',function(req,res,next){
    req.logout(err => {
        if (err) return next(err);
        req.flash('success', 'Successfully logged out');
        res.redirect('/')
    });
})

module.exports = router;