import React, { useState } from "react";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteTask = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteTask = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/tasks/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Task deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch((erorr) => {
        setLoading(false);
        alert("An erorr happend, please check console");
        enqueueSnackbar("Error", { variant: "error" });
        console.log(erorr);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Task</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are You Sure You want to delete this task?</h3>

        <button
          className="p-4 bg-red-600 text-white"
          onClick={handleDeleteTask}
        >
          Yse, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteTask;
