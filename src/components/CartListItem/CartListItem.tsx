import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ctx } from "../../context";
import { CartProductInterface, StateInterface } from "../../globalTypes";
import { ListContainer } from "./styled";

interface ProductProps {
  name: string;
}

const CartListItem: React.FC<ProductProps> = ({
  name,
}: ProductProps): JSX.Element => {
  const state = useContext(ctx) as StateInterface;
  const navigate = useNavigate();

  const product: CartProductInterface = state?.cart.find(
    (product) => product.name === name
  ) as CartProductInterface;

  const handleClick = () => {
    navigate(`/products/${name.trim().toLowerCase().replace(/\s/g, "-")}`);
  };
  const { price, reservedQuantity, options } = product;

  return (
    <ListContainer onClick={handleClick}>
      <h2>{name}</h2>
      <p>{price} SEK</p>
      <p>Quantity: {reservedQuantity}</p>
      {options && (
        <>
          {options.color && <p>Color: {options.color} </p>}
          {options.power && <p>Power: {options.power}</p>}
          {options.storage && <p>Storage: {options.storage}</p>}
        </>
      )}
    </ListContainer>
  );
};

export default CartListItem;
