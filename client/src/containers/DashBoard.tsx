import React, { useState, useEffect, ChangeEvent } from "react";
import { Interpreter } from "xstate";
import { AuthMachineContext, AuthMachineEvents } from "../machines/authMachine";
import axios from "axios";
import MapsTile from "components/MapsTile";
import { Event } from "../models/event";
import { UniqueSessionDay, UniqueSessionHour } from "../../../server/backend/database";
import SessionsByDaysTile from "components/SessionsByDaysTile";
import TextField from "@material-ui/core/TextField";
import { OneDay, OneHour, OneWeek } from "../helpers/timeFrames";

export interface Props {
  authService: Interpreter<AuthMachineContext, any, AuthMachineEvents, any>;
}

const DashBoard: React.FC = () => {
  const [mapsData, setMapsData] = useState<Event[]>([]);
  const [daysSessionsData, setDaysSessionsData] = useState<UniqueSessionDay[]>([]);
  const [selectedDaysDate, setSelectedDaysDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  // get maps data
  useEffect(() => {
    axios
      .get("http://localhost:3001/events/all")
      .then((res) => {
        setMapsData(res.data);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  }, []);

  // get days sessions data
  useEffect(() => {
    const today = new Date().setHours(12, 0, 0, 0);
    const offset: number = selectedDaysDate
      ? Math.floor((today - new Date(selectedDaysDate).getTime()) / OneDay)
      : 0;
    axios
      .get(`http://localhost:3001/events/by-days/${offset}`)
      .then(({ data }) => {
        setDaysSessionsData(data);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  }, [selectedDaysDate]);
  // handle date for sessions by day
  const handleDaysSessionsDateChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    const pickedDate = new Date(e.target.value).getTime();
    if (pickedDate > new Date().getTime()) {
      alert("can't pick future dates");
      return;
    }
    setSelectedDaysDate(e.target.value);
  };
  return (
    <>
      <div>
        <div className="maps">
          <MapsTile data={mapsData} />
        </div>
        <div className="days-sessions">
          <TextField
            id="date"
            label="Pick Date"
            type="date"
            value={selectedDaysDate}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleDaysSessionsDateChange}
          />
          <SessionsByDaysTile data={daysSessionsData} />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
