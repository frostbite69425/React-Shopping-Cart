import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "../components/Card";
import { createMemoryRouter, RouterProvider } from "react-router";
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

const setCartItems = vi.fn();

const mockFetch = vi.fn();

window.fetch = mockFetch;

describe("Card component", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

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

  it("cart items gets deleted when the delete item button is clicked", async () => {
    const mockItems = [
      {
        id: 1,
        title: "foo",
        image: "mockImageLink",
        description: "bar",
        price: "baz",
        rating: { rate: 1.2, count: 200 },
        quantity: 20,
      },
      {
        id: 1,
        title: "bar",
        image: "mockImageLink",
        description: "bar",
        price: "baz",
        rating: { rate: 1.2, count: 200 },
        quantity: 10,
      },
    ];

    const cart = render(
      <Card
        item={mockItems[0]}
        cartItems={mockItems}
        setCartItems={setCartItems}
        parent="cart"
      />,
    );

    const deleteItemBtn = cart.getAllByRole("button", {
      name: "Delete Item",
    });

    expect(deleteItemBtn[0]).toBeInTheDocument();

    const user = userEvent.setup();

    await user.click(deleteItemBtn[0]);
    expect(cart.getAllByRole("button", { name: "Delete Item" }).length).toBe(1);
  });

  it("cart item quantity increases when add to cart button is clicked", async () => {
    const mockItems = [
      {
        id: 1,
        title: "foo",
        image: "mockImageLink",
        description: "bar",
        price: "baz",
        rating: { rate: 1.2, count: 200 },
        quantity: 0,
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockItems),
    });

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
    await waitFor(() => {
      expect(screen.queryByText("Loading ...")).not.toBeInTheDocument();
    });

    const increaseQuantityBtn = await shop.findByRole("button", {
      name: "+",
    });
    const addToCartBtn = await shop.findByRole("button", {
      name: "Add to Cart",
    });

    expect(increaseQuantityBtn).toBeInTheDocument();
    expect(addToCartBtn).toBeInTheDocument();

    await user.click(increaseQuantityBtn);
    await user.click(addToCartBtn);
    expect(screen.getByRole("link", { name: "Cart (1)" })).toBeInTheDocument();
  });

  it("displays a loading message while the network request is waiting to be resolved or rejected", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: () => Promise.reject("API is down"),
    });

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

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("svg-loader")).toBeInTheDocument();
  });

  it("displays an error message when the network request fails", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: () => Promise.reject("API is down"),
    });

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
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.queryByText("Loading ...")).not.toBeInTheDocument();
    });

    expect(
      screen.queryByText("Oops! We encountered a network error!"),
    ).toBeInTheDocument();
  });
});
