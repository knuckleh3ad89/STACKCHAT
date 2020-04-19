const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");
var db = require("../models");


module.exports = function (app) {
    
    app.get("/home", function (req, res) {
        if (req.user) {
            res.redirect("/");
        }
        res.render("index");
    });


    app.get("/login", function (req, res) {
        if (req.user) {
            res.redirect("/interface");
        }
         res.render("login");

    app.post("/api/login", function (req, res) {
        if (req.user) {
        res.redirect("/interface");
        }
        
         res.render("login");
    });

    app.get("/register", function (req, res) {
        if (req.user) {
            res.redirect("/login");
        }
         res.render("register");
        
    });

    app.get("/interface", isAuthenticated, function (req, res) {
        console.log(req.user);
        db.User.findOne({
          where: {
            id: req.user.id
          }
        })
        .then(function(data){
          // console.log(data);
        })
        // res.render("interface",{user:req.user});
        res.sendFile(path.join(__dirname, "../public/interface.html"),{user: req.user});
      });

    
    // app.get("/interface", isAuthenticated,  function (req, res) {
    //     db.User.findOne([])
          
    
    // });



    app.post("/interface/:friend", (req, res) => {
        let friend = req.params.friend;
        
         res.render('interface/:friend')
        //else res.render("interface");
        //else res.render("interface", {email: req.user.email, friends: []})
    });

    app.post('/api/signup' , (req, res) => {
        if (!req.user) {
            res.redirect('/api/login')
        }
        else res.render('interface')
    });


});

    
};