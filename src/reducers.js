import {
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_ERROR,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_ERROR,
  ADD_NEW_TASK_ERROR,
  ADD_NEW_TASK_SUCCESS,
  TOGGLE_EDITING,
  TOGGLE_TASK_EDITING,
  ADD_RELATED_TASKS,
  DELETE_TASK_ERROR,
  DELETE_TASK_SUCCESS,
} from "./actions";

const initialState = {
  tasks: [],
  team: ["Daphna", "Alex", "Omer"],
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
    case ADD_NEW_TASK_SUCCESS:
      let currentTasks = state.tasks;
      currentTasks = currentTasks.concat(action.payload);
      return {
        ...state,
        tasks: currentTasks,
        editing: false,
        error: null,
      };
    case ADD_NEW_TASK_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case EDIT_TASK_SUCCESS:
      console.log(action.payload);
      const newTasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? {
              ...action.payload,
              relatedTasks: task.relatedTasks,
              editing: false,
            }
          : task
      );
      return {
        ...state,
        tasks: newTasks,
      };
    case EDIT_TASK_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.task.filter((task) => task.id !== action.payload),
      };
    case DELETE_TASK_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case TOGGLE_EDITING:
      return {
        ...state,
        editing: !state.editing,
      };

    case TOGGLE_TASK_EDITING:
      console.log(
        "editing now is going to be",
        state.tasks,
        "action.payload:",
        action.payload
      );
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, editing: !task.editing }
            : task
        ),
      };
    //Gets two task ids and adds to each the other as a related task.
    case ADD_RELATED_TASKS:
      const { task1, task2 } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === task1) {
            console.log("adding to task id", task.id, task2);
            return { ...task, relatedTasks: [...task.relatedTasks, task2] };
          }
          if (task.id === task2) {
            console.log("adding to task id", task.id, task1);
            return { ...task, relatedTasks: [...task.relatedTasks, task1] };
          }
          return task;
        }),
      };
    default:
      return state;
  }
}
