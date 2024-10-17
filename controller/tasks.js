const { default: mongoose } = require('mongoose');
const tasks = require('../model/taskModels')

const getallTasks = async (req, res) => {
  try{
    const allTasks = await tasks.find({}).sort({createdAt: -1})
    res.status(200).json({data:allTasks})
  }
  catch(err){
    res.status(400).json({ error: "Cannot Get Data" });
  }
};

const addTask = async (req, res) => {
  try{
    const task = await tasks.create(req.body)
    res.status(201).json({ data:task});
  }
  catch(err){
    res.status(400).json({ error: "Cannot Add Data" });
  }
};

const getSingleTask = async (req, res) => {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error:"Invalid Id"})
  }
  try{
    const task = await tasks.findById(id);
    if(!task){
      return res.status(400).json({error:`Cannot Find Task with ${id}`})
    }
    res.status(200).json({data:task})
  }
  catch(err){
    res.status(400).json({error:"Cannot Find Task"})
  }
};

const updateTask = async (req, res) => {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(400).json({error:"Invalid ID"})
  }
  try{
    const updatedTask = await tasks.findOneAndUpdate({_id:id},{...req.body});
    if(!updateTask){
      return res.status(400).json({error:`Cannot Find Task with ${id}`})
    }
    res.status(200).json({data:updatedTask})
  }
  catch(err){
    res.status(400).json({error:"Cannot Update"})
  }
};

const deleteTask = async (req, res) => {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(400).json({error:"Invalid Id"})
  }
  try{
   const TaskDeleted = await tasks.findByIdAndDelete({_id:id});
   if(!TaskDeleted){
    return res.status(400).json({error:`Cannot Find Task with ${id}`})
   }
   res.status(200).json({data: TaskDeleted})
  }
  catch(err){
    res.status(400).json({error: "Cannot Delete" });
  }
};

module.exports = {
  getallTasks,
  addTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
