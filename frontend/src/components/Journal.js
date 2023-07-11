import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Journal = (props) => {
  const [journal, setJournal] = useState("");
  const [isEditable, setEditable] = useState(true);
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const token = JSON.parse(localStorage.getItem("user")).token;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const { date } = props;
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000";

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/journal`,
        {
          date: props.date,
          message: journal,
        },
        config
      );
      console.log(response.data);
      setEditable(false);
    } catch (error) {
      console.log(error);
      if (error?.response.status == 403) {
        localStorage.setItem("user", null);
        navigate("/login");
      }
    }
  };

  const handleEdit = () => {
    setEditable(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const doc = await axios.get(`${API_URL}/journal`, config);
      const response = doc.data;
      if (response) {
        response.data.map((item) => {
          if (item.date === date) {
            setJournal(item.message);
            setEditable(false);
          }
        });
      }
    } catch (error) {
      console.log(error);
      if (error?.response.status == 403) {
        localStorage.setItem("user", null);
        navigate("/login");
      }
    }
  };

  return (
    <div className="my-8">
      <h1 className="text-3xl font-medium mb-4 font-lora">
        Journal for {date}
      </h1>
      {isEditable && (
        <div className="flex flex-col max-w-lg w-4/5 mx-auto gap-4">
          <textarea
            name="journal"
            id=""
            cols="30"
            rows="10"
            onChange={(e) => setJournal(e.target.value)}
            className="border border-slate-300 rounded shadow-xl text-xl p-4"
            placeholder="Write about your day here.."
          >
            {journal}
          </textarea>
          <button
            onClick={handleSubmit}
            className="text-xl p-2 bg-slate-600 text-white rounded hover:opacity-90"
          >
            Save
          </button>
        </div>
      )}
      {!isEditable && (
        <div className="flex flex-col max-w-lg w-4/5 mx-auto gap-4">
          <h3 className="border border-slate-300 rounded shadow-xl text-xl p-4 h-80 font-playfair font-medium">
            {journal}
          </h3>
          <button
            onClick={handleEdit}
            className="text-xl p-2 bg-slate-600 text-white rounded "
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Journal;
