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
import RetentionTile from "components/RetentionTile";
import EventsLogTile from "components/EventsLogTile";
import Select, { ValueType } from "react-select";

export interface Props {
  authService: Interpreter<AuthMachineContext, any, AuthMachineEvents, any>;
}

export interface SelectOption {
  value: string;
  label: string;
}

const DashBoard: React.FC = () => {
  // maps state
  const [mapsData, setMapsData] = useState<Event[]>([]);
  // sessions by day states
  const [daysSessionsData, setDaysSessionsData] = useState<UniqueSessionDay[]>([]);
  const [selectedDaysDate, setSelectedDaysDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  // sessions by hour states
  const [hoursSessionsData, setHoursSessionsData] = useState<UniqueSessionHour[]>([]);
  const [selectedHoursDate, setSelectedHoursDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  // events log states
  // const [search, setSearch] = useState<string>("");
  // const [sorting, setSorting] = useState<string>("");
  // const [type, setType] = useState<string>("");
  // const [browser, setBrowser] = useState<string>("");

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

  // const handleSearchChange = (
  //   e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  // ): void => {
  //   setSearch(e.target.value);
  // };

  // const handleSortingSelect = (selected: ValueType<SelectOption>): void => {
  //   // console.log(selected);
  //   const { value } = selected
  //   setSorting();
  // };

  // selects options
  // const sortingOptions: SelectOption[] = [
  //   { value: "-date", label: "New first" },
  //   { value: "%2Bdate", label: "Old first" },
  // ];

  // const typeOptions: SelectOption[] = [
  //   { value: "login", label: "Login" },
  //   { value: "signup", label: "Sign-up" },
  //   { value: "admin", label: "Admin" },
  //   { value: "/", label: "Slash?" },
  // ];

  // const browserOptions: SelectOption[] = [
  //   { value: "chrome", label: "Chrome" },
  //   { value: "safari", label: "Safari" },
  //   { value: "edge", label: "Edge" },
  //   { value: "firefox", label: "Firefox" },
  //   { value: "ie", label: "Internet Explorer Boo!" },
  //   { value: "other", label: "Other - still better than ie..." },
  // ];

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
        <div className="retention">
          <RetentionTile />
        </div>
        <br />
        {/* <div className="events-log">
          <div className="events-filters">
            <TextField
              id="outlined-basic"
              label="Search..."
              variant="outlined"
              value={search}
              onChange={handleSearchChange}
            />
            <Select options={sortingOptions} onChange={handleSortingSelect} />
          </div>
          <EventsLogTile filterObj={{ search, sorting, type, browser }} />
        </div> */}
      </div>
    </>
  );
};

export default DashBoard;
