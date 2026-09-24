import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "../components/Navbar";
import { createMemoryRouter, MemoryRouter, RouterProvider } from "react-router";
import routes from "../routes";

let cartItems;

describe("Navbar component", () => {
  beforeEach(() => {
    cartItems = [];
  });

  it("renders the navbar correctly", () => {
    render(
      <MemoryRouter>
        <Navbar cartItems={cartItems} />
      </MemoryRouter>,
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("does not render the excluded path", () => {
    render(
      <MemoryRouter>
        <Navbar excludedPath={"/"} cartItems={cartItems} />
      </MemoryRouter>,
    );
    expect(screen.queryByText("home")).toBeNull();
  });

  it("renders the other two paths when an excluded path is provided", () => {
    render(
      <MemoryRouter>
        <Navbar cartItems={cartItems} excludedPath={"shop"} />
      </MemoryRouter>,
    );
    expect(screen.getAllByRole("link").length).toBe(2);
  });

  it("conditionally renders the links based no which Link is clicked", async () => {
    const router = createMemoryRouter(routes);

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const shopLink = screen.getByRole("link", { name: "Shop" });
    let homeLink = screen.queryByRole("link", { name: "Home" });
    const cartLink = screen.getByRole("link", { name: "Cart" });

    expect(shopLink).toBeInTheDocument();
    expect(homeLink).not.toBeInTheDocument();
    expect(cartLink).toBeInTheDocument();

    await user.click(shopLink);

    homeLink = screen.getByRole("link", { name: "Home" });

    expect(shopLink).not.toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(cartLink).toBeInTheDocument();
  });
});
