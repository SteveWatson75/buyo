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
    // case "ADD_TO_CART":
    //   return {
    //     ...state,
    //     cart: [...state.cart, payload],
    //   };
    // case "REMOVE_FROM_CART":
    //   return {
    //     ...state,
    //     cart: state.cart.filter((item) => item.id !== payload),
    //   };
    // case "UPDATE_CART":
    //   return {
    //     ...state,
    //     cart: state.cart.map((item) => {
    //       if (item.id === payload.id) {
    //         return {
    //           ...item,
    //           options: payload.options,
    //         };
    //       }
    //       return item;
    //     }),
    //   };
    default:
      return state;
  }
};
