const response = require("./response");
const usersSchema = require("../models/userSchema");
module.exports = {
  validateUserRegistration: async (req, res, next) => {
   let {username,password1,password2,age,gender,city}= req.body
const user = await usersSchema.findOne({username})
   let error
 if(user)error="username taken"
   if(password1!==password2)error="Passwords do not match"
   if(!age)error="input age"
   if(!gender)error="input gender"
   if(!city)error="input city"
  
   if(!password1)error="input password"
if(!username)error="input username"


   if (error){
    return response(res, error, true )
   }

    next();
  },
};
