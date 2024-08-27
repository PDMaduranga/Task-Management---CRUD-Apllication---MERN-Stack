import React, { useState, useEffect } from "react";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const UpdateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/tasks/${id}`)
      .then((response) => {
        setDescription(response.data.description);
        setCompleted(response.data.completed);
        setTitle(response.data.title);
        setLoading(false);
      })
      .catch((erorr) => {
        setLoading(false);
        alert("An erorr happened. Please chack console");
        console.log(erorr);
      });
  }, []);

  const handleUpdateTask = () => {
    const data = {
      title,
      description,
      completed,
    };
    setLoading(true);
    axios
      .put(`http://localhost:3000/tasks/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("taskk update successfully", { variant: "success" });
        navigate("/");
      })
      .catch((erorr) => {
        setLoading(false);
        enqueueSnackbar("Erorr", { variant: "erorr" });
        console.log(erorr);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Update Task</h1>
      {loading ? <Spinner /> : ""}
      <diV className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gtsy-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gtsy-500">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gtsy-500">Publish Year</label>
          <input
            type="chechbox"
            value={completed}
            onChange={(e) => setCompleted(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleUpdateTask}>
          Save
        </button>
      </diV>
    </div>
  );
};

export default UpdateTask;
