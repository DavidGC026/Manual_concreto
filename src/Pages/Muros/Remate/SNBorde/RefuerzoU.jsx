// src/Pages/DetalleBarras.jsx
import Header from "../../../../components/Header";
import { MR_03 } from "../../../../Figuras3D";
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
          <h2>Refuerzo U</h2>
          <ul>
            <p></p>
            <li>
              Estribo en U abrazando el acero vertical en el área de remate.

            </li>
            <p></p>
            <li>
              Barras horizontal con remate recto

            </li>
            <p></p>
            <li>
              Grapas suplementarias a 135°

            </li>
            <p></p>
            <li>
              El refuerzo horizontal que termine en las orillas de los muros sin elementos de borde aceptará estar rodeado por estribos en forma de U que tengan el mismo diámetro y separación que el refuerzo horizontal con el cual serán traslapados

            </li>
            <p></p>
            <li>
              Se requiere soportar lateralmente el refuerzo longitudinal cuando 𝑨_𝒔𝒕 es mayor que 0.01 𝑨_𝒈

            </li>
          </ul>
        </SpecificationPanel>

        <ThreeDContainer>
          <MR_03 width="100%" height="100%" />
        </ThreeDContainer>
      </DetailContainer>
    </>
  );
}
