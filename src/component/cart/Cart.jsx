import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Row,
} from "reactstrap";
import Swal from "sweetalert2";
import { Container, Main } from "../../css/style";
import { fetchBuyCart, fetchCompleteBuy } from "../../utils/buyFetch";
import { fetchGetCartList, fetchGetTotalPrice } from "../../utils/cartFetch";
import InfoTable from "../common/InfoTable";
import Loading from "../common/Loading";

const Cart = React.memo(() => {
  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo, cartId } = useSelector((state) => state.user);
  const history = useHistory();

  const receiveUser = useRef(null);
  const receiveUserTel1 = useRef(null);
  const receiveUserTel2 = useRef(null);
  const receiveUserTel3 = useRef(null);
  const receiveAddress1 = useRef(null);
  const receiveAddress2 = useRef(null);
  const cartDv = useRef(null);
  const cardUser = useRef(null);
  const cardNumber1 = useRef(null);
  const cardNumber2 = useRef(null);
  const cardNumber3 = useRef(null);
  const cardNumber4 = useRef(null);
  const cardMonth = useRef(null);
  const cardYear = useRef(null);

  const getCartList = useCallback(async (user_id) => {
    try {
      setIsLoading(true);
      const { json } = await fetchGetCartList(user_id);
      setCarts(json === [] ? null : json);
    } catch ({ response }) {
      Swal.fire("통신에러", response.statusText, "error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTotalPrice = useCallback(async (userId, cartId) => {
    try {
      const { json } = await fetchGetTotalPrice(userId, cartId);
      setTotalPrice(json[0].total_price);
    } catch ({ response }) {
      Swal.fire("통신에러", response.statusText, "error");
    }
  }, []);

  const buyCarts = async () => {
    const receive_user = receiveUser.current.value;
    const receive_user_tel1 = receiveUserTel1.current.value;
    const receive_user_tel2 = receiveUserTel2.current.value;
    const receive_user_tel3 = receiveUserTel3.current.value;
    const receive_address1 = receiveAddress1.current.value;
    const receive_address2 = receiveAddress2.current.value;
    const cart_dv = cartDv.current.value;
    const card_user = cardUser.current.value;
    const card_number1 = cardNumber1.current.value;
    const card_number2 = cardNumber2.current.value;
    const card_number3 = cardNumber3.current.value;
    const card_number4 = cardNumber4.current.value;
    const card_month = cardMonth.current.value;
    const card_year = cardYear.current.value;
    const cartInfo = {
      receive_user,
      receive_user_tel1,
      receive_user_tel2,
      receive_user_tel3,
      receive_address1,
      receive_address2,
      cart_dv,
      card_user,
      card_number1,
      card_number2,
      card_number3,
      card_number4,
      card_month,
      card_year,
      total_price: totalPrice,
    };
    try {
      await fetchBuyCart(cartInfo, userInfo.user_email, cartId);
      const productIdList = carts.map((cart) => cart.product_id);
      productIdList.forEach(
        async (productId) =>
          await fetchCompleteBuy(productId, userInfo.user_email, cartId)
      );
      Swal.fire({ title: "구매 성공", icon: "success" }).then(() => {
        window.location.href = "/cart";
      });
    } catch (error) {
      console.dir(error);
      Swal.fire({ title: "구매 실패", icon: "success" });
    }
  };

  useEffect(() => {
    if (!userInfo?.user_email) history.push("/login");
  }, [history, userInfo?.user_email]);

  useEffect(() => {
    getCartList(userInfo.user_email);
    getTotalPrice(userInfo.user_email, cartId);
  }, [cartId, getCartList, getTotalPrice, userInfo.user_email]);

  return (
    <Container>
      <Main>
        <h2>장바구니({carts.length})</h2>
        {carts.length !== 0 ? (
          <>
            <InfoTable
              style={{ marginTop: "20px" }}
              type="cart"
              bodyList={[[...carts], [totalPrice]]}
            />
            <Row>
              <Col sm={6}>
                <Card>
                  <CardHeader>배송지</CardHeader>
                  <CardBody>
                    <Row>
                      <Col sm="2">수취인</Col>
                      <Col sm="10">
                        <Input placeholder="홍길동" innerRef={receiveUser} />
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
                      <Col sm="2">
                        <span style={{ fontSize: "12.2px" }}>전화번호</span>
                      </Col>
                      <Col sm="3">
                        <Input
                          type="text"
                          style={{ padding: "5px", textAlign: "center" }}
                          maxLength={3}
                          placeholder="010"
                          innerRef={receiveUserTel1}
                        />
                      </Col>
                      -
                      <Col sm="3">
                        <Input
                          type="text"
                          maxLength={4}
                          style={{ textAlign: "center" }}
                          placeholder="0000"
                          innerRef={receiveUserTel2}
                        />
                      </Col>
                      -
                      <Col sm="3">
                        <Input
                          type="text"
                          maxLength={4}
                          style={{ textAlign: "center" }}
                          placeholder="0000"
                          innerRef={receiveUserTel3}
                        />
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: "10px" }}>
                      <Col sm="2">주소</Col>
                      <Col sm="10">
                        <Input placeholder="주소" innerRef={receiveAddress1} />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="2"></Col>
                      <Col sm="10">
                        <Input
                          placeholder="상세주소"
                          innerRef={receiveAddress2}
                        />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col sm={6}>
                <Card>
                  <CardHeader>결제 정보</CardHeader>
                  <CardBody>
                    <Row>
                      <Col sm="2">카드사</Col>
                      <Col sm="10">
                        <Input
                          type="select"
                          placeholder="홍길동"
                          innerRef={cartDv}
                        >
                          <option>패캠은행</option>
                          <option>KDT은행</option>
                        </Input>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "10px" }}>
                      <Col sm="2">이름</Col>
                      <Col sm="10">
                        <Input placeholder="홍길동" innerRef={cardUser} />
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
                      <Col sm="2">번호</Col>
                      <Col sm="2">
                        <Input
                          type="text"
                          style={{ padding: "5px" }}
                          innerRef={cardNumber1}
                        />
                      </Col>
                      <Col sm="2">
                        <Input type="text" innerRef={cardNumber2} />
                      </Col>
                      <Col sm="2">
                        <Input type="text" innerRef={cardNumber3} />
                      </Col>
                      <Col sm="2">
                        <Input type="text" innerRef={cardNumber4} />
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: "10px" }}>
                      <Col sm="2">
                        <span style={{ fontSize: "10px" }}>Month</span>
                      </Col>
                      <Col sm="5">
                        <Input innerRef={cardMonth} />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="2">
                        <span style={{ fontSize: "10px" }}>Year</span>
                      </Col>
                      <Col sm="5">
                        <Input innerRef={cardYear} />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <Button
                  style={{ width: "100%", marginTop: "10px" }}
                  color="danger"
                  onClick={buyCarts}
                >
                  결제
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h2>장바구니가 비었습니다</h2>
            <br />
            <Button
              color="danger"
              size="sm"
              onClick={() => {
                history.push("/product");
              }}
            >
              구매하러 가기
            </Button>
          </div>
        )}

        {isLoading && <Loading />}
      </Main>
    </Container>
  );
});

export default Cart;
