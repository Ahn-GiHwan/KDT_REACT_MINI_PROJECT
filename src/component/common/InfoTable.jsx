import React from "react";
import PropTypes from "prop-types";
import { Button, Table } from "reactstrap";
import { BiError } from "react-icons/bi";
import { GrRefresh } from "react-icons/gr";
import CategoryList from "../product/CategoryList";
import { TotalPrice } from "../../css/style";

const InfoTable = React.memo(({ type, bodyList, clickEvent }) => {
  let headList = [];

  switch (type) {
    case "naver":
      headList = ["이미지", "제목", "최저가", "등록"];
      break;
    case "product":
      headList = ["이미지", "제목", "최저가", "구매"];
      break;
    case "board":
      headList = ["번호", "제목", "조회수", "작성자"];
      break;
    case "cart":
      headList = ["상품 번호", "이미지", "제목", "가격", "개수"];
      break;

    default:
      break;
  }
  return (
    <>
      {type === "product" && <CategoryList clickEvent={clickEvent[0]} />}
      <Table hover responsive>
        <thead>
          <tr>
            {headList && headList.map((head, i) => <td key={i}>{head}</td>)}
          </tr>
        </thead>
        <tbody>
          {bodyList === null && (
            <tr>
              <td colSpan="10">
                <div>내용이 없습니다.</div>
                <BiError size={100} />
                <br />
                <Button
                  color="warning"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  <GrRefresh color="#fff" />
                </Button>
              </td>
            </tr>
          )}
          {(type === "naver" || type === "product") &&
            bodyList.map((product, i) => (
              <tr key={i}>
                <td>
                  <img src={product.image} alt="img" />
                </td>
                <td dangerouslySetInnerHTML={{ __html: product.title }}></td>
                <td>
                  {Number(product.lprice || product.l_price).toLocaleString() +
                    "원"}
                </td>
                <td>
                  {type === "naver" ? (
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => clickEvent(product)}
                    >
                      등록
                    </Button>
                  ) : (
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() =>
                        clickEvent[1]("cart_id", product.product_id, "user_id")
                      }
                    >
                      담기
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          {type === "board" &&
            bodyList.map(
              ({ id, title, content, view_count, insert_user }, i) => (
                <tr
                  className={`${type}Table`}
                  key={i}
                  onClick={() => clickEvent(id, title, content)}
                >
                  <td>{i + 1}</td>
                  <td>{title}</td>
                  <td>{view_count}</td>
                  <td>{insert_user}</td>
                </tr>
              )
            )}
          {type === "cart" &&
            bodyList[0].map(({ product_id, image, title, l_price, amount }) => (
              <tr className={`${type}Table`} key={product_id}>
                <td>{product_id}</td>
                <td>
                  <img
                    src={image}
                    alt="img"
                    style={{ width: "50px", heigth: "50px" }}
                  />
                </td>
                <td dangerouslySetInnerHTML={{ __html: title }}></td>
                <td>{Number(l_price).toLocaleString() + "원"}</td>
                <td>{amount}</td>
              </tr>
            ))}
          {type === "cart" && (
            <tr>
              <td colSpan={5} style={{ textAlign: "end" }}>
                <TotalPrice>
                  합계 {Number(bodyList[1]).toLocaleString() + "원"}
                </TotalPrice>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
});

InfoTable.propTypes = {
  type: PropTypes.oneOf(["naver", "product", "board", "cart"]),
  bodyList: PropTypes.array,
  clickEvent: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
};

export default InfoTable;
