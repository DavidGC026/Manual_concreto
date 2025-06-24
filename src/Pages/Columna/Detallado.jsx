import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    padding: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 10px;
  }
`;

const BarButton = styled(Link)`
  padding: 25px 15px;
  border: 3px solid #2c3e50;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.5);
  color: black;
  text-decoration: none;
  text-align: center;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  font-size: 1.2em;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.35);
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 20px 12px;
    font-size: 1.1em;
    min-height: 80px;
  }

  @media (max-width: 480px) {
    padding: 18px 10px;
    font-size: 1em;
    min-height: 70px;
    border-width: 2px;
  }

  &:active {
    transform: translateY(0);
    background: rgba(255, 255, 255, 0.4);
  }
`;

const MenuContainer = styled.div`
  padding: 0 10px 10px;

  h3 {
    padding: 10px;
    text-align: center;
    color: white;
    font-size: 1.1rem;

    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }

  h2 {
    padding: 0 20px 20px;
    text-align: center;
    color: white;
    font-family: "Arial", sans-serif;
    font-size: 1.8rem;
    margin: 0 auto;
    max-width: 800px;

    @media (max-width: 768px) {
      font-size: 1.6rem;
      padding: 0 15px 15px;
    }

    @media (max-width: 480px) {
      font-size: 1.4rem;
      padding: 0 10px 10px;
    }
  }
`;

const Separator = styled.div`
  height: 2px;
  background: #bdc3c7;
  margin: 30px auto;
  width: 80%;

  @media (max-width: 480px) {
    margin: 20px auto;
    width: 90%;
  }
`;

export default function Columnas() {
  const barras = [4, 6, 8, 10, 12, 14, 16, 20, 22];

  return (
    <>
      <Header />
      <MenuContainer>
        <div>
          <h2>ELIJE LA CANTIDAD DE ACERO LONGITUDINAL</h2>
          <GridContainer>
            {barras.map((num) => (
              <BarButton key={num} to={`/columnas/detallado/${num}-barras`}>
                {num} BARRAS
              </BarButton>
            ))}
          </GridContainer>
          <Separator />
        </div>
      </MenuContainer>
    </>
  );
}