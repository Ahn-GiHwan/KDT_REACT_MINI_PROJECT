import styled from "styled-components";

export const HeaderTag = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: white;
`;

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

export const Main = styled.main`
  position: relative;
  width: 80%;
  margin: 0 auto;
`;

export const BoardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const ErrorBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TotalPrice = styled.span`
  font-size: 25px;
  font-weight: 600;
  color: black;
`;
