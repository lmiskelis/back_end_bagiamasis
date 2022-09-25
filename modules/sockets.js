const socket = require("socket.io");
const likesSchema = require("../models/LikeSchema");
const users = []
module.exports = (http) => {

    const io = socket (http, {cors: {origin: "http://localhost:3000"}})

    io.on ("connect",(socket) => {
socket.on("login", username => {
            
            const newUser = {
                username,
                id: socket.id,
                
                
            }
            users.push(newUser) })


         socket.on("numbers",async username=>{
            const userslikes = await likesSchema.find({from:username})
            const usersliked=await likesSchema.find({to:username})

                console.log(usersliked.length,userslikes.length)


            socket.emit("likes",usersliked)
            socket.emit("liked",userslikes)
            
        })

//         socket.on("login", user => {
            
//             const newUser = {
//                 user,
//                 id: socket.id,
                
                
//             }
//             users.push(newUser)
            
//             socket.emit('movies', movies)
//         })

//         socket.on("reserve", data => {
//             const user = helpers.getUser(socket.id)
//             const {movie: movie, seats: seats, } = data
 

    
// movies[movie].seats.map(x=>seats.includes(x.number)?x.reserved=user.username:null)

    

            
//             helpers.emitMoviesToOnlineUsers(io)
            
//         })

        

    })
 }