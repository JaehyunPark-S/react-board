const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment_content:{
        type: String,
        maxLength: 50
    },
    comment_date:{
        type: Date,
    },
    comment_writer:{
        type: String,
        maxLength: 50
    },
    board_num:{
        type: String,
        maxLength: 50
    },
    user_num:{
        type: String,
        maxLength: 50
    }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = {Comment};