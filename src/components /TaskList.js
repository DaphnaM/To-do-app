import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksSuccess, fetchTasksError } from "../actions";
import Task from "./TaskItem";
import "../App.css";

//Task list component. Fetches tasks from server
const TaskListContainer = () => {
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

  return <TaskList tasks={tasks} />;
};

export function TaskList({ tasks = [] }) {
  return (
    <div>
      {tasks.map((task) => (
        <Task className="task" key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskListContainer;
