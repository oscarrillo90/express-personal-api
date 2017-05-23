var db = require('./models');

var vacation_list = [
  {
    destination: 'Costa Rica',
    date: '7/4/15',
    duration: '1 week',
    image: 'img',
  },
  {
    destination: 'Playa Del Carmen',
    date: '7/1/14',
    duration: '1 week',
    image: 'img',
  },
  {
    destination: 'Guadalajara',
    date: '7/1/16',
    duration: '1 week',
    image: 'img',
  },
  {
    destination: 'Destin',
    date: '7/1/13',
    duration: '1 week',
    image: 'img'
  }
];

db.Vacation.remove({}, function(err, removedEverything){
  if(err){return console.log("ERR: ", err);}

  db.Vacation.create(vacation_list, function(err, someVacations){
    if(err){return console.log("ERR: ", err);}
    console.log(someVacations);
    process.exit(1);
  });

});
