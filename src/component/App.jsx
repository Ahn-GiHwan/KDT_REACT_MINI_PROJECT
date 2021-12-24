import { Route } from "react-router-dom";
import Header from "../route/Header";
import Footer from "../route/Footer";
import "bootstrap/dist/css/bootstrap.css";
import "../css/style.css";
import "../css/toy.css";

import Board from "./board/Board";
import CreateBoard from "./board/CreateBoard";
import Login from "./login/Login";
import Register from "./register/Register";
import Product from "./product/Product";
import Cart from "./cart/Cart";
import History from "./history/History";
import Naver from "./naver/Naver";
import ScrollToTop from "./common/ScrollToTop";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import cookie from "react-cookies";
import { fetchSessionCheck } from "../utils/userFetch";
import { useDispatch } from "react-redux";
import { onSessionLogin } from "../redux/user/actions";
import { useCallback } from "react";
import { useSelector } from "react-redux";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const fncCheckSession = useCallback(async () => {
    const tid = cookie.load("token_id");
    const tname = cookie.load("token_name");
    const tupwd = cookie.load("user_password");

    if (tid && tname) {
      const a = await fetchSessionCheck(tid, tname);
      dispatch(onSessionLogin(a.decrypt_id.user_email, tupwd));
    }
  }, [dispatch]);

  useEffect(() => {
    if (userInfo === []) {
      if ("/register" !== location.pathname) fncCheckSession();
    }
  }, [fncCheckSession, location.pathname, userInfo]);

  return (
    <div className="App">
      <ScrollToTop />
      <Header />
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/naverApi" component={Naver} />
      <Route exact path="/board" component={Board} />
      <Route exact path="/board/create" component={CreateBoard} />
      <Route path="/product" component={Product} />
      <Route path="/cart" component={Cart} />
      <Route path="/history" component={History} />
      <Footer />
    </div>
  );
}

export default App;
