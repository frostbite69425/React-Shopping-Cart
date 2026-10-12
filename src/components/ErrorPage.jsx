import { Link } from "react-router";
import styles from "./styles/ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div className={styles.container}>
      <h1 className="tangerine-bold">Hey there stranger!</h1>
      <h2 className="playfair-display">
        Seems like you have wandered far off.
      </h2>
      <Link className="playfair-display" to="/">
        Don't worry. You can go back to the home page by clicking here!
      </Link>
    </div>
  );
};

export default ErrorPage;
