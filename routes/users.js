const express = require('express');
const router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');


//register route
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name : req.body.name,
        email : req.body.email,
        username :req.body.username,
        password : req.body.password
    });
    User.addUser(newUser, (err, users) => {
        if(err){
            res.json({success : false, msg : 'Failed to Register User.'});
        }else{
            res.json({success : true, msg : 'Successfully Register User.'});
        }
    });
});

//auth route
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success : false, msg : 'User Not Found.'});
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data: user}, config.secret, { 
                    expiresIn : 604800 
                });
                res.json({
                    success : true,
                    token : 'JWT '+token,
                    user : {
                        id :user._id,
                        name : user.username,
                        email : user.email
                    }
                });
            }else{
                return res.json({success : false, msg : 'Wrong password.'});
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
  });

 module.exports = router;