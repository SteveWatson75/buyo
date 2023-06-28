import { ActionInterface, StateInterface } from "../globalTypes";
import { reducer, initialState } from "./index";

describe("reducer", () => {
  test("should return the initial state", () => {
    const state = reducer(initialState, { type: "INIT", payload: null });
    expect(state).toEqual(initialState);
  });

  test("should set products", () => {
    const products = [{ id: 1, name: "Product 1" }];
    const action = { type: "SET_PRODUCTS", payload: { items: products } };
    const state = reducer(initialState, action);
    expect(state.products).toEqual(products);
  });

  test("should add product to cart", () => {
    const product = { id: 1, name: "Product 1", reservedQuantity: 1 };
    const action = { type: "ADD_TO_CART", payload: product };
    const state = reducer(initialState, action);
    expect(state.cart).toContainEqual(product);
  });

  test("should increment reserved quantity of existing product in cart", () => {
    const product = {
      id: 1,
      name: "Product 1",
      reservedQuantity: 1,
      price: 100,
      weight: 100,
      available: true,
      brand: "Brand 1",
    };
    const existingProduct = {
      id: 1,
      name: "Product 1",
      reservedQuantity: 1,
      price: 100,
      weight: 100,
      available: true,
      brand: "Brand 1",
    };
    const initialStateWithProduct: StateInterface = {
      ...initialState,
      cart: [existingProduct],
    };
    const action: ActionInterface = { type: "ADD_TO_CART", payload: product };
    const state = reducer(initialStateWithProduct, action);
    expect(state.cart).toContainEqual({
      ...existingProduct,
      reservedQuantity: 2,
    });
  });

  test("should remove product from cart", () => {
    const product = {
      id: 1,
      name: "Product 1",
      reservedQuantity: 1,
      price: 100,
      weight: 100,
      available: true,
      brand: "Brand 1",
    };
    const initialStateWithProduct: StateInterface = {
      ...initialState,
      cart: [product],
    };
    const action: ActionInterface = {
      type: "REMOVE_FROM_CART",
      payload: { id: 1, quantity: 1 },
    };
    const state = reducer(initialStateWithProduct, action);
    expect(state.cart).toEqual([]);
  });

  test("should decrement reserved quantity of existing product in cart", () => {
    const product = {
      id: 1,
      name: "Product 1",
      reservedQuantity: 2,
      price: 100,
      weight: 100,
      available: true,
      brand: "Brand 1",
    };
    const initialStateWithProduct: StateInterface = {
      ...initialState,
      cart: [product],
    };
    const action: ActionInterface = {
      type: "REMOVE_FROM_CART",
      payload: { id: 1, quantity: 1 },
    };
    const state = reducer(initialStateWithProduct, action);
    expect(state.cart).toContainEqual({ ...product, reservedQuantity: 1 });
  });

  test("should not remove product from cart if reserved quantity is not equal to payload quantity", () => {
    const product = {
      id: 1,
      name: "Product 1",
      reservedQuantity: 1,
      price: 100,
      weight: 100,
      available: true,
      brand: "Brand 1",
    };
    const initialStateWithProduct: StateInterface = {
      ...initialState,
      cart: [product],
    };
    const action: ActionInterface = {
      type: "REMOVE_FROM_CART",
      payload: { id: 1, quantity: 2 },
    };
    const state = reducer(initialStateWithProduct, action);
    expect(state.cart).toContainEqual(product);
  });
});
