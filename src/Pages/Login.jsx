// src/Pages/Login.jsx
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../Imagenes/Logo.png"; // Importa la imagen

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: white;
  position: relative; // Añade posición relativa para posicionar la imagen
`;

const LogoImage = styled.img`
  position: absolute; // Posiciona la imagen de manera absoluta
  top: 20px; // Ajusta la distancia desde la parte superior
  left: 20px; // Ajusta la distancia desde la izquierda
  width: 100px; // Ajusta el tamaño de la imagen
  height: auto; // Mantén la proporción de la imagen
`;

const LoginForm = styled.div`
  border: 2px solid #fff;
  padding: 40px;
  border-radius: 10px;
  background: #ffffff11;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  background: transparent;
  border: 1px solid white;
  color: white;
  width: 200px;
`;

const LoginButton = styled(Link)`
  display: block;
  padding: 10px 20px;
  margin-top: 20px;
  border: 2px solid white;
  background: transparent;
  color: white;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: #ffffff22;
  }
`;

export default function Login() {
  return (
    <LoginContainer>
      <LogoImage src={Logo} alt="Logo" /> {/* Añade la imagen aquí */}
      <h1>Detallado del Concreto Reforzado</h1>
      <LoginForm>
        <Input placeholder="Usuario" />
        <Input type="password" placeholder="Contraseña" />
        <LoginButton to="/main">Ingresar</LoginButton>
      </LoginForm>
    </LoginContainer>
  );
}