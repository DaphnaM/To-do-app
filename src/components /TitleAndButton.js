import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../App.css";
import TaskForm from "./TaskForm.js";

//
const TitleAndButton = ({ onClick }) => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);

  return showForm ? (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h3>Tasks</h3>
        <button
          className="new_task_button"
          onClick={() => setShowForm(!showForm)}
        >
          Cancel
        </button>
      </div>
      <TaskForm />
    </>
  ) : (
    <div style={{ display: "flex", alignItems: "center" }}>
      <h3>Tasks</h3>
      <button
        className="new_task_button"
        onClick={() => setShowForm(!showForm)}
      >
        New Task
      </button>
    </div>
  );
};

export default TitleAndButton;
