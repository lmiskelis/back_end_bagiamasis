const response = require("../middleware/response");
const usersSchema = require("../models/userSchema");
const usersConfirmedSchema = require("../models/ConfirmedUsers");
const likesSchema = require("../models/LikeSchema");
const bcrypt =require("bcrypt")
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  
  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
module.exports = {
  login: async (req, res) => {
    let {username,password}=req.body
    const user = await usersSchema.findOne({username})
      if(user) {
         const compare = await bcrypt.compare(password, user.password)
         if(compare) {
                let newUser = {
                    username: user.username,
                    images:user.images,
                    
                }
                return response(res, "all good", false, newUser)
            }

            return response(res, "wrong name password combination", true, null)
        }

        return response(res, "wrong name password combination", true, null)
           
  },
register: async (req, res) => {
   let {username,password1,city,gender,age}=req.body
  const password = await bcrypt.hash(password1, 10)

  const user = new usersSchema({
    username,
    password,
    age,
    gender,
    city
  })
  await user.save()

        
      response(res, "Registration sucesful", false );
      
  },
  autologin: async (req, res) => {
    let {username}=req.body
    const user = await usersSchema.findOne({username})
      if(user) {
         
                let newUser = {
                    username: user.username,
                    images:user.images,
                    
                }
                return response(res, "all good", false, newUser)
            }

            return response(res, "user does not exist", true, null)
        

      
           
  },
 
  addPicture: async (req, res) => {
    let {username,picture}=req.body
    const userImages= await usersSchema.findOne({username})
    const images=[...userImages.images,picture]
    const user = await usersSchema.findOneAndUpdate({username},{$set:{images:images}},{new: true})
if(user.images.length>1){
  const repeat= await usersConfirmedSchema.findOne({username})
  if(!repeat){
    const confirmeduser= new usersConfirmedSchema({
      username:user.username,
      images:user.images,
      gender:user.gender,
      age:user.age,
      city:user.city
    })
     await confirmeduser.save()
  }
}


      
                return response(res, "Picture added", false, user)
  },


  addLike: async (req, res) => {
    let {username,Likedusername}=req.body
    let checkduplicates=  await likesSchema.find({from:username})
    let duplicates=checkduplicates.filter(x=>x.to===Likedusername)
   
    
    if(!duplicates){
      const Like = new likesSchema({
    from:username,
    to:Likedusername,
  })
  await Like.save()

        
     return response(res, "Sucessfuly liked", false );
    }
    
      return response(res, "Sucessfuly liked", false )
               
  },
  filteredData: async (req, res) => {
    let {username,reqageHigh,reqagelow,reqgender,reqcity}=req.body
   
    let users = await usersConfirmedSchema.find()
    users=users.filter(x=>x.username!=username).filter(x=>reqgender===x.gender).filter(x=>x.age<reqageHigh).filter(x=>x.age>reqagelow).filter(x=>x.city.includes(reqcity))
    users=shuffle(users)
    
// 
    // 
    
      
                return response(res, "Filtered users", false, users)
  },
filterLikes: async (req, res) => {
let likedusers=[]
    let {username}=req.body
   
    
    const users = await likesSchema.find({from:username})
    
    if(users.length>0){
      for(let i=0;i<users.length;i++){
      const user = await usersConfirmedSchema.findOne({username:users[i].to})
      likedusers.push({username:user.username,
        images:user.images,
        age:user.age,
        gender:user.gender,
        city:user.city
      })
    }
    
      
    }
    
      
                return response(res, "Filtered users", false, likedusers)
  },
  filterHaveLikes: async (req, res) => {

  let likedusers=[]
    let {username}=req.body
    
    const users = await likesSchema.find({to:username})
     if(users.length>0){
    for(let i=0;i<users.length;i++){
      const user = await usersConfirmedSchema.findOne({username:users[i].from})
      likedusers.push({username:user.username,
        images:user.images,
        age:user.age,
        gender:user.gender,
        city:user.city
      })
      }
    }
    
      
                return response(res, "Filtered users", false, likedusers)
  },
}