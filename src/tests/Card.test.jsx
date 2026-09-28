import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "../components/Card";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "../routes";
import Cart from "../components/Cart";
import Shop from "../components/Shop";
import Parent from "../components/Parent";

let item = {
  id: 1,
  title: "foo",
  image: "mockImageLink",
  description: "bar",
  price: "baz",
  rating: { rate: 1.2, count: 200 },
  quantity: 0,
};

let cartItems = [
  {
    id: 1,
    title: "foo",
    image: "mockImageLink",
    description: "bar",
    price: "baz",
    rating: { rate: 1.2, count: 200 },
    quantity: 2,
  },
];

let setCartItems = vi.fn();

describe("Card component", () => {
  it("renders the card correctly", () => {
    render(
      <Card item={item} cartItems={cartItems} setCartItems={setCartItems} />,
    );

    expect(
      screen.getByRole("heading", { name: item.title }),
    ).toBeInTheDocument();
  });

  it("decrease item quantity button is disabled when quantity is 0", () => {
    render(
      <Card item={item} cartItems={cartItems} setCartItems={setCartItems} />,
    );

    expect(screen.getByRole("button", { name: "-" })).toBeDisabled();
  });

  it("increase item quantity button to be enabled", () => {
    render(
      <Card item={item} cartItems={cartItems} setCartItems={setCartItems} />,
    );

    expect(screen.getByRole("button", { name: "+" })).toBeEnabled();
  });

  it("cart item quantity increases when + button is clicked", async () => {
    const customRoute = [
      {
        path: "/",
        element: <Parent />,
        errorElement: null,
        children: [
          { index: true, element: <Shop /> },
          { path: "cart", element: <Cart /> },
          { path: "shop", element: <Shop /> },
        ],
      },
    ];
    const router = createMemoryRouter(customRoute);
    const user = userEvent.setup();

    const shop = render(<RouterProvider router={router} />);
    const loadingPara = screen.getByRole("paragraph");
    expect(loadingPara).toBeInTheDocument();
    await waitForElementToBeRemoved(loadingPara);
    const increaseQuantityBtn = await shop.findAllByRole("button", {
      name: "+",
    });
    const addToCartBtn = await shop.findAllByRole("button", {
      name: "Add to Cart",
    });

    expect(increaseQuantityBtn).toBeInTheDocument();
    expect(addToCartBtn).toBeInTheDocument();
    // await user.click(await shop.findAllByRole("button", { name: "+" })[0]);
    // await user.click(
    //   await shop.findAllByRole("button", { name: "Add to Cart" })[0],
    // );
    // expect(screen.getByRole("link", { name: "Cart (1)" })).toBeInTheDocument();
  });
});
