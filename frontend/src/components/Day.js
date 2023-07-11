import React from "react";
import Journal from "./Journal";
import { useNavigate, useParams } from "react-router-dom";
import Birthday from "./Birthday";
import Deadline from "./Deadline";
import Navbar from "./Navbar";

const Day = () => {
  const navigate = useNavigate();
  const { date } = useParams();

  return (
    <div>
      <Navbar />
      <button
        className="text-xl p-2 bg-slate-600 text-white rounded hover:opacity-90 my-4"
        onClick={() => navigate("/")}
      >
        Back to Calender
      </button>
      <Journal date={date} />
      <div className="flex flex-col md:flex-row gap-8 max-w-4xl w-4/5 mx-auto justify-between my-12">
        <Birthday date={date} />
        <Deadline date={date} />
      </div>
    </div>
  );
};

export default Day;
