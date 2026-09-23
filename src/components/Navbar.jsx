import { useState } from "react";
import styles from "./styles/Navbar.module.css";
import { Link } from "react-router";

const Navbar = ({ excludedPath }) => {
  const navPaths = ["/", "shop", "cart"];

  const [paths, setPaths] = useState(
    navPaths.filter((path) => path !== excludedPath),
  );

  const updatePath = (path) => {
    setPaths(navPaths.filter((navPath) => navPath !== path));
  };

  return (
    <nav className={styles.navbar}>
      {paths.map((path) => (
        <Link key={path} to={path} onClick={() => updatePath(path)}>
          {path === "/" ? "home" : path}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
