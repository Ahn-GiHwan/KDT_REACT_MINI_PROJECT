import React from "react";
import cookie from "react-cookies";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Button, Nav, Navbar, NavbarBrand, NavItem } from "reactstrap";
import { HeaderTag } from "../css/style";
import { logout } from "../redux/user/actions";

const Header = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onLogout = () => {
    cookie.remove("user_password");
    cookie.remove("token_name");
    cookie.remove("token_id");
    dispatch(logout());
  };

  return (
    <HeaderTag>
      <Navbar>
        <NavbarBrand>
          <Link to={"/"}>
            <img
              src={require("../img/layout/logo.png").default}
              height="90px"
              width="200px"
              alt=""
            />
          </Link>
        </NavbarBrand>
        <Nav className="mr-auto menu">
          {!userInfo?.user_email && (
            <NavItem>
              <NavLink to={"/login"}>로그인</NavLink>
            </NavItem>
          )}
          <NavItem>
            <NavLink to={"/board"}>게시판</NavLink>
          </NavItem>
          {!userInfo?.user_email && (
            <NavItem>
              <NavLink to={"/register"}>사용자 등록</NavLink>
            </NavItem>
          )}
          {userInfo?.user_email && (
            <>
              <NavItem>
                <NavLink to={"/naverApi"}>상품 등록</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={"/product"}>구매 하기</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={"/cart"}>장바구니</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={"/history"}>구매 내역</NavLink>
              </NavItem>
              <NavItem>
                <Button onClick={onLogout} size="sm" color="danger" outline>
                  로그아웃
                </Button>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar>
    </HeaderTag>
  );
};

export default Header;
