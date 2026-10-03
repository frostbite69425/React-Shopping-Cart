import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import Cart from "../components/Cart";
import Shop from "../components/Shop";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { useState } from "react";

let mockCartItems = [
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

const MockParent = vi.fn(() => {
  const [cartItems, setCartItems] = useState(mockCartItems);

  return (
    <>
      <Navbar excludedPath={"/"} cartItems={cartItems} />
      <Outlet context={[cartItems, setCartItems]} />
    </>
  );
});

describe("Cart component", () => {
  const customRoute = [
    {
      path: "/",
      element: <MockParent />,
      errorElement: null,
      children: [
        { index: true, element: <Cart /> },
        { path: "cart", element: <Cart /> },
        { path: "shop", element: <Shop /> },
      ],
    },
  ];
  const router = createMemoryRouter(customRoute);

  const user = userEvent.setup();

  it("renders the contents of the cartItems array", () => {
    const cart = render(<RouterProvider router={router} />);
    expect(cart.getByRole("heading", { name: "foo" })).toBeInTheDocument();
    expect(cart.getByRole("button", { name: "+" })).toBeInTheDocument();
    expect(cart.getByRole("button", { name: "-" })).toBeInTheDocument();
  });

  it("changes the quantity value when the increase and decrease buttons are clicked", async () => {
    const cart = render(<RouterProvider router={router} />);

    const increaseQuantityBtn = cart.getByRole("button", { name: "+" });
    const decreaseQuantityBtn = cart.getByRole("button", { name: "-" });
    const quantitySpan = cart.getByText("2");

    await user.click(increaseQuantityBtn);
    expect(quantitySpan.textContent).toBe("3");

    await user.click(decreaseQuantityBtn);
    expect(quantitySpan.textContent).toBe("2");
  });

  it("removes the item from the page if quantity is reduced to 0", async () => {
    const cart = render(<RouterProvider router={router} />);

    expect(cart.getByRole("heading", { name: "foo" })).toBeInTheDocument();

    const decreaseQuantityBtn = cart.getByRole("button", { name: "-" });

    await user.click(decreaseQuantityBtn);
    await user.click(decreaseQuantityBtn);
    expect(cart.queryByRole("heading", { name: "foo" })).toBeNull();
  });

  it("displays a generic message when no items are present in the cart", async () => {
    const cart = render(<RouterProvider router={router} />);
    const decreaseQuantityBtn = cart.getByRole("button", { name: "-" });

    await user.click(decreaseQuantityBtn);
    await user.click(decreaseQuantityBtn);
    expect(
      cart.getByText(
        "You currently have no items in your cart. Please add them in the shop to view them here.",
      ),
    ).toBeInTheDocument();
  });
});
