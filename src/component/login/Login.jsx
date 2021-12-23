import React from "react";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Input,
  Label,
  Row,
} from "reactstrap";
import Swal from "sweetalert2";
import { Container, Main } from "../../css/style";

const Login = () => {
  const emailRef = useRef(null);
  const pwRef = useRef(null);
  const history = useHistory();

  const validation = () => {
    if (!emailRef.current.value) {
      Swal.fire({ title: "이메일을 입력해주세요", icon: "error" });
      emailRef.current.focus();
      return false;
    } else if (!pwRef.current.value) {
      Swal.fire({ title: "비밀번호를 입력해주세요", icon: "error" });
      pwRef.current.focus();
      return false;
    }
    return true;
  };

  const loginClick = () => {
    if (validation()) {
      const user_email = emailRef.current.value;
      const user_password = pwRef.current.value;
      alert(user_email + "---" + user_password);
    }
  };

  return (
    <Container>
      <Main>
        <CardHeader>
          <h2>로그인</h2>
        </CardHeader>
        <CardBody>
          <Label for="email">이메일</Label>
          <Row>
            <Col>
              <Input
                id="email"
                placeholder=""
                type="text"
                className="boardInput"
                innerRef={emailRef}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Label for="pw">패스워드</Label>
              <Input
                id="pw"
                type="password"
                className="boardInput"
                innerRef={pwRef}
              />
            </Col>
          </Row>
        </CardBody>
        <CardFooter style={{ textAlign: "end" }}>
          <ButtonGroup>
            <Button
              color="primary"
              onClick={() => {
                history.push("/register");
              }}
            >
              회원가입
            </Button>
            <Button color="danger" onClick={loginClick}>
              로그인
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Main>
    </Container>
  );
};

export default Login;
