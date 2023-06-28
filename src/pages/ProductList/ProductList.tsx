import React, { useEffect, useReducer } from "react";
import ProductListItem from "../../components/ProductListItem";
import { ctx } from "../../context";
import { initialState, reducer } from "../../reducer";
import { ProductListContainer } from "./styled";

const ProductList: React.FC = (): JSX.Element => {
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
          {state.products.map((product) => (
            <ProductListItem
              key={product.id}
              name={product.name}
              price={product.price}
            />
          ))}
        </>
      ) : (
        <ProductListContainer>
          <p>Loading...</p>
        </ProductListContainer>
      )}
    </ctx.Provider>
  );
};

export default ProductList;
