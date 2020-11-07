import React, { useState, useEffect } from "react";
import { Interpreter } from "xstate";
import { AuthMachineContext, AuthMachineEvents } from "../machines/authMachine";
import axios from "axios";
import MapsTile from "components/MapsTile";
import { Event } from "../models/event";
import { UniqueSessionDay, UniqueSessionHour } from "../../../server/backend/database";
import SessionsByDaysTile from "components/SessionsByDaysTile";
import SessionsByHoursTile from "components/SessionsByHoursTile";
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
  const [hoursSessionsData, setHoursSessionsData] = useState<UniqueSessionHour[]>([]);
  const [selectedHoursDate, setSelectedHoursDate] = useState<string>(
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

  // get hours sessions data
  useEffect(() => {
    const today = new Date().setHours(12, 0, 0, 0);
    const offset: number = selectedHoursDate
      ? Math.floor((today - new Date(selectedHoursDate).getTime()) / OneDay)
      : 0;
    axios
      .get(`http://localhost:3001/events/by-hours/${offset}`)
      .then(({ data }) => {
        setHoursSessionsData(data);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  }, [selectedHoursDate]);

  // handle date for sessions by hour
  const handleHoursSessionsDateChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    const pickedDate = new Date(e.target.value).getTime();
    if (pickedDate > new Date().getTime()) {
      alert("can't pick future dates");
      return;
    }
    setSelectedHoursDate(e.target.value);
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
          <b>Sessions By Day:</b>
          <SessionsByDaysTile data={daysSessionsData} />
        </div>
        <div className="hours-sessions">
          <TextField
            id="date"
            label="Pick Date"
            type="date"
            value={selectedHoursDate}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleHoursSessionsDateChange}
          />
          <b>Sessions By Hour:</b>
          <SessionsByHoursTile data={hoursSessionsData} />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
