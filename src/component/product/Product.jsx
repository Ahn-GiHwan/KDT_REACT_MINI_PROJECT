import React, { useCallback, useEffect, useState } from "react";
import Loading from "../common/Loading";
import { getProductList } from "../../utils/productFerch";
import InfoTable from "../common/InfoTable";
import { Container, Main } from "../../css/style";
import Swal from "sweetalert2";
import { fetchInsertCart } from "../../utils/cartFetch";

const Product = React.memo(() => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = useCallback(
    async (category1, category2, category3, category4) => {
      try {
        setIsLoading(true);
        const { json } = await getProductList(
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
    []
  );

  const buyProduct = async (cart_id, product_id, user_Id) => {
    try {
      await fetchInsertCart(cart_id, product_id, user_Id);
      Swal.fire("등록이 완료되었습니다.");
    } catch ({ response }) {
      Swal.fire("등록을 실패했습니다.", response.statusText, "error");
    }
  };

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
