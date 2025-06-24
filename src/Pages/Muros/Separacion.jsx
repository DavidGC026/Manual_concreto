// src/Pages/DetalleBarras.jsx
import Header from "../../components/Header";
import { MR_16 } from "../../Figuras3D";
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
          <h2>SEPARACIÓN EN SECCIÓN CRITICA</h2>
          <ul>
            <p></p>
            <li>
              Debido a que el área bruta de la sección de un muro estructural es muy grande, las cargas axiales que obrarán sobre él estarán muy por debajo del punto balanceado, debido a esto una adecuada ductilidad se curvatura se logrará sí:
            </li>
            <p></p>
            <h4>
              a) Se coloca el refuerzo por flexión en los extremos del muro
            </h4>
            <p></p>
            <h4>
              b) Se confinan estos extremos mediante estribos con bajas separaciones
            </h4>
            <p></p>
            <li>
              Estribos cerrados abrazando 6 barras longitudinales verticales con dobleces a 135° en bordes con grapas suplementarias alternando su posición a lo largo de todo el muro.
            </li>
            <p></p>
            <li>
              Estribos cerrados abrazando 8 barras longitudinales verticales con dobleces a 135° en bordes con grapas suplementarias alternando posición a lo largo de todo el muro.
            </li>
            <p></p>
            <li>
              Los elementos están reforzados con barras transversales en forma de estribos y grapas para restringir el pandeo del refuerzo vertical y para confinar el concreto cuando el extremo esté sujeto a compresión cíclica.
            </li>
          </ul>
        </SpecificationPanel>

        <ThreeDContainer>
          <MR_16 width="100%" height="100%" />
        </ThreeDContainer>
      </DetailContainer>
    </>
  );
}
