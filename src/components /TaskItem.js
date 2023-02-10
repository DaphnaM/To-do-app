import { useDispatch } from "react-redux";
import StatusDropdown from "./Dropdown";
import "../App.css";
import TaskForm from "./TaskForm";
import { toggleTaskEditing } from "../actions";
import SubTasks from "./SubTasks";

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

  //Passing down currentTask to know if were editing a task or if we're creating a new task
  return (
    <div className="task" onClick={handleClick}>
      {editing && !isSubTask ? ( //making sure doesn't open form inside form
        <TaskForm currentTask={task} />
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
              <div className="creation-date">
                Creation date: {task.creationDate}
              </div>
              <div></div>
            </div>
          </div>
          <div className="task-line-status">
            <hr className="small-line" />
            <div className="task-status-dropdown">
              <StatusDropdown task={task} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
