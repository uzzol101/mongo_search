var express = require('express');
var Artist = require("../models/artist");
var cors = require("cors");
var router = express.Router();

/* GET users listing. */
router.get('/artist', cors(), function(req, res, next) {
    Artist.find({}).limit(10).then((artists) => {
        res.json(artists);
    });
});

router.put("/search", cors(), (req, res) => {

    console.log(req.body);
    // custom search

    // create a criteria from req.body object
    let criteria = {
        age: {
            min: req.body.age.ageMin,
            max: req.body.age.ageMax
        },
        yearsActive: req.body.activeYears,
        search: req.body.search
    };


    // // pass search criteria to custom search method
    customSearch(criteria, req.body.sort, req.body.offset, 10);

    function customSearch(criteria, sortProperty, offset = 0, limit = 20) {

        // build query will make a query object like this: {age:{$gte:10,$lte:30}}
        const query = Artist.find(buildQuery(criteria))
            .sort({
                [sortProperty]: 1
            })
            .skip(offset)
            .limit(limit);
        // Artist.find(buildQuery(criteria)).count() to get total number of search result
        return Promise.all([query, Artist.find(buildQuery(criteria)).count()]).then((results) => {
            var sresult = {
                all: results[0],
                count: results[1],
                offset: offset,
                limit: limit
            };

            res.json(sresult);
        });
    }

});


// construct search query object

const buildQuery = function(criteria) {

    const query = {};
    if (criteria.search) {
        query.$text = {
            $search: criteria.search
        };
    }

    if (criteria.age.min && criteria.age.max) {
        query.age = {
            $gte: criteria.age.min,
            $lte: criteria.age.max
        };

    }

    if (criteria.yearsActive) {
        query.yearsActive = {
            $gte: criteria.yearsActive
        }
    }
    return query;
};



module.exports = router;