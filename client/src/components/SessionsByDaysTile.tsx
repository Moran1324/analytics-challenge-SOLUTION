import React from "react";
import { UniqueSessionDay } from "../../../server/backend/database";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface Props {
  data: UniqueSessionDay[];
}

const SessionsByDaysTile: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line
          name={data.length > 0 ? `${data[0].date} - ${data[6].date}` : "Pick a Date"}
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
        />

        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  );
};

export default SessionsByDaysTile;
