import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { addRelatedTasks } from "../actions";

export default function SubTasks({ currentId, subTasksIds }) {
  let tasks = useSelector((state) => state.tasksReducer.tasks);
  const dispatch = useDispatch();

  const addRelatedTasksHandler = (clickableTaskId) => {
    console.log(clickableTaskId, currentId);
    dispatch(addRelatedTasks(clickableTaskId, currentId));
  };
  const notIncludedIds = [currentId, ...subTasksIds]; //ids of tasks not to include in the related tasks picker
  return (
    <div>
      <label className="sub-tasks-lable">Link to other tasks</label>
      <div className="sub-tasks-lable-container" name="subTasksContainer">
        {tasks
          .filter((task) => !notIncludedIds.includes(task.id))
          .map((clickableTask) => {
            return (
              <div
                id="subTasksPicker"
                key={clickableTask.id}
                name="subTasks"
                value={clickableTask.title}
                onClick={() => addRelatedTasksHandler(clickableTask.id)}
              >
                {clickableTask.title}
              </div>
            );
          })}
      </div>
    </div>
  );
}
