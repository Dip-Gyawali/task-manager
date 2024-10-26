import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { taskContext } from "./context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";

type TaskData = {
  _id: string;
  name: string;
  completed: boolean;
};

export default function UpdateTask() {
  const naviagte = useNavigate();
  const { id } = useParams();
  const { dispatch } = useContext(taskContext);
  const [task, setTask] = useState<TaskData | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });

  useEffect(() => {
    const getSingleData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/tasks/${id}`);
        const taskData = res.data.data;
        setTask(taskData);
        setFormData({
          name: taskData.name,
          completed: taskData.completed,
        });
      } catch (err) {
        console.log(err);
      }
    };

    if (id) {
      getSingleData();
    }
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/v1/tasks/${id}`,
        formData
      );
      dispatch({ type: "EDIT_DATA", payload: res.data.data });
    } catch (err) {
      console.log(err);
    }
    naviagte("/");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "completed" ? value === "true" : value,
    }));
  };

  if (!task) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleUpdate}
        className="border-2 border-gray-400 rounded-xl p-10 flex flex-col items-center gap-6 min-h-[300px]"
      >
        <h1 className="text-2xl font-bold">Update Task</h1>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="name" className="font-medium">
            Name:{" "}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <label htmlFor="completed" className="font-medium">
            Status:
          </label>
          <select
            id="completed"
            name="completed"
            value={formData.completed.toString()}
            onChange={handleChange}
            className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="true">Completed</option>
            <option value="false">Not Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Update Task
        </button>
      </form>
    </div>
  );
}
