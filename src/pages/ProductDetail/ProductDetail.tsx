import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ctx } from "../../context";
import {
  ActionInterface,
  CartProductInterface,
  ProductInterface,
} from "../../globalTypes";
import { ProductDetailContainer } from "./styled";

interface ProductDetailProps {
  dispatch: React.Dispatch<ActionInterface>;
}

interface SelectedQuantityInterface {
  [name: string]: number | undefined;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  dispatch,
}): JSX.Element => {
  const state = useContext(ctx);
  const { title } = useParams();

  const [quantity, setQuantity] = useState<SelectedQuantityInterface>({
    null: 0,
  });

  const product: ProductInterface = state?.products.find(
    (product) => product.name.trim().toLowerCase().replace(/\s/g, "-") === title
  ) as ProductInterface;

  const { options } = product;

  const handleAddToCart = (selectedProduct: CartProductInterface) => {
    if (quantity.name === 0) {
      alert("Please select a quantity");
      return;
    }

    dispatch({ type: "ADD_TO_CART", payload: selectedProduct });
  };

  const productList: CartProductInterface[] = [];

  options!.forEach((option, index) => {
    let productOptions: CartProductInterface;
    if (option.power?.length) {
      option.power?.forEach((power) => {
        const productOptions = {
          name: `${product.name}-${option.color}`,
          id: product.id,
          price: product.price,
          brand: product.brand,
          available: product.available,
          weight: product.weight,
          reservedQuantity: quantity[`quantity-${index}`],
          options: {
            color: option.color as string,
            power: power,
            storage: "",
            quantity: option.quantity as number,
          },
        };
        productList.push(productOptions);
      });
    } else if (option.storage?.length) {
      option.storage?.forEach((storage) => {
        productOptions = {
          name: `${product.name}-${option.color}`,
          id: product.id,
          price: product.price,
          brand: product.brand,
          available: product.available,
          weight: product.weight,
          reservedQuantity: quantity[`quantity-${index}`],
          options: {
            color: (option.color || option.color[0]) as string,
            power: null,
            storage: storage,
            quantity: option.quantity as number,
          },
        };
        productList.push(productOptions);
      });
    } else if (option.color?.length && Array.isArray(option.color)) {
      option.color?.forEach((color) => {
        productOptions = {
          name: `${product.name}-${option.color}`,
          id: product.id,
          price: product.price,
          brand: product.brand,
          available: product.available,
          weight: product.weight,
          reservedQuantity: quantity[`quantity-${index}`],
          options: {
            color: (option.color || option.color[0]) as string,
            power: null,
            storage: null,
            quantity: option.quantity as number,
          },
        };
        productList.push(productOptions);
      });
    }
  });

  const renderProduct = (product: CartProductInterface, index: number) => {
    return (
      <ProductDetailContainer key={index}>
        <h3>{product.name}</h3>
        <p>Brand: {product.brand}</p>
        <p>Price: {product.price}</p>
        <p>Available: {product.available ? "Yes" : "No"}</p>
        <p>Weight: {product.weight} kg</p>
        <p>Color: {product.options!.color}</p>
        {product.options!.power && <p>Power: {product.options!.power}</p>}
        {product.options!.storage && <p>Storage: {product.options!.storage}</p>}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {product.options!.quantity > 0 && (
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
                  { length: product.options!.quantity + 1 },
                  (_, key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  )
                )}
              </select>
            </label>
          )}
        </div>
        {product.available && product.options!.quantity !== 0 ? (
          <button
            style={{ margin: 20 }}
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
        ) : (
          <p>Out of Stock</p>
        )}
      </ProductDetailContainer>
    );
  };

  return (
    <>{productList.map((product, index) => renderProduct(product, index))}</>
  );
};

export default ProductDetail;
