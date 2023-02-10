import React from "react";

import { Provider } from "react-redux";
import store from "./store";
import TaskList from "./components /TaskList";
import { createRoot } from "react-dom/client";
import TitleAndButton from "./components /TitleAndButton";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <div className="body">
    <Provider store={store}>
      <TitleAndButton />
      <TaskList />
    </Provider>
  </div>
);
