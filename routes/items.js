var express = require('express'),
    router = express.Router({mergeParams: true}),
    Item = require('../models/item'),
    Comment = require('../models/comment'),
    middleware = require('../middleware');

router.get('/:id',function(req,res){
    Item.findById(req.params.id).populate("comments").exec(function(err, item){
        if(!err){
            res.render("show", {item:item});
        }
    })
})
router.get('/:id/edit', middleware.checkItemOwnership, function(req,res){
    Item.findById(req.params.id, function(err, item){
        if(!err){
            res.render("edit", {item:item});
        }
    })
})
router.put('/:id', middleware.checkItemOwnership, function(req,res){
    Item.findByIdAndUpdate(req.params.id, req.body.updatedItem, function(err){
        if(!err){
            res.redirect(`/${req.params.id}`);
        }
    })
})
router.delete('/:id', middleware.checkItemOwnership, function(req,res){
    Item.findByIdAndDelete(req.params.id, function(err){
        if(!err){
            res.redirect('/');
        }
    })
})
router.get('/:id/comment/new', middleware.isLoggedIn, function(req,res){
    Item.findById(req.params.id, function(err, item){
        if(!err){
            res.render('addComment', {item: item});
        }
    })
})
router.post('/:id/comment', middleware.isLoggedIn, function(req,res){
    Item.findById(req.params.id, function(err, item){
        if(!err){
            Comment.create({text: req.body.text}, function(err, newComment){
                if(!err){
                    newComment.author.username = req.user.username;
                    newComment.author.id = req.user._id;
                    newComment.save();
                    item.comments.push(newComment);
                    item.save();
                    res.redirect(`/${req.params.id}`);
                }
            })
        }
    })
})

router.get('/:id/comment/:comment_id/edit', middleware.checkCommentOwnership, function(req,res,next){
    Comment.findById(req.params.comment_id, function(err,comment){
        if(!err){
            res.render('commentEdit', {comment: comment, campground_id: req.params.id});
        } else {
            console.log(err);
            res.redirect('/')
        }
    })
})

router.put('/:id/comment/:comment_id',middleware.checkCommentOwnership, function(req,res,next){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err){
        if(!err){
            res.redirect(`/${req.params.id}`)
        }
    })
})

router.delete('/:id/comment/:comment_id',middleware.checkCommentOwnership,function(req,res,next){
    Comment.findByIdAndDelete(req,params.comment_id, function(err){
        if(!err){
            res.redirect(`/${req.params.id}`)
        }
    })
})

module.exports = router;