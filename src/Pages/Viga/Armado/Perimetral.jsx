// src/Pages/DetalleBarras.jsx
import Header from "../../../components/Header";
import { V_5 } from "../../../Figuras3D";
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
          <h2>PERIMETRAL</h2>
          <ul>
            <p></p>
            <li>
              Estribos abiertos  con dobleces a 90°
            </li>
            <p></p>
            <li>2 varillas de acero longitudinal en lecho superior
            </li>
            <p></p>
            <li>2 varillas de acero longitudinal en lecho inferior
            </li>
            <p></p>
            <li>
              El refuerzo longitudinal que termina con un gancho estándar orientado hacia la mitad de la altura de la viga o columna.
            </li>
            <p></p>
            <li>
              4 varillas de refuerzo longitudinal  adicional en lechos superior e inferior en zonas criticas
            </li>
            <p></p>
            <li>
              Grapas suplementarias en el lecho superior
            </li>
          </ul>
        </SpecificationPanel>

        <ThreeDContainer>
          <V_5 width="100%" height="100%" />
        </ThreeDContainer>
      </DetailContainer>
    </>
  );
}
