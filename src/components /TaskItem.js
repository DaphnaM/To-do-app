import React, { useState } from "react";

import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { updateTask, add } from "../actions";
import StatusDropdown from "./StatusDropdown";
import "../App.css";
import { useDispatch } from "react-redux";
import TaskForm from "./TaskForm";

//Task component maps task information
const Task = ({ task, updateTask }) => {
  //const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const editTask = () => {
    setEditing(!editing);
  };

  return (
    <div className="task" onClick={editTask}>
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
          <div>
            <StatusDropdown task={task} />
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
