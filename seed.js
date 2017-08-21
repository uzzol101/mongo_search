var mongoose = require("mongoose");
var Artist = require("./models/artist");
var Album = require("./models/album")
var faker = require("faker");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/music");
var connection = mongoose.connection;

connection.once("open", () => {
    console.log("Database connected");
});


function seedDb() {
    console.log("hello seed");

    // gen 16 artist data and save to db
    for (var i = 0; i < 160; i++) {
        var artist = new Artist(createArtist());
        artist.save((err, artist) => {
            // console.log("saved ");
        });
        if (i >= 160) {
            console.log("finished");
        }

    }


    //    Artist.find({}, (err, result) => {
    //     console.log(result);
    // });
    //  Artist.remove({}, (err, result) => {
    //     console.log("removed db");
    // });
}

const GENRES = [
    'Acceptable Country',
    'Acceptable Emo',
    'Acceptable Pop',
    'Acceptable Pop-Punk',
    'Alt-Country',
    'Alt-Rap',
    'Bloghaus',
    'Blog Rap',
    'Blog Rock',
    'Cold Wave',
    'Cool Jazz',
    'Digital Punk',
    'Doom Metal',
    'Freak Folk',
    'Garage Rock',
    'Hypnagogic Pop',
    'Noise Pop',
    'Power Electronics',
    'Serialism',
    'Witch House',
    'Ye Olde Timey Rock And Roll Music of Indeterminate Hipster Variety'
];



// gen artsit schema data
function createArtist() {
    return {
        name: faker.name.findName(),
        age: faker.random.number({ min: 15, max: 45 }),
        yearsActive: faker.random.number({ min: 1, max: 15 }),
        image: faker.image.avatar(),
        genre: faker.random.arrayElement(GENRES),
        website: faker.internet.url(),
        netWorth: faker.random.number(5000000),
        labelName: faker.company.companyName(),
        retired: faker.random.boolean(),
        albums: genAlbums()
    };
}

// gen album schema data
function getAlbums() {

    return {
        title: (faker.random.words()).toUpperCase(),
        date: faker.date.past(),
        copiesSold: faker.random.number({ min: 2, max: 50 }),
        numberTracks: faker.random.number({ min: 1, max: 20 }),
        image: faker.image.fashion(),
        revenue: faker.random.number(40000)
    };

}

// generate upto 5 albums
var genAlbums = function methodName(arguments) {
    var albums = [];
    var random = faker.random.number({ min: 1, max: 5 });
    for (var i = 0; i < random; i++) {
        albums.push(getAlbums());

    }

    return albums;
}



module.exports = seedDb;