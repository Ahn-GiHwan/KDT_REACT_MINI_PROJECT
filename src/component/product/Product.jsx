import React, { useCallback, useEffect, useState } from "react";
import Loading from "../common/Loading";
import { getProductList } from "../../utils/productFerch";
import InfoTable from "../common/InfoTable";
import { Container, Main } from "../../css/style";
import Swal from "sweetalert2";
import { fetchInsertCart } from "../../utils/cartFetch";
import { useSelector } from "react-redux";

const Product = React.memo(() => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo, cartId } = useSelector((state) => state.user);

  const getProducts = useCallback(
    async (category1, category2, category3, category4) => {
      try {
        setIsLoading(true);
        const { json } = await getProductList(
          userInfo.user_email,
          category1,
          category2,
          category3,
          category4
        );
        setProducts(json === [] ? null : json);
      } catch ({ response }) {
        Swal.fire("통신에러", response.statusText, "error");
      } finally {
        setIsLoading(false);
      }
    },
    [userInfo.user_email]
  );

  const buyProduct = useCallback(
    async (product_id) => {
      if (userInfo?.user_email) {
        try {
          await fetchInsertCart(product_id, userInfo.user_email, cartId);
          Swal.fire("등록이 완료되었습니다.");
        } catch ({ response }) {
          Swal.fire("등록을 실패했습니다.", response.statusText, "error");
        }
      } else Swal.fire({ title: "로그인 후 가능합니다.", icon: "error" });
    },
    [cartId, userInfo.user_email]
  );

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Container>
      <Main>
        <h2>상품({products.length})</h2>
        <InfoTable
          style={{ marginTop: "20px" }}
          type="product"
          bodyList={products}
          clickEvent={[getProducts, buyProduct]}
        />
        {isLoading && <Loading />}
      </Main>
    </Container>
  );
});

export default Product;
