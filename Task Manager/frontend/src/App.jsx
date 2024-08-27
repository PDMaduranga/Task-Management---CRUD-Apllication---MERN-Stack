import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateTasks from "./pages/CreateTasks";
import UpdateTask from "./pages/UpdateTask";
import DeleteTask from "./pages/DeleteTask";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks/create" element={<CreateTasks />} />
      <Route path="/tasks/edit/:id" element={<UpdateTask />} />
      <Route path="/tasks/delete/:id" element={<DeleteTask />} />
    </Routes>
  );
};

export default App;
