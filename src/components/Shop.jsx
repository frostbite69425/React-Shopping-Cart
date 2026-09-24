import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import Card from "./Card";

const Shop = () => {
  const [shopItems, setShopItems] = useState([]);
  const [cartItems, setCartItems] = useOutletContext([]);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => data.map((item) => ({ ...item, quantity: 0 })))
        .then((data) => setShopItems(data))
        .catch((error) => console.error(error));
    }

    return () => (ignore = true);
  }, []);

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
