import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleEditing } from "../actions";
import "../App.css";
import TaskForm from "./TaskForm.js";

//
const TitleAndButton = ({ onClick, showForm }) => {
  const dispatch = useDispatch();
  const editing = useSelector((state) => state.tasksReducer.editing);
  const handleClick = () => {
    dispatch(toggleEditing());
  };

  return editing ? (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h3>Tasks</h3>
        <button className="new_task_button" onClick={handleClick}>
          Cancel
        </button>
      </div>
      <TaskForm />
    </>
  ) : (
    <div style={{ display: "flex", alignItems: "center" }}>
      <h3>Tasks</h3>
      <button className="new_task_button" onClick={handleClick}>
        New Task
      </button>
    </div>
  );
};

export default TitleAndButton;
