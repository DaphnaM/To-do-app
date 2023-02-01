import axios from "axios";
export const FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS";
export const FETCH_TASKS_ERROR = "FETCH_TASKS_ERROR";
export const UPDATE_TASKS_STATUS_SUCCESS = "UPDATE_TASKS_STATUS_SUCCESS";
export const UPDATE_TASKS_STATUS_ERROR = "UPDATE_TASKS_STATUS_ERROR";
export const EDIT_TASK_SUCCESS = "EDIT_TASK_SUCCESS";
export const ADD_TASKS_STATUS_SUCCESS = "ADD_TASKS_STATUS_SUCCESS";
export const ADD_TASKS_STATUS_ERROR = "ADD_TASKS_STATUS_ERROR";
export const EDIT_TASK_ERROR = "EDIT_TASK_ERROR";
export const ADD_NEW_TASK_ERROR = "ADD_NEW_TASK_ERROR";
export const ADD_NEW_TASK_SUCCESS = "ADD_NEW_TASK_SUCCESS";

export const fetchTasksSuccess = (tasks) => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasks,
});

export const fetchTasksError = (error) => ({
  type: FETCH_TASKS_ERROR,
  payload: error,
});

export const addTaskStatusSuccess = (task) => ({
  type: ADD_TASKS_STATUS_SUCCESS,
  payload: task,
});

export const addTaskStatusError = (error) => ({
  type: ADD_TASKS_STATUS_ERROR,
  payload: error,
});

export const editTaskSuccess = (task) => ({
  type: EDIT_TASK_SUCCESS,
  payload: task,
});

export const editTaskError = (error) => ({
  type: EDIT_TASK_ERROR,
  payload: error,
});

export const addNewTaskSuccess = (task) => ({
  type: ADD_NEW_TASK_SUCCESS,
  payload: task,
});

export const addNewTaskError = (error) => ({
  type: ADD_NEW_TASK_ERROR,
  payload: error,
});

export const updateTask = (task) => {
  return (dispatch) => {
    axios
      .put(`http://localhost:3001/task/${task.id}`, task)
      .then((response) => {
        dispatch(editTaskSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(editTaskError(error));
      });
  };
};

export const addNewTask = (task) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:3001/tasks/`, task)
      .then((response) => {
        dispatch(addNewTaskSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(addNewTaskError(error));
      });
  };
};
