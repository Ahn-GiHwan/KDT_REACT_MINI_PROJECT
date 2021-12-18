import React from "react";
import PropTypes from "prop-types";
import { Button, Table } from "reactstrap";

const InfoTable = React.memo(({ type, bodyList, clickEvent }) => {
  const headList =
    type === "naver" || type === "product"
      ? ["이미지", "제목", "최저가", type === "naver" ? "등록" : "구매"]
      : type === "board" && ["번호", "제목", "조회수", "작성자"];
  return (
    <Table hover responsive>
      <thead>
        <tr>
          {headList && headList.map((head, i) => <td key={i}>{head}</td>)}
        </tr>
      </thead>
      <tbody>
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
                <Button color="danger" size="sm" onClick={() => clickEvent()}>
                  {type === "naver" ? "등록" : "구매"}
                </Button>
              </td>
            </tr>
          ))}
        {type === "board" &&
          bodyList.map(({ id, title, content, view_count, insert_user }, i) => (
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
          ))}
      </tbody>
    </Table>
  );
});

InfoTable.propTypes = {
  type: PropTypes.oneOf(["naver", "product", "board"]),
  bodyList: PropTypes.array,
  clickEvent: PropTypes.func,
};

export default InfoTable;
