import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Chart = ({ name, value, data }) => {
  return (
    <LineChart
      width={700}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid />
      <XAxis dataKey={name} />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey={value} stroke="#8884d8" />
    </LineChart>
  );
};

export default Chart;
