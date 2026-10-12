import { useOutletContext } from "react-router";
import Card from "./Card";
import styles from "./styles/Cart.module.css";
import { Fragment } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useOutletContext();

  const clickHandler = (e) => {
    e.preventDefault();
    setCartItems([]);
  };

  return (
    <div className={styles.container}>
      <h2 className="tangerine-bold">Your Cart</h2>

      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((cartItem) => {
            return (
              <Fragment key={cartItem.id}>
                <Card
                  key={cartItem.id}
                  item={cartItem}
                  cartItems={cartItems}
                  parent="cart"
                  setCartItems={setCartItems}
                />
                <hr />
              </Fragment>
            );
          })}
          <p>
            Total:{" $ "}
            {Number(
              cartItems.reduce(
                (acc, curr) => acc + curr.price * curr.quantity,
                0,
              ),
            ).toFixed(2)}
          </p>
          <button onClick={(e) => clickHandler(e)} className="tangerine-bold">
            Checkout
          </button>
        </div>
      ) : (
        <p className={styles.paragraph}>
          You currently have no items in your cart. Please add them in the shop
          to view them here.
        </p>
      )}
    </div>
  );
};

export default Cart;
