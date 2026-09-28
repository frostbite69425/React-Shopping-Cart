import { useState } from "react";

const Card = ({ item, cartItems, setCartItems, parent = "shop" }) => {
  const [itemQuantity, setItemQuantity] = useState(item.quantity);

  function handleChange(e) {
    e.preventDefault();
    setItemQuantity(e.target.value);
  }

  function handleIncrementDecrement(e, type) {
    e.preventDefault();
    if (type === "+") {
      setItemQuantity(itemQuantity + 1);
    } else if (itemQuantity > 0) {
      setItemQuantity(itemQuantity - 1);
    } else {
      console.error("cannot have values less than 0");
    }
  }

  function handleCartClick(e) {
    e.preventDefault();
    if (cartItems.some((cartItem) => cartItem.id === item.id)) {
      setCartItems(
        cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: Number(cartItem.quantity) + Number(itemQuantity),
            };
          } else {
            return cartItem;
          }
        }),
      );
    } else {
      if (itemQuantity > 0) {
        setCartItems([...cartItems, { ...item, quantity: itemQuantity }]);
        setItemQuantity(0);
      }
    }
  }

  if (parent === "shop") {
    return (
      <div>
        <h3>{item.title}</h3>
        <img src={item.image} alt={item.title} />
        <p>{item.description}</p>
        <p>
          <b>Price: </b>${item.price}
        </p>
        <p>
          <b>Rating: </b>
          <b>{item.rating.rate} ⭐</b> ({item.rating.count})
        </p>
        <div className="quantityPicker">
          <button
            type="button"
            onClick={(e) => handleIncrementDecrement(e, "-")}
            disabled={itemQuantity === 0}
          >
            -
          </button>
          <input
            type="number"
            value={itemQuantity}
            onChange={(e) => handleChange(e)}
          ></input>
          <button
            type="button"
            onClick={(e) => handleIncrementDecrement(e, "+")}
          >
            +
          </button>
        </div>
        <button type="button" onClick={handleCartClick}>
          Add to Cart
        </button>
      </div>
    );
  } else {
    function handleQuantityAdjustment(e, type) {
      e.preventDefault();
      if (type === "-") {
        let newQuantity = Number(item.quantity) - 1;
        if (newQuantity === 0) {
          setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
        } else if (newQuantity > 0) {
          setCartItems(
            cartItems.map((cartItem) => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: Number(cartItem.quantity) - 1 };
              } else {
                return cartItem;
              }
            }),
          );
        }
      } else {
        setCartItems(
          cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
              return { ...cartItem, quantity: Number(cartItem.quantity) + 1 };
            } else {
              return cartItem;
            }
          }),
        );
      }
    }

    return (
      <div className="cartCardHolder">
        <h3>{item.title}</h3>
        <p>
          <b>Price: </b>${item.price}
        </p>{" "}
        <div className="quantityAdjuster">
          <button
            type="button"
            onClick={(e) => handleQuantityAdjustment(e, "-")}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            type="button"
            onClick={(e) => handleQuantityAdjustment(e, "+")}
          >
            +
          </button>
        </div>
      </div>
    );
  }
};

export default Card;
