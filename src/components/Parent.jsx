import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { useState } from "react";

const Parent = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <>
      <Navbar excludedPath={"/"} />
      <Outlet context={[cartItems, setCartItems]} />
    </>
  );
};

export default Parent;
