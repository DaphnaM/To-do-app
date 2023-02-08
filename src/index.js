import React from "react";

import { Provider } from "react-redux";
import store from "./store";
import TaskList from "./components /TaskList";
import { createRoot } from "react-dom/client";
import TitleAndButton from "./components /TitleAndButton";
import CreateTask from "./components /TaskForm";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <TitleAndButton />
    <TaskList />
  </Provider>
);
