const express = require('express');

const taskController = require('./controllers/TaskController');
const authMiddleware = require('../middleware/auth');

const routes = express.Router();

routes.use(authMiddleware);

routes.post('/tasks', taskController.create);
routes.get('/tasks', taskController.show);
routes.get('/tasks/:taskId', taskController.detail);
routes.delete('/tasks/:taskId', taskController.delete);
routes.put('/tasks/:taskId', taskController.update);
routes.put('/tasks/done/:taskId', taskController.done);

module.exports = routes;