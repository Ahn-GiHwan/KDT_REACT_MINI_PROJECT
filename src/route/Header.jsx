import React from "react";
import cookie from "react-cookies";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Nav, Navbar, NavbarBrand, NavItem } from "reactstrap";
import { HeaderTag } from "../css/style";

const Header = () => {
  const { userInfo } = useSelector((state) => state.user);

  const logout = () => {
    cookie.remove("user_password");
    cookie.remove("token_name");
    cookie.remove("token_id");
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
          <NavItem>
            <NavLink to={"/product"}>구매 하기</NavLink>
          </NavItem>
          {userInfo?.user_email && (
            <>
              <NavItem>
                <NavLink to={"/naverApi"}>상품 등록</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={"/cart"}>장바구니</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={"/history"}>구매 내역</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={logout}>로그아웃</NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar>
    </HeaderTag>
  );
};

export default Header;
