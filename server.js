// require express and other modules
var express = require('express'),
    app = express();


// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

 var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/example-username/express-personal-api/README.md", // CHANGE ME
    baseUrl: "http://YOUR-APP-NAME.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "POST", path: "/api/campsites", description: "E.g. Create a new campsite"} // CHANGE ME
    ]
  })
});

app.get('/api/profile', function getProfile (req, res) {
  var profile = ({
    name: 'Oscar Carrillo',
    githubUsername: 'oscarrillo90',
    githubLink: 'https://github.com/oscarrillo90',
    githubProfileImage: 'https://avatars3.githubusercontent.com/u/22487260?v=3&u=69dd41f3a08403cf64edd34bff11c7430bb4e905&s=400',
    personalSiteLink: 'oscarcarrillo.com',
    currentCity: 'Austin',
  });
    res.json(profile);
});
// get all Vacations
app.get('/api/vacation', function (req, res) {
  //send all vacations as JSON response
  db.vacation.find(req.params, function(err, data){
    res.json(vacationList);
  })

})
//create new vacation
// app.post('/api/vacation', function (req, res) {
//   // create new book with form data (`req.body`)
//   var newVacation = new db.Vacation({
//     destination: req.body.destination,
//     date: req.body.date,
//     duration: req.body.duration,
//     photo: req.body.image
//   });
//
//   // delete book
// app.delete('/api/vacation/:id', function (req, res) {
//   // get book id from url params (`req.params`)
//   console.log('vacation delete', req.params);
//   var vacationId = req.params.id;
//   // find the index of the book we want to remove
//   db.Vacation.findOneAndRemove({ _id: vacationId }, function (err, deletedVacation) {
//     res.json(deletedVacation);
//   });
// });
//
// // get one vacation
app.get('/api/vacation/:id', function (req, res) {
  db.Vacation.findOne({_id: req.params.id }, function(err, data) {
    res.json(data);
  });
});

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
