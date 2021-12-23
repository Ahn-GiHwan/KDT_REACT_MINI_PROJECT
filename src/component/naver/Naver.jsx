import React, { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "reactstrap";
import Swal from "sweetalert2";
import { getSuggestionQuery, getProductByQuery } from "../../utils/naverFetch";
import InfoTable from "../common/InfoTable";
import SuggestionList from "./SuggestionList";
import { Container, Main } from "../../css/style";
import { fetchInsertProduct } from "../../utils/productFerch";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Naver = React.memo(() => {
  const [suggestionList, setSuggestionList] = useState([]);
  const [productList, setProductList] = useState([]);

  const ref = useRef(null);
  const history = useHistory();
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo?.user_email) ref.current.focus();
    else history.push("/login");
  }, [history, userInfo?.user_email]);

  const closeSuggestionList = useCallback(() => {
    if (suggestionList.length > 0) setSuggestionList([]);
  }, [suggestionList.length]);

  const changeValue = useCallback(async () => {
    try {
      const query = ref.current.value;
      const { items } = await getSuggestionQuery(query);
      setSuggestionList(items[0]);
    } catch ({ response }) {
      Swal.fire("통신에러", response.statusText, "error");
    }
  }, []);

  const fetchAndAfterLogic = useCallback(
    async (query) => {
      try {
        const { items } = await getProductByQuery(query);
        setProductList(items);
        closeSuggestionList();
        if (items.length === 0)
          Swal.fire({ title: "검색된 상품이 없습니다.", icon: "error" });
      } catch ({ response }) {
        Swal.fire("통신에러", response.statusText, "error");
      }
    },
    [closeSuggestionList]
  );

  const clickSuggestionQuery = useCallback(
    async (query) => {
      ref.current.value = query;
      fetchAndAfterLogic(query);
    },
    [fetchAndAfterLogic]
  );

  const enterInput = useCallback(
    async (e) => {
      if (e.key === "Enter") {
        const query = ref.current.value;
        fetchAndAfterLogic(query);
      }
    },
    [fetchAndAfterLogic]
  );

  const addProduct = useCallback(async (product) => {
    try {
      await fetchInsertProduct(product);
      Swal.fire("등록이 완료되었습니다.");
    } catch ({ response }) {
      Swal.fire("등록을 실패했습니다.", response.statusText, "error");
    }
  }, []);

  return (
    <Container onClick={closeSuggestionList}>
      <Main>
        <h2>최저가 상품 조회 및 등록 하기</h2>
        <Input
          innerRef={ref}
          onChange={changeValue}
          onKeyDown={enterInput}
          placeholder="ex) 맥북 프로"
        />
        <SuggestionList
          suggestionList={suggestionList}
          clickSuggestionQuery={clickSuggestionQuery}
        />
        {productList.length > 0 && (
          <InfoTable
            style={{ marginTop: "20px" }}
            type="naver"
            bodyList={productList}
            clickEvent={addProduct}
          />
        )}
      </Main>
    </Container>
  );
});

export default Naver;
