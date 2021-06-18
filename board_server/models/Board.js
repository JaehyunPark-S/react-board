const mongoose = require('mongoose');
const Schema = mongoose.Schema;
function getCurrentDate() {
    var date = new Date();

    var year = date.getFullYear();
    var month = date.getMonth();
    var today = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();

    return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds))
}
const boardSchema = new Schema({
    board_name:{
        type: String,
        maxLength: 50
    },
    board_content:{
        type: String,
        maxLength: 2000
    },
    board_writer:{
        type: String,
        maxLength: 50
    },
    board_date:{
        type: Date,
    },
})

const Board = mongoose.model('Board', boardSchema);

module.exports = {Board};