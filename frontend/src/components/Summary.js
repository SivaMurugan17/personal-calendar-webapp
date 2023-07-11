import React, { useEffect, useState } from "react";

const Summary = (props) => {
  const [birthdays, setBirthdays] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [yr, setYr] = useState([]);
  const { bProps, dProps, year } = props;
  useEffect(() => {
    setBirthdays(bProps);
    setDeadlines(dProps);
    setYr(year);
  }, [props]);
  return (
    <div>
      <h1 className="text-3xl my-8 font-medium font-lora">Monthly Summary</h1>
      <div className="flex flex-col sm:flex-row w-4/5 max-w-4xl mx-auto justify-between gap-8 my-8">
        <div className="border border-slate-200 rounded shadow  basis-2/5 bg-slate-100">
          <h2 className="text-white text-2xl text-left mb-6 bg-slate-600 p-2 font-cinzel">
            Birthdays🎁
          </h2>
          {birthdays.length == 0 && (
            <p className="text-xl mb-4 font-lora">No entries yet.</p>
          )}
          {birthdays.map((item) => {
            return (
              <div className="py-2 px-4 font-lora">
                <h3 className="text-xl text-left font-medium mb-2">
                  {item.date.split("-")[0] +
                    "-" +
                    item.date.split("-")[1] +
                    "-" +
                    yr}
                </h3>
                {item.persons.map((name) => (
                  <h3 className="text-xl mb-2">{name}</h3>
                ))}
              </div>
            );
          })}
        </div>

        <div className="border border-slate-200 rounded shadow  basis-2/5 bg-slate-100">
          <h2 className="text-white text-2xl text-left mb-6 bg-slate-600 p-2 font-cinzel">
            Deadlines📅
          </h2>
          {deadlines.length == 0 && (
            <p className="text-xl mb-4 font-lora">No entries yet.</p>
          )}
          {deadlines.map((item) => {
            return (
              <div className="py-2 px-4 font-lora">
                <h3 className="text-xl text-left font-medium mb-2">
                  {item.date}
                </h3>
                {item.events.map((name) => (
                  <h3 className="text-xl mb-2">{name}</h3>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Summary;
