import {
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_ERROR,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_ERROR,
  ADD_NEW_TASK_ERROR,
  ADD_NEW_TASK_SUCCESS,
} from "./actions";

const initialState = {
  tasks: [],
  editing: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        error: null,
      };
    case FETCH_TASKS_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    // update task success
    //update task error

    //add new task success  NOT DONE
    case ADD_NEW_TASK_SUCCESS:
      let currentTasks = state.tasks;
      console.log(currentTasks);
      console.log("action payload", action.payload);
      currentTasks = currentTasks.concat(action.payload);
      console.log(currentTasks);
      return {
        ...state,
        tasks: currentTasks,
        error: null,
      };
    case ADD_NEW_TASK_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case EDIT_TASK_SUCCESS:
      //edit task can maybe be used
      let tempTasks = state.tasks;
      let findId = tempTasks.find((item) => item.id === action.payload.id);
      //change image to new assignee?
      tempTasks[findId] = state.tasks.push(action.payload); //sending the whole task or only the assignee?
      return {
        ...state,
        tasks: tempTasks,
      };
    case EDIT_TASK_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
