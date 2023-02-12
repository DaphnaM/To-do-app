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
    if (!editing && !isSubTask) openEditMode();
  };

  const className = () => {
    if (!editing && !isSubTask) return "task";
    if (editing && !isSubTask) return "task-form-open";
    if (isSubTask) return "task sub-task";
  };

  //Passing down currentTask
  return (
    <div className={className()} onClick={handleClick}>
      {editing && !isSubTask ? ( //making sure doesn't open form inside form
        <div className="task-form-container">
          <TaskForm currentTask={task} />
        </div>
      ) : (
        <>
          <div className="left-side-container">
            <img className="form-image" src="/icon.svg" alt="icon" />
            <div className="assignee__title">{task.assignee}</div>
          </div>
          <div>
            <div className="task__title">{task.title}</div>
            <div className="task__info">
              <div className="assignee__title">{task.assignee}</div>
              <span className="dot"></span>
              <div
                className={
                  isSubTask ? "creation-date sub-task-date" : "creation-date"
                }
              >
                Creation date: {task.creationDate}
              </div>
            </div>
          </div>
          <div className="task-line-status">
            <hr className="small-line" />
            <div className="status_dropdown ">
              <StatusDropdown
                editing={editing}
                task={task}
                isSubTask={isSubTask}
              />
            </div>
          </div>
          {isSubTask ? (
            <></>
          ) : (
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="task-arrow"
            >
              <path
                d="M1 13L7 7.00003L1 1.00003"
                stroke="#98A2B3"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          )}
        </>
      )}
    </div>
  );
};

export default Task;
