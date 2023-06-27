import React, { useEffect, useReducer } from "react";
import { ctx } from "./context";
import ProductList from "./pages/ProductList";
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
      {state.products.length ? (
        <>
          {console.log(state)}
          {state.products.map((product) => (
            <ProductList
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              available={product.available}
            />
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </ctx.Provider>
  );
};

export default App;
