const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },

});



const Product = mongoose.model("Likes", likeSchema);

module.exports = Product;