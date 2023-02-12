import React, { useState } from "react";
import SubTasks from "./SubTasks";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewTask,
  deleteTask,
  toggleEditing,
  toggleTaskEditing,
  updateTask,
} from "../actions";
import "../App.css";
import { TaskList } from "./TaskList";

//Task from component, recieves current task and conditionally renders the data if currentTask exists

const TaskForm = ({ currentTask }) => {
  const dispatch = useDispatch();
  let tasks = useSelector((state) => state.tasksReducer.tasks);
  let team = useSelector((state) => state.tasksReducer.team);
  const createDate = () => {
    const now = new Date();
    return now.toDateString();
  };
  const newTask = {
    id: Math.random() * 1000,
    imageSrc:
      "https://icons-for-free.com/iconfiles/png/512/avatar+circle+male+profile+user+icon-1320196710301016992.png",
    title: "",
    creationDate: createDate(),
    status: "New",
    assignee: "Unassigned",

    description: "",
    relatedTasks: [],
  };
  const currentTaskState = currentTask ? currentTask : newTask;
  const [subTasks, setSubTasks] = useState([]);
  const [editTitle, setEditTitle] = useState(false);

  const [task, setTask] = useState(currentTaskState);

  const options = ["Done", "In Progress", "New"];

  const handleChange = (event) => {
    if (event.target.name === "subTasks") {
      setSubTasks(event.target.value);

      setTask({ ...task, subTasks: subTasks });
    } else {
      setTask({
        ...task,
        [event.target.name]: event.target.value,
      });
    }
  };
  const handleSubmitForm = (e) => {
    console.log(tasks.length);
    e.preventDefault();
    if (currentTask) {
      dispatch(updateTask({ ...task }));
      setTask(task);
    } else {
      dispatch(addNewTask({ ...task, subTasks: subTasks }));
    }
  };

  const closeForm = () => {
    console.log("closing task", currentTask);
    const dispatchEvent = currentTask
      ? toggleTaskEditing(currentTask)
      : toggleEditing();

    dispatch(dispatchEvent);
  };
  const handleEditTitle = () => {
    setEditTitle(!editTitle);
  };
  const handleDeleteTask = () => {
    dispatch(deleteTask(currentTask.id));
  };
  const relatedTaskIds = currentTask?.relatedTasks || [];

  const relatedTasks = tasks.filter((task) => relatedTaskIds.includes(task.id));

  return (
    <form className="new-task-form_wrapper">
      <div className="upper-right-cotainer">
        <span title="Close" className="x-icon" onClick={closeForm}>
          {" "}
          ✖️{" "}
        </span>

        {currentTask ? (
          <span title="Trash" onClick={handleDeleteTask}>
            {" "}
            🗑️{" "}
          </span>
        ) : (
          <></>
        )}
        {currentTask ? (
          <span
            title="Duplicate"
            onClick={() => {
              dispatch(addNewTask(currentTask));
              closeForm();
              return console.log("duplicated task");
            }}
          >
            <img className="duplicate-icon" src="/icon (1).svg" alt="icon" />
          </span>
        ) : (
          <></>
        )}
      </div>

      <div className="form-row">
        <img className="form-image" src="/icon.svg" alt="icon" />
        <div className="form-row-1">
          {editTitle ? (
            <div className="input_wrapper">
              <input
                type="text"
                className="form-control"
                id="inputTitle"
                name="title"
                value={task.title}
                onChange={handleChange}
              />
            </div>
          ) : (
            <div
              className="task-title form-task-title"
              onClick={handleEditTitle}
            >
              {task.title ? task.title : "New Task"}
            </div>
          )}

          <div className="creationDate" htmlFor="inputCreationDate">
            {task.creationDate}
          </div>
        </div>
      </div>
      <hr />
      <div className="form-row-2 form-row">
        <div className="row_2_wrapper">
          <div className="lable-row-2" htmlFor="inputStatus">
            Status
          </div>

          <select
            className="status_dropdown select-hover"
            onChange={handleChange}
            value={task.status}
            //onChange={()=>{console.log("")}} //got an error that
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
          {/* <i className="arrow down"></i> from liminal*/}
        </div>

        <div className="input_wrapper">
          <div className="row_2_wrapper">
            <div className="lable-row-2" htmlFor="inputAssignee">
              Assign to
            </div>

            <select
              className="status_dropdown"
              onChange={handleChange}
              value={task.assignee ? task.assignee : null}
              name="assignee"
            >
              <option value="Pick assignee">Unassigned</option>
              {team.map((teamMember) => (
                <option key={teamMember} value={teamMember}>
                  {teamMember}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="input-description" htmlFor="inputDescription">
          Description
        </label>
        <textarea
          className="form-control"
          id="inputDescription"
          name="description"
          rows="3"
          value={task.description}
          onChange={handleChange}
        />
        <label className="related-tasks-title"> Related tasks</label>
        <TaskList tasks={relatedTasks} isSubTask={true} />

        {currentTask ? (
          <SubTasks currentId={task.id} subTasksIds={relatedTaskIds} />
        ) : (
          <></>
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
