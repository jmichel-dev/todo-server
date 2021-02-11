const mongoose = require('mongoose');
const Task = mongoose.model('Task');

module.exports = {
  async create(request, response) {
    try {
      const { title, description, priority } = request.body;
      const user = request.user;

      const task = new Task({
        title,
        description,
        owner: user._id,
        priority,
      });      

      await task.save();

      return response.send({ message: 'Task created successfully.' });
    } catch (err) {
      return response.status(422).send({ 
        error: 'Error while created the task.' 
      });
    }
  },
  async show(request, response) {
    try {
      const user = request.user;

      const tasks = await Task.find({ owner: user._id });

      return response.send(tasks);
    } catch (err) {
      return response.status(500).send({ 
        error: 'Error while listing your tasks.' 
      });
    }
  },

  async detail(request, response) {
    try {
      const { taskId } = request.params;

      const task = await Task.findById(taskId)

      return response.send(task);
    } catch (err) {
      return response.status(500).send({ 
        error: 'Error while listing your tasks.' 
      });
    }
  },
  
  async delete(request, response) {
    try {
      const { taskId } = request.params;

      await Task.deleteOne({ _id: taskId });

      return response.send({ message: 'Task removed succesfully.' });
    } catch (err) {
      return response.status(402).send({ 
        error: 'Error while attempt to delete the task' 
      });
    }
  },
  async done(request, response) {
    try {
      const { taskId } = request.params;

      const task = await Task.findById(taskId);

      if (!task) {
        return response.status(404).send({ error: 'Task not found' });
      }

      const done = task.done;

      console.log(done);

      task.done = !done;

      console.log(task.done);

      await task.save();

      return response.send({ message: 'Task update succesfully.' });
    } catch (error) {
      return response.status(402).send({ 
        error: 'Error while attempt to update the task.' 
      });
    }
  },
  async update(request, response) {
    try {
      const { taskId } = request.params;
      const { title, description, priority } = request.body;

      await Task.updateOne({ _id: taskId }, {
        title,
        description,
        priority,
      });

      return response.send({ message: 'Task updated succesfully.' });
      
    } catch (err) {
      return response.status(402).send({ 
        error: 'Error while attempt to update the task.'
      });
    }
  }
}