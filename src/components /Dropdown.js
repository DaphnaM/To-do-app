import { useDispatch } from "react-redux";
import "react-dropdown/style.css";
import { useState } from "react";
import { updateTask } from "../actions.js";
import "../App.css";

//Status dropdown component
const Dropdown = ({ task, isSubTask, editing }) => {
  const dispatch = useDispatch();
  const options = ["Done", "In Progress", "Open"];
  const [newStatus, setNewStatus] = useState(task.status);

  const handleChange = (e) => {
    let updatedTask = task;
    updatedTask.status = e.target.value;
    setNewStatus(e.target.value);
    dispatch(updateTask({ ...updatedTask }));
  };

  const handleSelectClick = (e) => e.stopPropagation();

  return (
    <select
      className="status_dropdown"
      onChange={handleChange}
      value={newStatus}
      onClick={handleSelectClick}
      disabled={isSubTask ? true : false}
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
  );
};

export default Dropdown;
