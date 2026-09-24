import { useState } from "react";
import styles from "./styles/Navbar.module.css";
import { Link } from "react-router";

const Navbar = ({ excludedPath, cartItems }) => {
  const navPaths = ["/", "shop", "cart"];

  const [paths, setPaths] = useState(
    navPaths.filter((path) => path !== excludedPath),
  );

  const updatePath = (path) => {
    setPaths(navPaths.filter((navPath) => navPath !== path));
  };

  return (
    <nav className={styles.navbar}>
      {paths.map((path) => {
        if (path === "/") {
          return (
            <Link key={path} to={path} onClick={() => updatePath(path)}>
              Home
            </Link>
          );
        } else if (path === "cart") {
          return (
            <Link key={path} to={path} onClick={() => updatePath(path)}>
              {cartItems.length > 0 ? `Cart (${cartItems.length})` : "Cart"}
            </Link>
          );
        } else {
          return (
            <Link key={path} to={path} onClick={() => updatePath(path)}>
              Shop
            </Link>
          );
        }
      })}
    </nav>
  );
};

export default Navbar;
