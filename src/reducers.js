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
} from "./actions";

const initialState = {
  tasks: [],
  team: ["Daphna", "Alex", "Omer"],
  editing: false,
  error: null,
};
const createInitialState = (state) => {
  return {
    ...state,
    tasks: state.tasks.map((task) => {
      return {
        ...task,
        editing: false,
      };
    }),
  };
};
export default function reducer(
  state = createInitialState(initialState),
  action
) {
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
      currentTasks = currentTasks.concat(action.payload);
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
      const newTasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
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
    case TOGGLE_EDITING:
      return {
        ...state,
        editing: !state.editing,
      };

    case TOGGLE_TASK_EDITING:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, editing: !task.editing }
            : task
        ),
      };
    case ADD_RELATED_TASKS:
      const { task1, task2 } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === task1) {
            return { ...task, relatedTasks: [...task.relatedTasks, task2] };
          }
          if (task.id === task2) {
            return { ...task, relatedTasks: [...task.relatedTasks, task1] };
          }
          return task;
        }),
      };
    default:
      return state;
  }
}
