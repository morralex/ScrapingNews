const express = require('express');
const mongoose = require('mongoose')
const logger = require('morgan')


// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

//database configuration
var database = "scrappingNews"

app.get("/", function (req, res) {

    axios.get("https://www.latimes.com/").then(function (response) {

        var $ = cheerio.load(response.data)

        $(".List-A-items-column").each(function (i, element) {

            var result = {};

            result.title = $(this)
                .children(".PromoSmall-title")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle)
                })
                .catch(function (err) {
                    console.log(err)
                })
        })
        res.send("Scrape Complete");
    })
});

app.get("/articles", function (req, res) {

    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err)
        })
});

app.get("/articles/:id", function (req, res) {

    db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function (dbArticle) {
            res.json(dbArticle)
        })
        .catch(function (err) {
            res.json(err)
        })
});

app.post("/articles/:id", function (req, res) {
    
    db.Note.create(req.body)
        .then(function (dbNote) {
            return db.Article.findOneAndDelete({ _id: req.params.id }, { note: dbNote_id }, { new: true })
        })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err)
        })
});

app.listen(PORT, function () {
    console.log(`app is running on ${PORT}`)
})