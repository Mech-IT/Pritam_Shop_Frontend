import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import Order from "./pages/Order"
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import Changepassword from "./pages/Changepassword";
import Forgotpassword from "./pages/Forgotpassword";


function App() {

  const { currentUser } = useSelector(state => state.user);
  
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login"></Navigate>
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home key={"/"} />}></Route>
          <Route exact path="/product/:id" element={<Product key={"/product"} />}></Route>
          <Route exact path="/products/:category" element={<ProductList key={"/productlist"} />}></Route>
          <Route exact path="/cart" element={<RequireAuth><Cart key={"/cart"} /></RequireAuth>}></Route>
          <Route exact path="/register" element={<Register key={"/register"} />}></Route>
          <Route exact path="/login" element={<Login key={"/login"} />}></Route>
          <Route exact path="/checkout/:path" element={<RequireAuth><Checkout key={"/checkout"} /></RequireAuth>}></Route>
          <Route exact path="/success" element={<RequireAuth><Success key={"/success"} /></RequireAuth>}></Route>
          <Route exact path="/payment/:path" element={<RequireAuth><Payment key={"/payment"} /></RequireAuth>}></Route>
          <Route exact path="/orders" element={<RequireAuth><Order key={"/orders"} /></RequireAuth>}></Route>
          <Route exact path="/chPassword" element={<RequireAuth><Changepassword key={"/chPassword"} /></RequireAuth>}></Route>
          <Route exact path="/fPassword" element={<Forgotpassword key={"/fPassword"} />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
