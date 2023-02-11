import { useDispatch, useSelector } from "react-redux";
import { toggleEditing } from "../actions";
import "../App.css";
import TaskForm from "./TaskForm.js";

//
const TitleAndButton = () => {
  const dispatch = useDispatch();
  const editing = useSelector((state) => state.tasksReducer.editing);
  const handleClick = () => {
    dispatch(toggleEditing());
  };

  return editing ? (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="tasks-title">Tasks</div>
        <button className="new_task_button" onClick={handleClick}>
          Cancel
        </button>
      </div>
      <div className="new-task-form-container">
        <TaskForm />
      </div>
    </>
  ) : (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div className="tasks-title">Tasks</div>
      <button className="new_task_button" onClick={handleClick}>
        New Task
      </button>
    </div>
  );
};

export default TitleAndButton;
