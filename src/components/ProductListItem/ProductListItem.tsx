import React from "react";
import { useNavigate } from "react-router-dom";
import { ListContainer } from "./styled";

interface ProductProps {
  name: string;
  price: number;
}

const ProductListItem: React.FC<ProductProps> = ({
  name,
  price,
}: ProductProps): JSX.Element => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/products/${name.trim().toLowerCase().replace(/\s/g, "-")}`);
  };

  return (
    <ListContainer onClick={handleClick}>
      <h2>{name}</h2>
      <p>{price} SEK</p>
    </ListContainer>
  );
};

export default ProductListItem;
