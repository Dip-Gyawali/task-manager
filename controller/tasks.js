const getallTasks = (req, res) => {
  res.status(200).json({ data: "get all data" });
};

const addTask = (req, res) => {
  res.status(201).json({ data: "add data" });
};

const getSingleTask = (req, res) => {
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
