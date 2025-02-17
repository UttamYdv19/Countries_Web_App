import React, { useState } from "react";
import "./App.css";
import Heaader from "./Component/Heaader";
import { Outlet } from "react-router";
import { ThemeProvider } from "./Contexts/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <Heaader />
      <Outlet />
    </ThemeProvider>
  );
};
if (module.hot) {
  module.hot.accept();
}
export default App;
