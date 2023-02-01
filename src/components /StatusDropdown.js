import { useDispatch } from "react-redux";
import "react-dropdown/style.css";
import { useState } from "react";
import { updateTask } from "../actions.js";
import "../App.css";

//Status dropdown component
const StatusDropdown = ({ task }) => {
  const dispatch = useDispatch();
  console.log(task);
  const options = ["Done", "In Progress", "New"];
  const [newStatus, setNewStatus] = useState(task.status);

  const handleChange = (e) => {
    console.log(e);
    let updatedTask = task;
    updatedTask.status = e.target.value;
    setNewStatus(e.target.value);
    dispatch(updateTask(updatedTask));
  };
  const colorSelector = () => {
    switch (newStatus) {
      case "Done":
        return "#c2fac2";
        break;
      case "In Progress":
        return "#f3f79d";
        break;
      case "New":
        return "#ced8fb";
        break;

      default:
        break;
    }
  };

  //CHECKKK SELECT OR DEFAULT VALUE
  return (
    <select
      className="status_dropdown"
      onChange={handleChange}
      value={newStatus}
      style={{ backgroundColor: colorSelector() }}
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

export default StatusDropdown;

/*
inside the first select tag
className="task__status"
          value={selectedOption}
*/
