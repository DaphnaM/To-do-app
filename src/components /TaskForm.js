import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addNewTask, updateTask } from "../actions";
import "../App.css";

//Task from component, recieves current task and conditionally renders the data if currentTask exists
const TaskForm = ({ currentTask, editTask }) => {
  const dispatch = useDispatch();
  let tasks = useSelector((state) => state.tasksReducer.tasks);
  console.log(tasks);

  const [editing, setEditing] = useState(false);
  const [subTasksToUpdate, setSubTasksToUpdate] = useState([]);
  const [task, setTask] = useState({
    image: currentTask?.image ? currentTask?.image : "",
    title: currentTask?.title ? currentTask?.title : "",
    creationDate: currentTask?.creationDate ? currentTask?.creationDate : "",
    status: currentTask?.status ? currentTask?.status : "New",
    assignee: currentTask?.assignee ? currentTask?.assignee : "",
    description: currentTask?.description ? currentTask?.description : "",
    parentTask: currentTask?.parentTask ? currentTask?.parentTask : null,
    subTasks: currentTask?.subTasks ? currentTask?.subTasks : [],
  });

  const options = ["Done", "In Progress", "New"];

  const handleChange = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
    console.log("changing ", event.target.name, " to : ", event.target.value);
    let updatedTask = task;
    setEditing(true);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log("creating task ", task);
    if (currentTask) {
      dispatch(updateTask(task));
    } else {
      dispatch(addNewTask(task));
    }
    editTask();
  };

  //function to create sub task, not completed
  const pickSubTask = (clickedTask) => {
    setTask({ ...task, subTasks: task.subTasks.concat(clickedTask.id) });
    setSubTasksToUpdate([subTasksToUpdate, clickedTask.id]);
  };
  const testing = () => {
    console.log(currentTask);
  };

  return (
    <form className="form_wrapper" onClick={testing}>
      <span onClick={editTask}> ✖️ </span>
      <div className="form-row">
        <img src="https://icons-for-free.com/iconfiles/png/512/avatar+circle+male+profile+user+icon-1320196710301016992.png" />
        <div className="input_wrapper">
          <label htmlFor="inputTitle">Title</label>
          <input
            type="text"
            className="form-control"
            id="inputTitle"
            name="title"
            value={task.title}
            onChange={handleChange}
          />
        </div>

        <label htmlFor="inputCreationDate">{task.creationDate}</label>
      </div>
      <div className="form-row">
        <div className="input_wrapper">
          <label htmlFor="inputStatus">Status</label>

          <select
            className="status_dropdown"
            onChange={handleChange}
            value={task.status}
            name="status"
          >
            {options.map((option) =>
              option === task.status ? (
                <option key={option} value={option}>
                  {option}
                </option>
              ) : (
                <option key={option} value={option}>
                  {option}
                </option>
              )
            )}
          </select>
        </div>

        <div className="input_wrapper">
          <label htmlFor="inputAssignee">Assignee</label>
          <input
            type="text"
            className="form-control"
            id="inputAssignee"
            name="assignee"
            value={task.assignee}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="inputDescription">Description</label>
        <textarea
          className="form-control"
          id="inputDescription"
          name="description"
          rows="3"
          value={task.description}
          onChange={handleChange}
        />

        {task.parentTask ? (
          <></>
        ) : (
          <>
            {tasks.map((clickableTask) => {
              <div onClick={() => pickSubTask(clickableTask)}>
                {" "}
                {clickableTask.title}
              </div>;
            })}
          </>
        )}

        <button
          type="submit"
          onClick={handleSubmitForm}
          className="submit_button"
        >
          {" "}
          {currentTask ? "Update task" : "Add task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
