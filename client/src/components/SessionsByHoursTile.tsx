import React from "react";
import { UniqueSessionHour } from "../../../server/backend/database";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: UniqueSessionHour[];
}

const SessionsByHoursTile: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <ResponsiveContainer width="90%" height={300}>
        <LineChart
          // width={600}
          // height={300}
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line
            name={data.length > 0 ? `${data[0].hour} - ${data[23].hour}` : "Pick a Date"}
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
          />

          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SessionsByHoursTile;
