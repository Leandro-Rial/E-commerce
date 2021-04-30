import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import axios from "axios";

const Headers = () => {
  const state = useContext(GlobalState);

  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart
  const [menu, setMenu] = useState(false)

  const logoutUser = async () => {
    try {
      await axios.get("/user/logout");

      localStorage.removeItem("firstLogin");

      window.location.href = "/";
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const adminRouter = () => {
    return (
      <>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  const styleMenu = {
    left: menu ? 0 : '-100%'
  }

  return (
    <nav>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <i className="fas fa-bars"></i>
      </div>

      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "ADMIN" : "E-COMMERCE"}</Link>
        </h1>
      </div>

      <ul style={styleMenu}>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
        </li>

        {isAdmin && adminRouter()}

        {isLogged ? (
          loggedRouter()
        ) : (
          <li onClick={() => setMenu(!menu)}>
            <Link to="/login">Login</Link>
          </li>
        )}

        <li className="cruz" onClick={() => setMenu(!menu)}>
          <i className="fas fa-times"></i>
        </li>
      </ul>

      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Headers;
