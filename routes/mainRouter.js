const express = require("express");
const router = express.Router();
const {  validateUserRegistration } = require("../Middleware/validators.js");
const{login,register,autologin,filteredData,addLike,addPicture,filterLikes,filterHaveLikes} = require("../controllers/mainController");


router.post("/login", login);
router.post("/autologin", autologin);
router.post("/data", filteredData);

router.post("/addLike", addLike);
router.post("/addpicture", addPicture);
router.post("/filteredlikes", filterLikes);
router.post("/filterhavelikes", filterHaveLikes);
router.post("/register", validateUserRegistration, register);


module.exports = router;