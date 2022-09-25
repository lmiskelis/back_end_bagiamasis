const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userConfirmedSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
 
  city: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  images: {
    type: Array,
    required:false ,
    default:[],
  },
   
});



const Product = mongoose.model("DatingAppUsersConfirmed", userConfirmedSchema);

module.exports = Product;