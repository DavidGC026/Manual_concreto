// src/Pages/DetalleBarras.jsx
import Header from "../../components/Header";
import { C_20 } from "../../Figuras3D";
import styled from "styled-components";

const DetailContainer = styled.div`
  display: flex;
  color: white;
  overflow: hidden;
  flex-direction: column; // Cambio a columna para móviles
  min-height: 0vh;

  @media (min-width: 768px) {
    flex-direction: row;
    height: 82.5vh;
    width: 96vw;
  }
`;

const SpecificationPanel = styled.div`
  width: 100%; // Ancho completo en móviles
  padding: 0px;
  overflow-y: auto;
  border-right: none; // Quitamos borde lateral en móviles
  flex-shrink: 0;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 15px;
  }

  li {
    font-size: 0.9rem;
    margin-bottom: 20px;
    line-height: 1.4;
  }

  @media (min-width: 768px) {
    width: 400px;
    padding: 20px;
    border-right: 2px solid #333;
    
    h3 {
      font-size: 1.4rem;
    }
    
    li {
      font-size: 1rem;
    }
  }
`;

const ThreeDContainer = styled.div`
  flex: 1;
  position: adjust;
  width: 100%; // Doble ancho
  width: 200%; // Doble ancho
  margin-left: 0%; // Centrar el contenido
  transform: scale(0.9); // Escalar para ajustar al viewport
  transform-origin: left center;
  padding: 10px 0;

  /* Para móviles */
  @media (max-width: 767px) {
    width: 200%; // Doble ancho
    margin-left: 0%; // Centrar el contenido
    overflow-x: auto; // Scroll horizontal si es necesario
    transform: scale(0.9); // Escalar para ajustar al viewport
    transform-origin: left center;
    padding: 10px 0;
  }

  @media (min-width: 768px) {
    padding: 10px 0 0 40px;
    min-height: auto;
  }
`;

export default function DetalleBarras() {
  return (
    <>
      <Header />

      <DetailContainer>
        <SpecificationPanel>
          <h2>EMPALME</h2>
          <ul>
            <p></p>
            <li>Pendiente de bayoneteado 1:6.</li>
            <p></p>
            <li>Grapas suplementarias a 135° en columnas.</li>
            <p></p>
            <li>Estribos cerrados con doblez a 135°</li>
            <p></p>
            <li>El traslapo a compresión debe ser mayor a 300 mm.</li>
            <p></p>
            <li>
              El traslapo a tensión para esfuerzos en la barra ≤0.5𝑓_𝑦 puede ser
              menor o igual al 50% en cualquier sección.
            </li>
          </ul>
        </SpecificationPanel>

        <ThreeDContainer>
          <C_20 width="100%" height="100%" />
        </ThreeDContainer>
      </DetailContainer>
    </>
  );
}
