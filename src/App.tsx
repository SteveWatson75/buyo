import React, { useEffect, useReducer } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ctx } from "./context";
import Layout from "./layout";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import ProductList from "./pages/ProductList/ProductList";
import { initialState, reducer } from "./reducer";

const App: React.FC = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("api/products.json")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "SET_PRODUCTS", payload: data }));
  }, []);

  return (
    <ctx.Provider value={state}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route
              path="products/:title"
              element={<ProductDetail dispatch={dispatch} />}
            />
            <Route path="/cart" element={<Cart dispatch={dispatch} />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ctx.Provider>
  );
};

export default App;
