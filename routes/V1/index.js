const express = require('express');

const routes = express.Router();

const controller = require('../../controller/V1/controller');

const passport = require('passport')

const admin = require('../../models/admin');

routes.post('/addAdmin',admin.adminUploadImg,controller.addAdmin)

routes.post('/Login',controller.Login);

routes.get("/loginFailed", async (req, res) => {
    return res.json({ status: 200, msg: "First you have to login" });
});

routes.get('/showUserData',passport.authenticate('jwt',{ failureRedirect :'/loginFailed'}),controller.showUserData);

routes.use('/user',require('./userRoutes'));
routes.use('/todo',require('./toDoRoutes'));

module.exports = routes;