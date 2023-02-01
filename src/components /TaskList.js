import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksSuccess, fetchTasksError } from "../actions";
import Task from "./TaskItem";
import "../App.css";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasksReducer.tasks);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3001/tasks");
        const data = await response.json();
        console.log(data);
        dispatch(fetchTasksSuccess(data));
      } catch (error) {
        dispatch(fetchTasksError(error));
      }
    };

    fetchTasks();
  }, [dispatch]);

  return (
    <div>
      {tasks.map((task) => (
        <Task
          className="task"
          key={task.id}
          // imageSrc={task.imageSrc}
          // title={task.title}
          // assignee={task.assignee}
          // creationDate={task.creationDate}
          // status={task.status}
          task={task}
        />
      ))}
    </div>
  );
};

export default TaskList;
