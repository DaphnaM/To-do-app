import React, { useEffect, useState } from "react";
import SubTasks from "./SubTasks";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewTask,
  toggleEditing,
  toggleTaskEditing,
  updateTask,
} from "../actions";
import "../App.css";
import { TaskList } from "./TaskList";

//Task from component, recieves current task and conditionally renders the data if currentTask exists

const TaskForm = ({ currentTask, editTask }) => {
  const dispatch = useDispatch();
  let tasks = useSelector((state) => state.tasksReducer.tasks);
  let team = useSelector((state) => state.tasksReducer.team);
  // let taskId = useSelector((state) => {
  //   const lastTaskIndex = state.taskReducer.tasks?.length - 1;
  //   const lastTask = state.taskReducer.tasks[lastTaskIndex];
  //   return console.log(lastTask);
  // });
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
    assignee: "Pick assignee",

    description: "",
    //parentTask: currentTask.parentTask || null,
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

      let updatedTask = task;
    }
  };
  const handleSubTaskClick = (event) => {
    setSubTasks(event.target.value);

    setTask({ ...task, subTasks: subTasks });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (currentTask) {
      dispatch(updateTask({ ...task }));
      setTask(task);

      //currentTask = [];
    } else {
      dispatch(addNewTask({ ...task, subTasks: subTasks }));
      //currentTask = [];
    }
    closeForm();
  };

  //function to create sub task, not completed
  const pickSubTask = (clickedTask) => {
    setTask({ ...task, subTasks: "sub task" });
    // setSubTasksToUpdate([...subTasksToUpdate, clickedTask.id]);

    //console.log(subTasksToUpdate);
  };

  const closeForm = () => {
    const dispatchEvent = currentTask
      ? toggleTaskEditing(currentTask)
      : toggleEditing();

    dispatch(dispatchEvent);
  };
  const handleEditTitle = () => {
    setEditTitle(!editTitle);
  };

  const relatedTaskIds = currentTask.relatedTasks || [];

  const relatedTasks = tasks.filter((task) => relatedTaskIds.includes(task.id));

  return (
    <form className="form_wrapper">
      <span onClick={closeForm}> ✖️ </span>
      <div className="form-row">
        <img className="form-image" src="/icon.svg" />
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
            <label
              className="task-title form-task-title"
              onClick={handleEditTitle}
            >
              {task.title ? task.title : "New Task"}
            </label>
          )}

          <label className="creationDate" htmlFor="inputCreationDate">
            {task.creationDate}
          </label>
        </div>
      </div>
      <hr />
      <div className="form-row-2 form-row">
        <div className="input_wrapper">
          <label className="lable-row-2" htmlFor="inputStatus">
            Status
          </label>

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
          <i className="arrow down"></i>
        </div>

        <div className="input_wrapper">
          <div className="input_wrapper">
            <label className="lable-row-2" htmlFor="inputAssignee">
              Assign to
            </label>

            <select
              className="status_dropdown"
              onChange={handleChange}
              value={task.assignee ? task.assignee : null}
              name="assignee"
            >
              <option value="Pick assignee">Pick assignee</option>
              {team.map((teamMember) => (
                <option key={teamMember} value={teamMember}>
                  {teamMember}
                </option>
              ))}
            </select>
            <i className="arrow down"></i>
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

        {/*
        
        {task.parentTask ? (
          <></>
        ) : (
          <>
            {tasks.map((clickableTask) => {
              <div onClick={handleChange}> {clickableTask.title}</div>;
            })}
          </>
        )}

        */}
        <div>
          <lable>Related tasks</lable>
          <TaskList tasks={relatedTasks} isSubTask={true} />
        </div>

        <SubTasks currentId={task.id} />
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
