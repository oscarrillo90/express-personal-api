var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var VacationSchema = new Schema({
    destination: String,
    date: String,
    duration: String,
    image: String

  });

  var Vacation = mongoose.model('Vacation', VacationSchema);

  module.exports = Vacation;
