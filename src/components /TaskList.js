import React, { useEffect, useState } from "react";
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

        dispatch(fetchTasksSuccess(data));
      } catch (error) {
        dispatch(fetchTasksError(error));
      }
    };

    fetchTasks();
  }, [dispatch]);

  return <TaskList tasks={tasks} />;
};
function Pagination({ itemsPerPage, totalItems, currentPage, onPageClick }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from(Array(totalPages), (_, index) => index + 1);

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          key={page}
          className={`pagination pagination__page-number ${
            currentPage === page ? "active" : ""
          }`}
          onClick={() => onPageClick(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export function TaskList({ tasks = [], isSubTask }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [taskList, setTaskList] = useState([]);
  const ITEMS_PER_PAGE = 10;
  useEffect(() => {
    setTaskList(
      tasks.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      )
    );
  }, [tasks, currentPage]);

  const handlePageClick = (pageNumber) => {
    console.log(pageNumber);
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
