import React from "react";
import { useSelector } from "react-redux";

export default function SubTasks({ currentId }) {
  let tasks = useSelector((state) => state.tasksReducer.tasks);
  return (
    <div>
      <label className="sub-tasks-lable">Link to other tasks</label>
      <div className="sub-tasks-lable-container" name="subTasksContainer">
        {tasks
          .filter((task) => task.id !== currentId)
          .map((clickableTask) => {
            return (
              <div
                id="subTasksPicker"
                key={clickableTask.id}
                name="subTasks"
                value={clickableTask.title}
              >
                {clickableTask.title}
              </div>
            );
          })}
      </div>
    </div>
  );
}
