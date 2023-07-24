
const exoress = require('express');

const routes = exoress.Router();

const controller = require('../../controller/V1/toDoController');


routes.post('/addToDo',controller.addToDo);






module.exports = routes;