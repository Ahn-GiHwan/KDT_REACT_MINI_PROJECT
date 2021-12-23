import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchGetBuyCategoryList, fetchGetBuyList } from "../../utils/buyFetch";
import InfoTable from "../common/InfoTable";
import Chart from "./Chart";

const History = () => {
  const [chartData, setChartData] = useState([]);
  const getBuyList = async () => {
    try {
      const data = await fetchGetBuyList();
      console.log(data);
    } catch (error) {
      console.dir(error);
    }
  };

  const getCategoryInfo = async () => {
    try {
      const { json } = await fetchGetBuyCategoryList();
      setChartData(json);
    } catch (error) {
      console.dir(error);
    }
  };
  useEffect(() => {
    getBuyList();
    getCategoryInfo();
  }, []);

  return (
    <div>
      <h2>사용자 구매내역</h2>
      <div style={{ width: "200px", height: "300px" }}>
        <Chart name="category2" value="amount" data={chartData} />
      </div>
      <InfoTable />
    </div>
  );
};

export default History;
