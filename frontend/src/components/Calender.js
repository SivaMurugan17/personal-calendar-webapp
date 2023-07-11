import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Summary from "./Summary";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Calender = () => {
  const [array, setArray] = useState([]);
  const [month, setMonth] = useState(-1);
  const [year, setYear] = useState(-1);
  const [currDate, setCurrdate] = useState("");
  const navigate = useNavigate();
  const leftArrow = "<";
  const rightArrow = ">";
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const count = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysShort = ["S", "M", "T", "W", "T", "F", "S"];
  const API_URL = "http://localhost:5000";

  useEffect(() => {
    const curr = new Date();
    fetchArray(curr.getMonth(), curr.getFullYear());
    setCurrdate(
      `${curr.getDate()}-${curr.getMonth() + 1}-${curr.getFullYear()}`
    );
  }, []);

  const checkLeapYear = (yr) => {
    if (yr % 4 !== 0) {
      //not a leap
      count[1] = 28;
    } else {
      if (yr % 100 === 0) {
        //not a leap
        count[1] = 28;
      } else {
        //leap
        count[1] = 29;
      }
    }
  };

  const fetchArray = (m, y) => {
    if (m === -1) {
      m = 11;
      y--;
    } else if (m === 12) {
      m = 0;
      y++;
    }
    setMonth(m);
    setYear(y);
    checkLeapYear(y);
    const temp = new Array(42);
    temp.fill({ date: "" });
    let startday = new Date(y, m, 1).getDay();
    for (let i = 0; i < count[m]; i++) {
      temp[startday] = { date: i + 1 };
      startday++;
    }
    // console.log(temp);
    setArray(temp);
  };

  useEffect(() => {
    fetchData();
  }, [month]);

  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const token = JSON.parse(localStorage.getItem("user")).token;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [birthdays, setBirthdays] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const fetchData = async () => {
    try {
      let response = await axios.get(`${API_URL}/birthday`, config);
      if (response.data) {
        const bArray = response.data.data.filter((item) => {
          return month + 1 === Number(item.date.split("-")[1]);
        });
        setBirthdays(bArray);
      }
      response = await axios.get(`${API_URL}/deadline`, config);
      if (response.data) {
        const dArray = response.data.data.filter((item) => {
          return (
            month + 1 === Number(item.date.split("-")[1]) &&
            year === Number(item.date.split("-")[2])
          );
        });
        setDeadlines(dArray);
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
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8">
        <div className="w-4/5 mx-auto flex flex-row justify-between items-center">
          <button
            className="bg-slate-600 text-white p-2 text-2xl rounded hover:opacity-90 basis-1/6"
            onClick={() => fetchArray(month - 1, year)}
          >
            {leftArrow}
          </button>
          <h1 className="text-4xl font-medium p-4 basis-2/3 font-lora">{`${months[month]} ${year}`}</h1>
          <button
            className="bg-slate-600 text-white p-2 text-2xl rounded hover:opacity-90 basis-1/6"
            onClick={() => fetchArray(month + 1, year)}
          >
            {rightArrow}
          </button>
        </div>

        <div className="mb-6 shadow-lg w-4/5 mx-auto">
          <div className="bg-slate-100 sm:grid sm:grid-cols-7 text-2xl py-4 hidden">
            {days.map((day, index) => (
              <h1 key={index} className="font-cinzel">
                {day}
              </h1>
            ))}
          </div>
          <div className="bg-slate-100 grid grid-cols-7 text-2xl py-4 sm:hidden">
            {daysShort.map((day, index) => (
              <h1 key={index} className="font-cinzel">
                {day}
              </h1>
            ))}
          </div>
          <div className="grid grid-cols-7 text-xl">
            {array.map((item, index) => {
              if (item.date.length != 0) {
                return (
                  <a href={`/${item.date}-${month + 1}-${year}`}>
                    <div
                      className={
                        "border flex flex-col hover:bg-slate-100 h-16 " +
                        (`${item.date}-${month + 1}-${year}` === currDate
                          ? "border-red-600 border-4"
                          : "border-slate-100")
                      }
                      key={index}
                    >
                      <h2 className="font-lora">{item.date}</h2>
                      <div className="flex flex-row justify-center">
                        {/* no need to check year */}
                        {birthdays.map((key) => {
                          if (
                            key.date.split("-")[0] === `${item.date}` &&
                            key.date.split("-")[1] === `${month + 1}`
                          ) {
                            return <p>🎁</p>;
                          }
                        })}
                        {/* need to check year */}
                        {deadlines.map((key) => {
                          if (
                            key.date === `${item.date}-${month + 1}-${year}`
                          ) {
                            return <p>📅</p>;
                          }
                        })}
                      </div>
                    </div>
                  </a>
                );
              } else {
                return (
                  <div
                    className={
                      "border flex flex-col h-16 " +
                      (`${item.date}-${month + 1}-${year}` === currDate
                        ? "border-red-600 border-4"
                        : "border-slate-100")
                    }
                    key={index}
                  >
                    <h2>{item.date}</h2>
                    <div className="flex flex-row justify-center">
                      {/* no need to check year */}
                      {birthdays.map((key) => {
                        if (
                          key.date.split("-")[0] === `${item.date}` &&
                          key.date.split("-")[1] === `${month + 1}`
                        ) {
                          return <p>🎁</p>;
                        }
                      })}
                      {/* need to check year */}
                      {deadlines.map((key) => {
                        if (key.date === `${item.date}-${month + 1}-${year}`) {
                          return <p>📅</p>;
                        }
                      })}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      <Summary bProps={birthdays} dProps={deadlines} year={year} />
    </div>
  );
};

export default Calender;
