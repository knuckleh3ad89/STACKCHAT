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

    app.post("/api/login", function (req, res) {
        if (req.user) {
            res.redirect("/interface");
        }
        // res.render("login");
    });

    app.post('/api/signup', (req, res) => {
        if (!req.user) {
            res.redirect('/api/login')
        }
        else res.render('interface')
    });

    app.get("/interface", isAuthenticated, function (req, res) {
        console.log(req.user);
        db.user.findOne({
            where: {
                id: req.user.id
            }
        })
            .then(function (data) {
                res.sendFile(path.join(__dirname, "../public/interface.html"), { user: req.user });

            });

    });



    // app.post("/interface/:friend", (req, res) => {
    //     let friend = req.params.friend;

    //     res.render('interface/:friend')
    //     else res.render("interface");
    //     else res.render("interface", {email: req.user.email, friends: []})
    // });






};