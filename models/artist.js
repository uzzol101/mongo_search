var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Album = require("./album");

var artistSchema = new Schema({
    name: String,
    age: Number,
    yearsActive: Number,
    image: String,
    genre: String,
    webste: String,
    netWorth: Number,
    labelName: String,
    retired: Boolean,
    albums: [Album.schema]
});


var Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;