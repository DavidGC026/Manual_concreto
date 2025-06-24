// src/Pages/DetalleBarras.jsx
import Header from "../../../../components/Header";
import styled from "styled-components";
import { C_10 } from "../../../../Figuras3D";

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
          <h3>DETALLADO PARA 10 BARRAS DE 2 ESTRIBO DE CONFINAMIENTO</h3>
          <ul>
            <li>
              La posición de los ganchos debe alternarse en estribos
              consecutivos
            </li>
            <li>
              La distancia centro a centro de las barras longitudinales
              soportadas lateralmente no debe exceder 500mm o en casos donde
              Pu&gt; 0.3𝑨𝒈𝒇𝒄 ′ o 𝒇𝒄 ′ &gt; 70 MPa (700 kg/cm2 ) no excederá los
              300 mm.
            </li>
            <li>
              Estribo cerrado que abraza 10 barras longitudinales con doblez a
              135°
            </li>
            <li>
              Estribo de apoyo envolviendo 4 barras longitudinales centrales
              con doblez a 135°
            </li>
            <li>
              Grapa suplementaria posicionada de manera perpendicular al estribo
              de apoyo con doblez a 135°
            </li>
          </ul>
        </SpecificationPanel>

        <ThreeDContainer>
          <C_10
            width="100%" // Duplicamos el ancho del modelo
            height="100%"
            style={{ transform: 'scale(1)' }} // Resetear escala si es necesario
          />
        </ThreeDContainer>
      </DetailContainer>
    </>
  );
}