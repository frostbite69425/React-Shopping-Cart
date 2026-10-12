import Home from "./components/Home";
import Cart from "./components/Cart";
import Parent from "./components/Parent";
import Shop from "./components/Shop";
import ErrorPage from "./components/ErrorPage";

const routes = [
  {
    path: "/",
    element: <Parent />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
    ],
  },
];

export default routes;
