var express = require('express'),
    router = express.Router({mergeParams: true}),
    Item = require('../models/item'),
    middleware = require('../middleware');

router.get('/',function(req,res){
    Item.find({}, function(err, items){
        if(!err){
            res.render("home", {items: items});
        }
    })
});
router.get('/new', middleware.isLoggedIn, function(req,res){
    res.render("new");
})
router.post('/', middleware.isLoggedIn, function(req,res){
    Item.create(req.body.newItem, function(err, item){
        if(!err){
            item.author.username = req.user.username;
            item.author.id = req.user._id;
            item.save()
            res.redirect(`/${item._id}`);
        }
    })
})

module.exports = router;