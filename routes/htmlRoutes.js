const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");
var db = require("../models");


module.exports = function (app) {

    app.get("/", function (req, res) {
        res.render("index");

    });

    app.get("/register", function (req, res) {

        res.render("register");

    });

    app.get("/login", function (req, res) {

        res.render("login");
    });

    

    app.get("/interface", isAuthenticated, function (req, res) {
       res.render("interface");
    });



    // app.post("/interface/:friend", (req, res) => {
    //     let friend = req.params.friend;

    //     res.render('interface/:friend')
    //     else res.render("interface");
    //     else res.render("interface", {email: req.user.email, friends: []})
    // });






};