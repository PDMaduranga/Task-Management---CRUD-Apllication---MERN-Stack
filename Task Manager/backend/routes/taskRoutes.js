import express from "express";
import { Task } from "../models/taskModel.js";

const router = express.Router();

//ROte for Save a new Book
router.post("/", async (request, response) => {
  try {
    if (!request.body.title || !request.body.description) {
      return response.status(400).send({
        message: "Send all required fields: title, description",
      });
    }
    const newTask = {
      title: request.body.title,
      description: request.body.description,
    };
    const task = await Task.create(newTask);

    return response.status(201).send(task);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for get all Task from database
router.get("/", async (request, response) => {
  try {
    const tasks = await Task.find({});

    return response.status(200).json({
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.log(error.message);
    response.staq(500).send({ message: error.message });
  }
});

//Route for get one book from databaseby id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const task = await Task.findById(id);

    return response.status(200).json(task);
  } catch (error) {
    console.log(error.message);
    response.staq(500).send({ message: error.message });
  }
});

// Route for Update a Task
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.description ||
      !request.body.completed
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, description, completed",
      });
    }

    const { id } = request.params;

    const result = await Task.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Task not found" });
    }

    return response.status(200).send({ message: "Task update successfully" });
  } catch (erorr) {
    console.log(erorr.message);
    response.status(500).send({ message: erorr.message });
  }
});

//Route for Delete a Task
router.delete("/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return response.status(404).json({ message: "Task not found" });
    }

    response.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
