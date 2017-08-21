var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var albumSchema = new Schema({
    title: String,
    date: Date,
    copiesSold: Number,
    numberTracks: Number,
    image: String,
    revenue: Number

});
var Album = mongoose.model("Album", albumSchema);
module.exports = Album;