import React, { useState } from "react";
import { useDispatch } from "react-redux";
import StatusDropdown from "./Dropdown";
import "../App.css";
import TaskForm from "./TaskForm";
import { toggleTaskEditing } from "../actions";

//Task component maps task information
const Task = ({ task, isSubTask = false }) => {
  const dispatch = useDispatch();

  const { editing } = task;

  const openEditMode = () => {
    console.log("toggle task editing", task);
    dispatch(toggleTaskEditing(task));
  };
  const handleClick = (event) => {
    console.log(event.target.name);
    if (!editing && !isSubTask) openEditMode();
  };

  //Passing down currentTask to know if were editing a task or if we're creating a new task
  return (
    <div className="task form_wrapper" onClick={handleClick}>
      {editing ? (
        <TaskForm currentTask={task} />
      ) : (
        <>
          <img className="task__image" src={task.imageSrc} />

          <div>
            <div className="task__title">{task.title}</div>
            <div className="task__info">
              Assigned to: {task.assignee}
              <br />
              Created at: {task.creationDate}
            </div>
          </div>
          <div className="task-status-dropdown">
            <StatusDropdown task={task} />
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
