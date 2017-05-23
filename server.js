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
    message: "Welcome to my personal api. Routes are below! Learn about my vacations :)",
    documentationUrl: "https://github.com/oscarrillo90/express-personal-api",
    baseUrl: "https://peaceful-journey-87045.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"},
      {method: "GET", path: "/api/vacations", description: "List of all vacations"},
      {method: "GET", path: "/api/vacations/:id", description: "Get vacations by ID"},
      {method: "POST", path: "/api/vacations/", description: "Create a new vacation"},
      {method: "PUT", path: "/api/vacation/:id", description: "Update vacations by ID"},
      {method: "DELETE", path: "/api/vacations/:id", description: "Delete vacation by ID"}
    ]
  })
});

// show profile
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

// get one vacation by id
app.get('/api/vacations/:id', function (req, res) {
  db.Vacation.findOne({_id: req.params.id }, function(err, data) {
    res.json(data);
  });
});

// get all Vacations
app.get('/api/vacations', function (req, res) {
  //send all vacations as JSON response
  db.Vacation.find({})
    .exec(function(err, vacations){
      if (err) {
        return console.log(err);
      }
      res.json(vacations);
    });
  });

//create new vacation
app.post('/api/vacations', function (req, res) {
  // create new book with form data (`req.body`)
  var newVacation = new db.Vacation({
    destination: req.body.destination,
    date: req.body.date,
    duration: req.body.duration,
    image: req.body.image
  });
  // console.log(req.body);
  db.Vacation.create(newVacation, function(err, succ) {
    if (err) {return console.log(err)}
    res.json(succ);
  });
});

  // delete vacation
app.delete('/api/vacations/:id', function (req, res) {
  // get book id from url params (`req.params`)
  console.log('vacation delete', req.params);
  var vacationId = req.params.id;
  // find the index of the book we want to remove
  db.Vacation.findOneAndRemove({ _id: vacationId })
  .exec(function (err, deletedVacation) {
    res.json(deletedVacation);
  });
});

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
