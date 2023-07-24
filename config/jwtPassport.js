const passport = require('passport');

const jwtStrategy = require('passport-jwt').Strategy; 

const  ExtractJwt = require('passport-jwt').ExtractJwt;

const admin = require('../models/admin');
const user = require('../models/user')

var opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'RNW'
}

var opts2 = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'RNWuser'
}

passport.use(new jwtStrategy(opts, async function(payload,done){

    let admindata = await admin.findOne({email : payload.adminData.email});

    if(admindata){
        if(admindata.password == payload.adminData.password){
            return done(null,admindata);
        }
        else{
            return done(null,false)
        }
    }
    else{
        return done(null,false)
    }
}));

passport.use('jwtUser',new jwtStrategy(opts2, async function(payload,done){

    let userData = await user.findOne({email : payload.userData.email});

    if(userData){
        if(userData.password == payload.userData.password){
            return done(null,userData);
        }
        else{
            return done(null,false)
        }
    }
    else{
        return done(null,false)
    }
}));


passport.serializeUser(function(user,done){
        return done(null,user.id);
})

passport.deserializeUser(async function(id,done){
    let adminRecord = await admin.findById(id);
    if(adminRecord){
        return done(null,adminRecord);
    }
    else{
        return done(null,false)
    }
})

module.exports = passport;