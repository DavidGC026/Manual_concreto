// src/Pages/MainMenu.jsx
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../Imagenes/Logo.png";

const MenuContainer = styled.div`
  padding: 20px 10px 10px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 15px 10px;
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 30px;
  z-index: 100;
  
  img {
    max-width: 200px;
    height: auto;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
    transition: transform 0.3s ease;

    @media (max-width: 768px) {
      max-width: 150px;
      position: relative;
      top: 0;
      left: 0;
      margin: 0 auto 20px;
      display: block;
    }

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const ContentWrapper = styled.div`
  max-width: 1800px;
  margin: 100px auto 0;
  padding: 20px;

  @media (max-width: 768px) {
    margin: 150px auto 0;
    padding: 15px;
  }
`;

const TitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const GridButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 768px) {
    gap: 15px;
    padding: 15px;
  }

  @media (max-width: 480px) {
    gap: 12px;
    padding: 10px;
  }
`;

const MenuButton = styled(Link)`
  padding: 25px 15px;
  border: 3px solid #2c3e50;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.5);
  color: black;
  text-decoration: none;
  text-align: center;
  font-family: "Arial", sans-serif;
  font-weight: bold;
  font-size: 1.2em;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 70px;
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
    min-height: 60px;
    border-width: 2px;
    
    &:active {
      transform: translateY(0);
      background: rgba(255, 255, 255, 0.4);
    }
  }

  @media (max-width: 480px) {
    padding: 18px 10px;
    font-size: 1em;
    min-height: 55px;
  }
`;

const ResponsiveTitle = styled.h4`
  text-align: center;
  color: white;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 3.5em;
  margin: 20px 0;

  @media (max-width: 768px) {
    font-size: 2.5em;
    margin: 15px 0;
  }

  @media (max-width: 480px) {
    font-size: 2em;
  }
`;

const ResponsiveSubtitle = styled.h3`
  padding: 10px 20px;
  text-align: center;
  color: white;
  font-family: "Arial", sans-serif;
  font-size: 1.8em;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 1.4em;
    margin-bottom: 30px;
    padding: 10px;
  }

  @media (max-width: 480px) {
    font-size: 1.2em;
  }
`;

export default function MainMenu() {
  return (
    <MenuContainer>
      <LogoContainer>
        <img src={Logo} alt="Logo IMCYC" />
      </LogoContainer>

      <ContentWrapper>
        <TitleWrapper>
          <ResponsiveTitle>Bienvenido a la plataforma IMCYC</ResponsiveTitle>
          <ResponsiveSubtitle>Por favor, elija una opción:</ResponsiveSubtitle>
        </TitleWrapper>

        <GridButtons>
          <MenuButton to="/columnas">COLUMNAS</MenuButton>
          <MenuButton to="/viga">VIGA</MenuButton>
          <MenuButton to="/conexiones">CONEXIONES VIGA-COLUMNA</MenuButton>
          <MenuButton to="/muros">MUROS</MenuButton>
        </GridButtons>
      </ContentWrapper>
    </MenuContainer>
  );
}