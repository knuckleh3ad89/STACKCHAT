$(document).ready(function () {
    const loginForm = $(".loginForm");
    const emailInput = $("#userEmail");
    const passwordInput = $("#userPassword");
    const googlelogin = $(".g-signin2");

    function onSignIn( googleUser) {
        const profile =  googleUser.getBasicProfile();
        
        $.get("/interface", (req, res) => {
                res.json("success!");
            }) 

    };

    googlelogin.on("click", function (event){
        event.preventDefault();
        onSignIn(googleUser);
    })

   
    loginForm.on("submit", function (event) {
        event.preventDefault();


        const userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }

        $.post("/api/login", userData
        ).then(function () {
            window.location.replace("/interface");
        })
            .catch(function (err) {
                console.log(err);

            });

    });

    // loginForm.on("submit", function(event) {
    //   event.preventDefault();
    //   var userData = {
    //     email: emailInput.val().trim(),
    //     password: passwordInput.val().trim()
    //   };
    //   if (!userData.email || !userData.password) {
    //     return;
    //   }
    //   // If we have an email and password we run the loginUser function and clear the form
    //   loginUser(userData.email, userData.password);
    //   emailInput.val("");
    //   passwordInput.val("");
    // });
    // // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    // function loginUser(email, password) {
    //   $.post("/api/login", {
    //     email: email,
    //     password: password
    //   })
    //     .then(function() {
    //       window.location.replace("/interface");
    //       // If there's an error, log the error
    //     })
    //     .catch(function(err) {
    //       console.log(err);
    //     });
    // }

    



});
