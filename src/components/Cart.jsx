import { useOutletContext } from "react-router";
import Card from "./Card";

const Cart = () => {
  const [cartItems, setCartItems] = useOutletContext();

  return (
    <>
      <h2>Your Cart</h2>

      {cartItems.length > 0 ? (
        cartItems.map((cartItem) => {
          return (
            <Card
              key={cartItem.id}
              item={cartItem}
              cartItems={cartItems}
              parent="cart"
              setCartItems={setCartItems}
            />
          );
        })
      ) : (
        <p>
          You currently have no items in your cart. Please add them in the shop
          to view them here.
        </p>
      )}
    </>
  );
};

export default Cart;
