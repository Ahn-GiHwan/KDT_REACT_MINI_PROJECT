import React, { useEffect, useRef, useState } from "react";
import { Col, Input, Label, Row } from "reactstrap";
import { fetchGetCategory } from "../../utils/categoryFetch";

const CategoryList = React.memo(({ clickEvent }) => {
  const category1Ref = useRef(null);
  const category2Ref = useRef(null);
  const category3Ref = useRef(null);
  const category4Ref = useRef(null);

  const [category1List, setCategory1List] = useState([]);
  const [category2List, setCategory2List] = useState([]);
  const [category3List, setCategory3List] = useState([]);
  const [category4List, setCategory4List] = useState([]);

  const getCategoryList1 = async () => {
    const { json } = await fetchGetCategory();
    setCategory1List(json);
  };

  useEffect(() => {
    getCategoryList1();
  }, []);

  const getProductByCategory1 = async () => {
    const category1 = category1Ref.current.value;
    const { json } = await fetchGetCategory(2, category1);
    category2Ref.current.value = null;
    category3Ref.current.value = null;
    category4Ref.current.value = null;
    setCategory2List(json);
    await clickEvent(category1);
  };
  const getProductByCategory2 = async () => {
    const category1 = category1Ref.current.value;
    const category2 = category2Ref.current.value;
    category3Ref.current.value = null;
    category4Ref.current.value = null;
    const { json } = await fetchGetCategory(3, category1, category2);
    setCategory3List(json);
    await clickEvent(category1, category2);
  };
  const getProductByCategory3 = async () => {
    const category1 = category1Ref.current.value;
    const category2 = category2Ref.current.value;
    const category3 = category3Ref.current.value;
    const { json } = await fetchGetCategory(4, category1, category2, category3);
    setCategory4List(json);
    await clickEvent(category1, category2, category3);
  };

  const getProductByCategory4 = async () => {
    const category1 = category1Ref.current.value;
    const category2 = category2Ref.current.value;
    const category3 = category3Ref.current.value;
    const category4 = category4Ref.current.value;
    await clickEvent(category1, category2, category3, category4);
  };
  return (
    <Row style={{ margin: "20px 0" }}>
      <Col sm="3">
        <Label for="category1">Category1</Label>
        <Input
          name="category1"
          type="select"
          innerRef={category1Ref}
          onChange={getProductByCategory1}
        >
          <option></option>
          {category1List.map((cate, i) => (
            <option key={i} value={cate.category1}>
              {cate.category1}
            </option>
          ))}
        </Input>
      </Col>
      <Col sm="3">
        <Label for="category2">Category2</Label>
        <Input
          id="category2"
          type="select"
          innerRef={category2Ref}
          onChange={getProductByCategory2}
        >
          <option></option>
          {category2List.map((cate, i) => (
            <option key={i} value={cate.category2}>
              {cate.category2}
            </option>
          ))}
        </Input>
      </Col>
      <Col sm="3">
        <Label for="category3">Category3</Label>
        <Input
          id="category3"
          type="select"
          innerRef={category3Ref}
          onChange={getProductByCategory3}
        >
          <option></option>
          {category3List.map((cate, i) => (
            <option key={i} value={cate.category3}>
              {cate.category3}
            </option>
          ))}
        </Input>
      </Col>
      <Col sm="3">
        <Label for="category4">Category4</Label>
        <Input
          id="category4"
          type="select"
          innerRef={category4Ref}
          onChange={getProductByCategory4}
        >
          <option></option>
          {category4List.map((cate, i) => (
            <option key={i} value={cate.category4}>
              {cate.category4}
            </option>
          ))}
        </Input>
      </Col>
    </Row>
  );
});

export default CategoryList;
