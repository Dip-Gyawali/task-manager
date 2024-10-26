const { default: mongoose } = require('mongoose');
const tasks = require('../model/taskModels');
const asyncWrapper = require('../middleware/asyncWrapper');

const getallTasks = asyncWrapper(async (req, res) => {
    const allTasks = await tasks.find({}).sort({createdAt: -1})
    res.status(200).json({data:allTasks})
});

const addTask = asyncWrapper(async (req, res) => {
    const task = await tasks.create(req.body)
    res.status(201).json({ data:task});
});

const getSingleTask = asyncWrapper(async (req, res , next) => {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error:"Invalid Id"})
  }
    const task = await tasks.findById(id);
    if(!task){
      //custom error
      const error = new Error("Something is Wrong");
      error.status = 404;
      return next(error)
      return res.status(400).json({error:`Cannot Find Task with ${id}`})
    }
    res.status(200).json({data:task})
});

const updateTask = asyncWrapper(async (req, res) => {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(400).json({error:"Invalid ID"})
  }
    const updatedTask = await tasks.findOneAndUpdate({_id:id},{...req.body});
    if(!updateTask){
      return res.status(400).json({error:`Cannot Find Task with ${id}`})
    }
    res.status(200).json({data:updatedTask})
});

const deleteTask = asyncWrapper(async (req, res) => {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(400).json({error:"Invalid Id"})
  }
   const TaskDeleted = await tasks.findByIdAndDelete({_id:id});
   if(!TaskDeleted){
    return res.status(400).json({error:`Cannot Find Task with ${id}`})
   }
   res.status(200).json({data: TaskDeleted}) 
});

module.exports = {
  getallTasks,
  addTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
