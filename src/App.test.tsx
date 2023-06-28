import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { ctx } from "./context";
import Layout from "./layout";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import ProductList from "./pages/ProductList/ProductList";
import { initialState } from "./reducer";

jest.mock("./context", () => ({
  ctx: {
    Provider: ({
      value,
      children,
    }: {
      value: any;
      children: React.ReactNode;
    }) => <>{children}</>,
  },
}));

describe("App", () => {
  beforeEach(() => {
    const mockProducts = {
      items: [
        {
          id: 1,
          name: "Product 1",
          reservedQuantity: 1,
          price: 100,
          weight: 100,
          available: true,
          brand: "Brand 1",
        },
        {
          id: 2,
          name: "Product 2",
          reservedQuantity: 1,
          price: 100,
          weight: 100,
          available: true,
          brand: "Brand 2",
        },
      ],
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockProducts),
    });
  });

  test("should fetch products and render the product list", async () => {
    render(<App />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  test("should render the cart page", () => {
    const mockDispatch = jest.fn();

    render(
      <BrowserRouter>
        <ctx.Provider value={{ ...initialState, products: [], cart: [] }}>
          <Layout>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route
                path="/products/:title"
                element={<ProductDetail dispatch={mockDispatch} />}
              />
              <Route path="/cart" element={<Cart dispatch={mockDispatch} />} />
            </Routes>
          </Layout>
        </ctx.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText("Cart ()")).toBeInTheDocument();
  });
});
