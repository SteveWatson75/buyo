import React from "react";
import { ListContainer } from "./styled";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  available: boolean;
}

const ProductList: React.FC<ProductProps> = ({
  id,
  name,
  price,
  available,
}: ProductProps): JSX.Element => {
  return (
    <ListContainer>
      <h2>{name}</h2>
      <p>{price} SEK</p>
      <button>Add to Cart</button>
    </ListContainer>
  );
};

export default ProductList;
