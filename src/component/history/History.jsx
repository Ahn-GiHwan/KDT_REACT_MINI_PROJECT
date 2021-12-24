import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Main } from "../../css/style";
import { fetchGetBuyCategoryList, fetchGetBuyList } from "../../utils/buyFetch";
import InfoTable from "../common/InfoTable";
import Chart from "./Chart";

const History = () => {
  const [chartData, setChartData] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  const history = useHistory();

  const getBuyList = useCallback(async () => {
    try {
      const data = await fetchGetBuyList(userInfo.user_email);
      console.log(data);
    } catch (error) {
      console.dir(error);
    }
  }, [userInfo.user_email]);

  const getCategoryInfo = useCallback(async () => {
    try {
      const { json } = await fetchGetBuyCategoryList(userInfo.user_email);
      setChartData(json);
    } catch (error) {
      console.dir(error);
    }
  }, [userInfo.user_email]);

  useEffect(() => {
    if (!userInfo?.user_email) history.push("/login");
    else {
      getBuyList();
      getCategoryInfo();
    }
  }, [getBuyList, getCategoryInfo, history, userInfo?.user_email]);

  return (
    <Container>
      <Main>
        <h2>사용자 구매내역</h2>
        <div style={{ width: "200px", height: "300px" }}>
          <Chart name="category2" value="amount" data={chartData} />
        </div>
        <InfoTable />
      </Main>
    </Container>
  );
};

export default History;
