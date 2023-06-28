import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px 16px;
  margin: 0 auto;
  justify-content: space-between;
`;

export const StickyHeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  box-shadow: 0 2px 24px 0 rgb(0 0 0 / 15%);
  background-color: #ffffff !important;
  animation: 500ms ease-in-out 0s normal none 1 running fadeInDown;
  padding-top: 0px;
  padding-bottom: 0px;
`;
