import styles from "./styles/Home.module.css";

const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.backgroundImageTwo}></div>
        <div className={styles.backgroundImageThree}></div>
        <div className={styles.contentHolder}>
          <h1 className="tangerine-bold">Trnkts</h1>
          <div className={styles.backgroundImageOne}></div>
          <div className="playfair-display">
            <h2>
              Trnkts.{" "}
              <span className="stylisedText">
                Your Go-To store for everyday items.
              </span>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
