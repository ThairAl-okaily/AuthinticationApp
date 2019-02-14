
var express       = require("express");
var mongoose      = require("mongoose");
var bodyParser    = require("body-parser");
var passport      = require("passport");
var localStrategy = require("passport-local");
var passportLM    = require("passport-local-mongoose");
var User          = require("./models/user");



var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require("express-session")({
    secret: "the only thing in the mind of shark is eat",
    resave: false,
    saveUninitialized: false
}));

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect("mongodb://localhost/authApp", {useNewUrlParser: true});




///////////////
/// routs
//////////////

// auth routs 
app.get("/regester", (req,res) => {
    res.render('regester');
});

//handling sign up 
app.post("/regester", (req,res) => {
    // req.body.username
    // req.body.password
    User.register(new User({username: req.body.username}), req.body.password, (err,usr) => {
        if(err){
            console.log(err);
            return res.render("regester");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/secret");
        });
    });
});

// LOGIN ROUT //#endregion
app.get("/login", (req,res) => {
    res.render('login');
});

//login logic magic
//middleware
app.post("/login",passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), (req,res) => {

});


// home rout
app.get('/', (req,res) => {
    res.render('home');
});

//secret rout
app.get('/secret', (req,res) => {
    res.render('secret');
});
 





///////////////
/// server
//////////////

const http = require('http');
const port = 4000;
const hostname = '127.0.0.1'; 
const server = http.createServer((request, respond) => {
respond.statusCode = 200;
respond.setHeader('Content-Type', 'text/plain');
respond.end("Hello");
});
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});