import { useDispatch } from "react-redux";
import "react-dropdown/style.css";
import { useState } from "react";
import { updateTask } from "../actions.js";
import "../App.css";

//Status dropdown component
const Dropdown = ({ task }) => {
  const dispatch = useDispatch();
  const options = ["Done", "In Progress", "Open"];
  const [newStatus, setNewStatus] = useState(task.status);

  const handleChange = (e) => {
    let updatedTask = task;
    updatedTask.status = e.target.value;
    setNewStatus(e.target.value);
    dispatch(updateTask({ ...updatedTask }));
  };
  const colorSelector = () => {
    switch (newStatus) {
      case "Done":
        return "#c2fac2";
        break;
      case "In Progress":
        return "#f3f79d";
        break;
      case "Open":
        return "#ced8fb";
        break;

      default:
        break;
    }
  };
  const handleSelectClick = (e) => {
    e.stopPropagation();
  };

  return (
    <select
      className="status_dropdown dropdown_task"
      onChange={handleChange}
      value={newStatus}
      style={{ backgroundColor: colorSelector() }}
      onClick={handleSelectClick}
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
