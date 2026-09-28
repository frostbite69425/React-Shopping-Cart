import { useState, useEffect } from "react";

const useImageUrl = () => {
  const [shopItems, setShopItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      fetch("https://fakestoreapi.com/products")
        .then((response) => {
          if (response.status >= 400) {
            throw new Error("Server Error");
          }
          return response.json();
        })
        .then((data) => data.map((item) => ({ ...item, quantity: 0 })))
        .then((data) => setShopItems(data))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }

    return () => (ignore = true);
  }, []);

  return { shopItems, error, loading };
};

export default useImageUrl;
