import { weeklyRetentionObject } from "models";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";

const RetentionTile: React.FC = () => {
  const [retentionEvents, setRetentionEvents] = useState<weeklyRetentionObject[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);

  const getData = async (dayZero: number): Promise<void> => {
    const { data }: { data: weeklyRetentionObject[] } = await axios.get(
      `http://localhost:3001/events/retention?dayZero=${dayZero}`
    );
    setRetentionEvents(data);
  };

  useEffect(() => {
    const dayZero: number = new Date(selectedDate).getTime();
    getData(dayZero);
  }, [selectedDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    const pickedDate = new Date(e.target.value).getTime();
    if (pickedDate > new Date().getTime()) {
      alert("can't pick future dates");
      return;
    }
    setSelectedDate(e.target.value);
  };

  return (
    <>
      <TextField
        id="date"
        label="Pick Date"
        type="date"
        value={selectedDate}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleDateChange}
      />
      <table style={{ border: "1px solid black", fontSize: "18px", borderCollapse: "collapse" }}>
        <tr style={{ border: "1px solid black", fontSize: "18px", borderCollapse: "collapse" }}>
          <td style={{ border: "1px solid black", fontSize: "18px", borderCollapse: "collapse" }}>
            sdfdsdgfg
          </td>
          {retentionEvents.map((obj: weeklyRetentionObject) => {
            return (
              <td
                style={{ border: "1px solid black", fontSize: "18px", borderCollapse: "collapse" }}
              >
                {obj.registrationWeek}
              </td>
            );
          })}
        </tr>
        {retentionEvents.map((obj: weeklyRetentionObject) => {
          return (
            <tr style={{ border: "1px solid black", fontSize: "18px", borderCollapse: "collapse" }}>
              <td
                style={{ border: "1px solid black", fontSize: "18px", borderCollapse: "collapse" }}
              >
                <span>{`${obj.start} - ${obj.end}`}</span> <br />{" "}
                <span>{`${obj.newUsers} users`}</span>
              </td>
              {obj.weeklyRetention.map((percentOfAWeek: number) => {
                return (
                  <td
                    style={{
                      border: "1px solid black",
                      fontSize: "18px",
                      borderCollapse: "collapse",
                    }}
                  >
                    {`${percentOfAWeek}%`}{" "}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </table>
    </>
  );
};

export default RetentionTile;
