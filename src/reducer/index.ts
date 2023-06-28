import {
  StateInterface,
  ActionInterface,
  ProductInterface,
} from "../globalTypes";

export const initialState: StateInterface = {
  products: [],
  cart: [],
};

export const reducer = (state: StateInterface, action: ActionInterface) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: payload.items as ProductInterface[],
      };
    case "ADD_TO_CART":
      let newCartState: ProductInterface[] = state.cart;

      const productInCart = state.cart.find(
        (item) => item.id === payload.id
      ) as ProductInterface;

      if (!!productInCart) {
        productInCart.reservedQuantity! += 1;
        newCartState = [
          ...state.cart.filter((item) => item.id !== payload.id),
          productInCart,
        ];
      } else {
        newCartState = [...state.cart, payload];
      }

      return {
        ...state,
        cart: newCartState,
      };
    case "REMOVE_FROM_CART":
      const productToRemove = state.cart.find(
        (item) => item.id === payload.id
      ) as ProductInterface;

      if (productToRemove.reservedQuantity! < payload.quantity) return state;

      if (productToRemove.reservedQuantity! === payload.quantity) {
        return {
          ...state,
          cart: [...state.cart.filter((item) => item.id !== payload.id)],
        };
      }

      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === payload.id
            ? {
                ...item,
                reservedQuantity: item.reservedQuantity! - payload.quantity,
              }
            : item
        ),
      };

    default:
      return state;
  }
};
