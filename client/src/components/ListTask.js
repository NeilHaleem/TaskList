import React, { Fragment, useEffect, useState } from "react";

import EditTask from "./EditTask";

const ListTasks = () => {
  const [tasks, setTasks] = useState([]);

  //delete task function

  const deleteTask = async id => {
    try {
      const deleteTask = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE"
      });

      setTasks(tasks.filter(task => task.task_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks");
      const jsonData = await response.json();

      setTasks(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  console.log(tasks);

  return (
    <Fragment>
      {" "}
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th>TASK</th>
            <th>EDIT</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {tasks.map(task => (
            <tr key={task.task_id}>
              <td>{task.description}</td>
              <td>
                <EditTask task={task} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTask(task.task_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTasks;