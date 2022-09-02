const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bikeSchema = new Schema({
  bikeName:{
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image:{
    data: Buffer,
    contentType: String,
  },
  price:{
    type:Number,
    required:true,
  },
  discount:{
    type:String,
    required:true,
  },
  charges:{
    type:String,
    required:true,
  },
});

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;