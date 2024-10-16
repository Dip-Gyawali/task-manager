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
  res.status(200).json({ data: "get data by id" });
};

const updateTask = (req, res) => {
  res.status(200).json({ data: "update data" });
};

const deleteTask = (req, res) => {
  res.status(200).json({ data: "deleted" });
};

module.exports = {
  getallTasks,
  addTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
