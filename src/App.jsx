import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate 
} from "react-router-dom";
import Home from './pages/Home';
import ProductList from "./pages/ProductList/ProductList";
import ProductItem from "./pages/Product/ProductItem";
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
import Success from "./pages/Success";
import Favorite from "./pages/Favorite/Favorite";
import { useSelector } from "react-redux";


function App() {
  const user = useSelector(state => state.user.currentUser );

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductItem />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/success" element={<Success />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </Router>
  );
}

export default App;