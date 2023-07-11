import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Deadline = (props) => {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState("");
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const token = JSON.parse(localStorage.getItem("user")).token;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const { date } = props;
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000";

  const handleAddEvent = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/deadline`,
        {
          date: date,
          event: name,
        },
        config
      );
      console.log(response.data);
      response.data.data.map((item) => {
        if (item.date === date) {
          setEvents(item.events);
        }
      });
      setName("");
    } catch (error) {
      console.log(error);
      if (error?.response.status == 403) {
        localStorage.setItem("user", null);
        navigate("/login");
      }
    }
  };
  const handleRemoveEvent = async (event) => {
    try {
      const response = await axios.delete(
        `${API_URL}/deadline/${date}/${event}`,
        config
      );
      console.log(response.data);
      let isPresent = false;
      response.data.data.map((item) => {
        if (item.date === date) {
          isPresent = true;
          setEvents(item.events);
        }
      });
      if (!isPresent) setEvents([]);
    } catch (error) {
      console.log(error);
      if (error?.response.status == 403) {
        localStorage.setItem("user", null);
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const doc = await axios.get(`${API_URL}/deadline`, config);
      const response = doc.data;
      console.log(response);
      if (response) {
        response.data.map((item) => {
          if (item.date === date) {
            setEvents(item.events);
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
    <div className="flex flex-col gap-2 max-w-lg mx-auto">
      <h1 className="text-3xl font-medium font-lora">Deadlines 📅</h1>
      <p className="text-xl font-playfair">Add the event here:</p>

      {events.map((event) => (
        <div className="flex flex-row items-center justify-between gap-2">
          <h2 className="text-xl bg-red-400 border border-red-800 text-red-800 p-2 rounded basis-3/4">
            {event}
          </h2>
          <button
            className="text-xl p-2 bg-slate-600 text-white rounded basis-1/4 hover:opacity-90"
            onClick={() => handleRemoveEvent(event)}
          >
            X
          </button>
        </div>
      ))}

      <div className="flex flex-row items-center justify-between gap-2">
        <input
          type="text"
          className="border border-slate-300 rounded shadow text-xl p-2 basis-3/4 min-w-0"
          placeholder="Enter the event.."
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button
          className="text-xl p-2 bg-slate-600 text-white rounded basis-1/4 font-bold hover:opacity-90"
          onClick={handleAddEvent}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Deadline;
