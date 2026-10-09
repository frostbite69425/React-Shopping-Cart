import { useOutletContext } from "react-router";
import Card from "./Card";
import useImageUrl from "../hooks/useImageUrl";
import styles from "./styles/Shop.module.css";

const Shop = () => {
  let { shopItems, error, loading } = useImageUrl();

  const [cartItems, setCartItems] = useOutletContext([]);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>A network error was encountered</p>;

  return (
    <>
      <div className={styles.container}>
        <h1 className="tangerine-bold">Trnkts Store</h1>
        <div className="playfair-display">
          <div className={styles.cardHolder}>
            {shopItems.map((item) => (
              <Card
                key={item.id}
                item={item}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
