import { useOutletContext } from "react-router";
import Card from "./Card";
import useImageUrl from "../hooks/useImageUrl";

const Shop = () => {
  const { shopItems, error, loading } = useImageUrl();
  const [cartItems, setCartItems] = useOutletContext([]);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>A network error was encountered</p>;

  return (
    <>
      <h1>Shop</h1>
      <div className="card-holder">
        {shopItems.map((item) => (
          <Card
            key={item.id}
            item={item}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        ))}
      </div>
    </>
  );
};

export default Shop;
