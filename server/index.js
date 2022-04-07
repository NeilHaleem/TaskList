const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//MIDDLEWARE

//CORS allows API security configuration - allowing specific domains to make requests against the API
app.use(cors());
//Request JSON body
app.use(express.json());

//ROUTES//

//CREATE a task
app.post("/tasks", async (req, res) => {
    try {
      const { description } = req.body;
      const newTask = await pool.query(
        "INSERT INTO tasklist (description) VALUES($1) RETURNING *",
        [description]
      );
  
      res.json(newTask.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //GET all tasks  
  app.get("/tasks", async (req, res) => {
    try {
      const allTasks = await pool.query("SELECT * FROM tasklist");
      res.json(allTasks.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //GET a task  
  app.get("/tasks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const task = await pool.query("SELECT * FROM tasklist WHERE task_id = $1", [
        id
      ]);
  
      res.json(task.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //UPDATE a task  
  app.put("/tasks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updateTask = await pool.query(
        "UPDATE tasklist SET description = $1 WHERE task_id = $2",
        [description, id]
      );
  
      res.json("Task was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //DELETE a task  
  app.delete("/tasks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTask = await pool.query("DELETE FROM tasklist WHERE task_id = $1", [
        id
      ]);
      res.json("Task was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });
  
  app.listen(3000, () => {
    console.log("server is running on port 3000");
  });