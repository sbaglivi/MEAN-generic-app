var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
    name: String,
    price: String,
    description: String,
    image: String,
    date: {type: Date, default: Date.now},
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"},
        username: String
    }
});
module.exports = mongoose.model('Item', itemSchema);
