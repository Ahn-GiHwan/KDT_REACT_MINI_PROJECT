import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
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
import {
  fetchEmailDuplicate,
  fetchInsertUser,
} from "../../utils/registerFetch";

const Register = React.memo(() => {
  const history = useHistory();

  const email1 = useRef(null);
  const email2 = useRef(null);
  const password = useRef(null);
  const passwordConfirm = useRef(null);
  const major = useRef(null);
  const phone = useRef(null);
  const name = useRef(null);
  const org = useRef(null);

  const [isDuplicate, setIsDuplicate] = useState(false);

  const changeEmail = () => {
    setIsDuplicate(false);
  };

  const checkEmail = async () => {
    const user_email1 = email1.current.value;
    const user_email2 = email2.current.value;
    const { json } = await fetchEmailDuplicate(user_email1, user_email2);

    const result = json[0].dupliEmailCount;

    if (result) Swal.fire({ title: "이미 있는 이메일 입니다.", icon: "error" });
    else {
      Swal.fire({ title: "사용가능한 이메일 입니다.", icon: "success" });
      setIsDuplicate(true);
    }
  };

  const validation = () => {
    if (!email1.current.value) {
      email1.current.focus();
      return false;
    } else if (!email2.current.value) {
      email2.current.focus();
      return false;
    } else if (!password.current.value) {
      password.current.focus();
      return false;
    } else if (!passwordConfirm.current.value) {
      passwordConfirm.current.focus();
      return false;
    } else if (password.current.value !== passwordConfirm.current.value) {
      alert("비밀번호가 일치하지 않음");
      passwordConfirm.current.focus();
      return false;
    } else if (!name.current.value) {
      name.current.focus();
      return false;
    } else if (!phone.current.value) {
      phone.current.focus();
      return false;
    } else if (!isDuplicate) {
      Swal.fire({ title: "이메일 중복 체크를 해주세요", icon: "warning" });
      return false;
    }
    return true;
  };

  const goLoginPage = () => {
    history.push("/login");
  };

  const onSignUp = async () => {
    if (validation()) {
      const user_email1 = email1.current.value;
      const user_email2 = email2.current.value;
      const user_password = password.current.value;
      const user_major = major.current.value;
      const user_phone = phone.current.value;
      const user_name = name.current.value;
      const user_org = org.current.value;

      const userInfo = {
        user_email1,
        user_email2,
        user_major,
        user_password,
        user_phone,
        user_name,
        user_org,
      };
      try {
        const data = await fetchInsertUser(userInfo);
        if (data === "success") {
          Swal.fire({ title: "가입 성공", icon: data });
          goLoginPage();
        }
      } catch ({ response }) {
        Swal.fire("가입 실패", response.statusText, "error");
      }
    }
  };
  return (
    <Container>
      <Main>
        <Card>
          <CardHeader>
            <h2>회원가입</h2>
          </CardHeader>
          <CardBody>
            <Label for="email1">이메일</Label>
            <Row>
              <Col sm="4">
                <Input
                  id="email1"
                  placeholder=""
                  type="text"
                  className="boardInput"
                  innerRef={email1}
                  onChange={changeEmail}
                />
              </Col>
              @
              <Col sm="6">
                <div style={{ display: "flex" }}>
                  <Input
                    id="eamil2"
                    placeholder=""
                    type="text"
                    className="boardInput"
                    innerRef={email2}
                    onChange={changeEmail}
                  />
                  {isDuplicate || (
                    <Button
                      color="danger"
                      outline
                      style={{ marginLeft: "10px", width: 120 }}
                      onClick={checkEmail}
                    >
                      중복 체크
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Label for="pw">패스워드</Label>
                <Input
                  id="pw"
                  type="password"
                  className="boardInput"
                  innerRef={password}
                />
              </Col>
              <Col>
                <Label for="pw_confirm">패스워드 확인</Label>
                <Input
                  id="pw_confirm"
                  type="password"
                  className="boardInput"
                  innerRef={passwordConfirm}
                />
              </Col>
            </Row>
            <Row>
              <Col sm="3">
                <Label for="userName">유저이름</Label>
                <Input
                  id="userName"
                  type="text"
                  className="boardInput"
                  placeholder="홍길동"
                  innerRef={name}
                />
              </Col>
              <Col sm="6">
                <Label for="tel">전화번호</Label>
                <Input
                  id="tel"
                  type="text"
                  className="boardInput"
                  placeholder="010-1234-5678"
                  innerRef={phone}
                />
              </Col>
            </Row>
            <Row>
              <Col sm="4">
                <Label for="job">직업</Label>
                <Input
                  id="job"
                  type="text"
                  className="boardInput"
                  placeholder="백수"
                  innerRef={org}
                />
              </Col>
              <Col sm="5">
                <Label for="major">전공</Label>
                <Input
                  id="major"
                  type="text"
                  className="boardInput"
                  placeholder="컴공"
                  innerRef={major}
                />
              </Col>
            </Row>
          </CardBody>
          <CardFooter style={{ textAlign: "end" }}>
            <ButtonGroup>
              <Button color="primary" onClick={goLoginPage}>
                로그인하기
              </Button>
              <Button color="danger" onClick={onSignUp}>
                가입하기
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </Main>
    </Container>
  );
});

export default Register;
