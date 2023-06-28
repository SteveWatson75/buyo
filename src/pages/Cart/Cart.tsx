import React, { useContext, useState } from "react";
import CartListItem from "../../components/CartListItem";
import { ctx } from "../../context";
import { ActionInterface, StateInterface } from "../../globalTypes";
import { CartItemContainer } from "./styled";

interface CartProps {
  dispatch: React.Dispatch<ActionInterface>;
}

interface SelectedQuantityInterface {
  [name: string]: number | undefined;
}

const Cart: React.FC<CartProps> = ({ dispatch }): JSX.Element => {
  const state = useContext(ctx) as StateInterface;

  const [quantity, setQuantity] = useState<SelectedQuantityInterface>({
    null: 0,
  });

  const onClickRemove = (id: number, index: number) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { id, quantity: quantity[`quantity-${index}`] },
    });
  };

  return (
    <>
      {state.cart.length ? (
        <>
          {state.cart.map((product, index) => (
            <CartItemContainer key={product.id}>
              <CartListItem name={product.name} />
              <label>
                Quantity:
                <select
                  name={`quantity-${index}`}
                  value={quantity[`quantity-${index}`]}
                  onChange={(event) =>
                    setQuantity({
                      [event.target.name]: parseInt(event.target.value),
                    })
                  }
                >
                  {Array.from(
                    { length: product.reservedQuantity! + 1 },
                    (_, key) => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    )
                  )}
                </select>
              </label>
              <button onClick={() => onClickRemove(product.id, index)}>
                Remove
              </button>
            </CartItemContainer>
          ))}
        </>
      ) : (
        <CartItemContainer>
          <p>Cart is empty</p>
        </CartItemContainer>
      )}
    </>
  );
};

export default Cart;
