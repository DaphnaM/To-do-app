import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksSuccess, fetchTasksError } from "../actions";
import Task from "./TaskItem";
import "../App.css";
import Pagination from "./Pagination";

//Task list component. Fetches tasks from server
const TaskListContainer = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasksReducer.tasks);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3001/tasks");
        const data = await response.json();

        dispatch(fetchTasksSuccess(data));
      } catch (error) {
        dispatch(fetchTasksError(error));
      }
    };

    fetchTasks();
  }, [dispatch]);

  return <TaskList tasks={tasks} />;
};

export function TaskList({ tasks = [], isSubTask }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [taskList, setTaskList] = useState([]); //State for pagination
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    setTaskList(
      tasks.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      )
    );
  }, [tasks, currentPage]);

  //Pagination click handler passed down to Pagination component
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="task-list-container">
      {taskList.map((task) => (
        <Task
          className="task"
          key={task.id}
          task={task}
          isSubTask={isSubTask}
        />
      ))}
      {isSubTask ? (
        <></>
      ) : (
        <Pagination
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={tasks.length}
          currentPage={currentPage}
          onPageClick={handlePageClick}
        />
      )}
    </div>
  );
}

export default TaskListContainer;
