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
import { useState } from "react";
import ScrollToTop from "./common/ScrollToTop";

function App() {
  const [userId, setUserId] = useState("");

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
      <Route path="/product" render={() => <Product userId={userId} />} />
      <Route path="/cart" render={() => <Cart userId={userId} />} />
      <Route path="/history" render={() => <History userId={userId} />} />
      <Footer />
    </div>
  );
}

export default App;
