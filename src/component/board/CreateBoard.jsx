import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { Button, Col, Input, Label, Row } from "reactstrap";
import Swal from "sweetalert2";
import { Container, Main } from "../../css/style";
import { fetchInserBoard } from "../../utils/boardFetch";
import Loading from "../common/Loading";

const CreateBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const authorRef = useRef(null);
  const pwRef = useRef(null);

  const validationPw = () => {
    const value = pwRef.current.value;
    if (isNaN(Number(value))) {
      pwRef.current.value = value.slice(0, value.length - 1);
      Swal.fire({ title: "숫자만 입력해 주세요", icon: "error" });
    }
  };

  const validation = () => {
    if (!titleRef.current.value) {
      titleRef.current.focus();
      return false;
    } else if (!contentRef.current.value) {
      contentRef.current.focus();
      return false;
    } else if (!authorRef.current.value) {
      authorRef.current.focus();
      return false;
    } else if (!pwRef.current.value || pwRef.current.value.length !== 4) {
      pwRef.current.focus();
      return false;
    }
    return true;
  };

  const onInsertBoard = async () => {
    if (validation()) {
      try {
        const title = titleRef.current.value;
        const content = contentRef.current.value;
        const insert_user = authorRef.current.value;
        const write_password = pwRef.current.value;
        setIsLoading(true);
        const data = await fetchInserBoard(
          title,
          content,
          insert_user,
          write_password
        );
        if (data === "success") {
          Swal.fire({ title: "작성되었습니다.", icon: data });
          history.goBack();
        }
      } catch ({ response }) {
        Swal.fire("통신에러", response.statusText, "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Container>
      <Main>
        <Label for="title">제목</Label>
        <Input
          id="title"
          placeholder=""
          type="text"
          innerRef={titleRef}
          className="boardInput"
        />
        <Label for="content">내용</Label>
        <Input
          id="content"
          type="textarea"
          innerRef={contentRef}
          className="boardInput"
        />
        <Row>
          <Col sm={6}>
            <Label for="author">작성자</Label>
            <Input
              id="author"
              type="text"
              innerRef={authorRef}
              className="boardInput"
            />
          </Col>
          <Col sm={6}>
            <Label for="pw">비밀번호(4자리, 숫자)</Label>
            <Input
              id="pw"
              type="password"
              maxLength={4}
              innerRef={pwRef}
              onChange={validationPw}
              className="boardInput"
            />
          </Col>
          <Col sm={12} style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              color="success"
              onClick={onInsertBoard}
              style={{ width: "100px", marginTop: 40 }}
              disabled={isLoading}
            >
              {!isLoading ? "작성" : <Loading />}
            </Button>
          </Col>
        </Row>
      </Main>
    </Container>
  );
};

export default CreateBoard;
