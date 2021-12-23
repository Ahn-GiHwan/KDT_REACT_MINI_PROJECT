import React from "react";
import { Spinner } from "reactstrap";
import { ErrorBox } from "../../css/style";

const Loading = () => {
  return (
    <ErrorBox>
      <Spinner color="dark" type="border" style={{ fontSize: "30px" }}>
        Loading...
      </Spinner>
    </ErrorBox>
  );
};

export default Loading;
