import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/BuyoLogo.png";
import Cart from "../assets/Cart.png";
import { ctx } from "../context";
import { StateInterface } from "../globalTypes";
import { HeaderContainer } from "./styled";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }): JSX.Element => {
  const state = useContext(ctx) as StateInterface;
  const navigate = useNavigate();

  const onClickList = () => {
    navigate("/");
  };

  const onClickCart = () => {
    navigate("/cart");
  };

  return (
    <main>
      <header>
        <HeaderContainer>
          <img src={Logo} height={80} alt="Buyo" onClick={onClickList} />
          <div>
            <img src={Cart} height={40} alt="Cart" onClick={onClickCart}></img>
            <h3>Cart ({state?.cart.length})</h3>
          </div>
        </HeaderContainer>
      </header>

      <section>{children}</section>
    </main>
  );
};

export default Layout;
