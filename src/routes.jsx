import Home from "./components/Home";
import Cart from "./components/Cart";
import Parent from "./components/Parent";
import Shop from "./components/Shop";

const routes = [
  {
    path: "/",
    element: <Parent />,
    errorElement: null,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
    ],
  },
];

export default routes;
