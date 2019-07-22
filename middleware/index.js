var Comment = require('../models/comment'),
    Item = require('../models/item');
var middlewareObj = {};
middlewareObj.checkItemOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Item.findById(req.params.id, function(err, item){
            if(!err){
                if(item.author.id.equals(req.user._id)){
                    next()
                } else {
                    res.send("lol get ownership idiot");
                }
            }
        })
    } else {
        res.send('login slowpoke')
    }
}

middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, comment){
            if(!err){
                if(comment.author.id.equals(req.user._id)){
                    next()
                } else {
                    res.send("lol get ownership idiot");
                }
            }
        })
    } else {
        res.send('login slowpoke')
    }
}

middlewareObj.isLoggedIn = function(req,res,next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("success", "Please login to do that!");
    req.session.returnTo = req.originalUrl; 
    res.redirect('/login');
}

module.exports = middlewareObj