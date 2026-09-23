import Home from "./components/Home";

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: null,
    children: [
      { path: "shop", element: null },
      { path: "cart", element: null },
    ],
  },
];

export default routes;
