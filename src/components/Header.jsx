import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../Imagenes/Logo.png";

const HeaderContainer = styled.header`
  background: var(--azul-oscuro);
  padding: 1rem 2rem;
  color: var(--blanco);
  display: flex;
  gap: 2rem;
  top: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 400px) {
    padding: 0.5rem 1rem;
    gap: 1rem;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden; // Contiene el overflow del header
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;

  img {
    height: 100px;
    transition: opacity 0.3s;

    @media (max-width: 768px) {
      height: 60px;
    }

    &:hover {
      opacity: 0.8;
    }
  }
`;

const Breadcrumb = styled.div`
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  overflow-x: auto; // Habilita scroll horizontal
  white-space: nowrap; // Evita saltos de línea
  width: 100%; // Ocupa todo el ancho disponible
  
  // Estilos específicos para móviles
  @media (max-width: 768px) {
    font-size: 0.7rem;
    gap: 0.3rem;
    padding-bottom: 10px; // Espacio para el scrollbar
    margin-left: -1rem; // Compensa el padding del contenedor
    padding-left: 1rem; // Mantiene la alineación
    width: calc(100% + 2rem); // Ajuste de ancho para scroll
    
    // Estilizar scrollbar
    &::-webkit-scrollbar {
      height: 4px; // Altura del scrollbar horizontal
    }
    
    &::-webkit-scrollbar-track {
      background: var(--azul-oscuro);
    }
    
    &::-webkit-scrollbar-thumb {
      background: var(--naranja-imcyc);
      border-radius: 2px;
    }
  }
`;

const Crumb = styled(Link)`
  color: var(--gris-claro);
  text-decoration: none;
  transition: opacity 0.3s;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.8;
    color: var(--naranja-imcyc);
  }

  &:not(:last-child)::after {
    content: ">";
    margin: 0 1rem;
    color: var(--naranja-imcyc);
    font-weight: 300;

    @media (max-width: 400px) {
      margin: 0 0.25rem;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const CurrentPage = styled.span`
  color: var(--naranja-imcyc);
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

export default function Header() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <HeaderContainer>
      <LogoLink to="/">
        <img src={Logo} alt="Logo IMCYC" />
      </LogoLink>

      <Breadcrumb>
        <Crumb to="/">INICIO</Crumb>

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          const formattedName = name
            .split("-")
            .join(" ")
            .toUpperCase();

          return isLast ? (
            <CurrentPage key={routeTo}>
              {formattedName}
            </CurrentPage>
          ) : (
            <Crumb key={routeTo} to={routeTo}>
              {formattedName}
            </Crumb>
          );
        })}
      </Breadcrumb>
    </HeaderContainer>
  );
}