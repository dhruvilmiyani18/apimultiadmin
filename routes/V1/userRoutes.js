const exoress = require('express');

const routes = exoress.Router();

const controller = require('../../controller/V1/userController')

const passport = require('passport');

const user = require('../../models/user');

routes.post('/addUser',user.userUploadImg,controller.addUser);

routes.get("/loginFailed", async (req, res) => {
    return res.json({ status: 400, msg: "First you have to login" });
});

routes.post('/Login',controller.Login);

routes.get('/showToDo', passport.authenticate('jwtUser', { failureRedirect: '/loginFailed' }),controller.showToDo)

 
module.exports = routes;