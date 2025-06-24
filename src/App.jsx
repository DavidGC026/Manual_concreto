// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import MainMenu from './Pages/MainMenu';
import HomePage from './Pages/MainMenu';

/*COLUMNAS */
import Columnas from './Pages/Columnas';
import DetalleBarras4 from './Pages/Columna/Detallado/4-barras';
import DetalleBarras6 from './Pages/Columna/Detallado/6-barras';
import DetalleBarras8 from './Pages/Columna/Detallado/8-barras';
import DetalleBarras10 from './Pages/Columna/Detallado/10-barras';
import DetalleBarras12 from './Pages/Columna/Detallado/12-barras';
import DetalleBarras14 from './Pages/Columna/Detallado/14-barras';
import DetalleBarras16 from './Pages/Columna/Detallado/16-barras';
import DetalleBarras20 from './Pages/Columna/Detallado/20-barras';
import DetalleBarras22 from './Pages/Columna/Detallado/22-barras';
import Varillas6_4 from './Pages/Columna/Detallado/6barras/4-ramas';
import Varillas6_5 from './Pages/Columna/Detallado/6barras/5-ramas';
import Varillas6 from './Pages/Columna/Detallado/6-barras';
import Varillas8 from './Pages/Columna/Detallado/8-barras';
import Varillas8_4 from './Pages/Columna/Detallado/8barras/4-ramas';
import Varillas8_5 from './Pages/Columna/Detallado/8barras/5-ramas';
import Varillas8_6 from './Pages/Columna/Detallado/8barras/6ramas';
import Varillas8_estribo from './Pages/Columna/Detallado/8barras/6ramas/estribo';
import Varillas8_grapa from './Pages/Columna/Detallado/8barras/6ramas/grapas';
import Varillas10 from './Pages/Columna/Detallado/10-barras';
import Varillas10_1 from './Pages/Columna/Detallado/10barras/1estribo';
import Varillas10_2 from './Pages/Columna/Detallado/10barras/2estribo';
import Varillas12 from './Pages/Columna/Detallado/12-barras';
import Varillas12_6 from './Pages/Columna/Detallado/12barras/6-ramas';
import Varillas12_8 from './Pages/Columna/Detallado/12barras/8-ramas';
import Varillas12_7 from './Pages/Columna/Detallado/12barras/7-ramas';
import Varillas12_1estribo from './Pages/Columna/Detallado/12barras/7ramas/1estribo';
import Varillas12_2estribo from './Pages/Columna/Detallado/12barras/7ramas/2estribo';
import Varillas16_6 from './Pages/Columna/Detallado/16barras/6-ramas';
import Varillas16_10 from './Pages/Columna/Detallado/16barras/10-ramas';
import Varillas16 from './Pages/Columna/Detallado/16-barras';
import Detallado from './Pages/Columna/Detallado';
import Reduccion from './Pages/Columna/Reduccion';
import Empalme from './Pages/Columna/Empalme';

/* VIGAS */
import Viga from './Pages/Viga';
import ConexionV from './Pages/Viga/Conexion';
import EmpalmeV from './Pages/Viga/Empalme';
import Armado from './Pages/Viga/Armado';
import Perimetralvg from './Pages/Viga/Armado/Perimetral';
import NoPerimetral from './Pages/Viga/Armado/NoPerimetral';
import Sismico from './Pages/Viga/Armado/Sismico';
import EstriboAbierto from './Pages/Viga/Armado/NoPerimetral/EstriboAbierto';
import EstriboCerrado from './Pages/Viga/Armado/NoPerimetral/EstriboCerrado';

/* CONEXIONES */
import Conexiones from './Pages/Conexiones';
import EntrePiso from './Pages/Conexiones/EntrePiso';
import DeTecho from './Pages/Conexiones/DeTecho';

import Interior from './Pages/Conexiones/EntrePiso/Interior';
import Exterior from './Pages/Conexiones/EntrePiso/Exterior';
import Esquina from './Pages/Conexiones/EntrePiso/Esquina';
import Perimetral from './Pages/Conexiones/EntrePiso/Perimetral';
import Simple from './Pages/Conexiones/EntrePiso/Simple';

import Interior2 from './Pages/Conexiones/DeTecho/Interior';
import Exterior2 from './Pages/Conexiones/DeTecho/Exterior';
import Esquina2 from './Pages/Conexiones/DeTecho/Esquina';
import Perimetral2 from './Pages/Conexiones/DeTecho/Perimetral';
import Simple2 from './Pages/Conexiones/DeTecho/Simple';

/* MUROS */
import Muros from './Pages/Muros';
import Remate from './Pages/Muros/Remate';
import RefuerzoU from './Pages/Muros/Remate/SNBorde/RefuerzoU';
import RefuerzoSimple from './Pages/Muros/Remate/SNBorde/RefuerzoSimple';
import RefuerzoDoble from './Pages/Muros/Remate/SNBorde/RefuerzoDoble';
import RefuerzoSNBorde from './Pages/Muros/Remate/SinBorde';
import RefuerzoCBorde from './Pages/Muros/Remate/ConBorde';
import Ramas9 from './Pages/Muros/Remate/CBorde/9ramas';
import Ramas8 from './Pages/Muros/Remate/CBorde/8ramas';
import Ramas7 from './Pages/Muros/Remate/CBorde/7ramas';
import M06 from './Pages/Muros/Remate/CBorde/7ramas/M06';
import M07 from './Pages/Muros/Remate/CBorde/7ramas/M07';

import Esquina3 from './Pages/Muros/Esquina';
import EsqConPatin from './Pages/Muros/Esquina/ConPatin';
import EsqSBorde from './Pages/Muros/Esquina/SBorde';
import EsqCBorde from './Pages/Muros/Esquina/CBorde';
import EsqSimple from './Pages/Muros/Esquina/simple';
import EsqRefuerzo from './Pages/Muros/Esquina/RefuerzoLateral';
import EsqRefuerzo_4 from './Pages/Muros/Esquina/RefuerzoLateral/4ramas';
import EsqRefuerzo_5 from './Pages/Muros/Esquina/RefuerzoLateral/5ramas';

import ConexionIn from './Pages/Muros/ConexionIn';
import ConexionInConPatin from './Pages/Muros/ConexionIn/simple';
import ConexionInSimple from './Pages/Muros/ConexionIn/ConPatin';

import Separacion from './Pages/Muros/Separacion';


const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
`;

export default function App() {
  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/columnas" element={<Columnas />} />
        <Route path="/columnas/detallado" element={<Detallado />} />
        <Route path="/columnas/reduccion" element={<Reduccion />} />
        <Route path="/columnas/empalme" element={<Empalme />} />
        <Route path="/columnas/detallado/4-barras" element={<DetalleBarras4 />} />
        <Route path="/columnas/detallado/6-barras" element={<DetalleBarras6 />} />
        <Route path="/columnas/detallado/8-barras" element={<DetalleBarras8 />} />
        <Route path="/columnas/detallado/10-barras" element={<DetalleBarras10 />} />
        <Route path="/columnas/detallado/12-barras" element={<DetalleBarras12 />} />
        <Route path="/columnas/detallado/14-barras" element={<DetalleBarras14 />} />
        <Route path="/columnas/detallado/16-barras" element={<DetalleBarras16 />} />
        <Route path="/columnas/detallado/20-barras" element={<DetalleBarras20 />} />
        <Route path="/columnas/detallado/22-barras" element={<DetalleBarras22 />} />
        <Route path="/columnas/detallado/6-barras/4-ramas" element={<Varillas6_4 />} />
        <Route path="/columnas/detallado/6-barras/5-ramas" element={<Varillas6_5 />} />
        <Route path="/columnas/detallado/6-barras" element={<Varillas6 />} />
        <Route path="/columnas/detallado/8-barras/4-ramas" element={<Varillas8_4 />} />
        <Route path="/columnas/detallado/8-barras/5-ramas" element={<Varillas8_5 />} />
        <Route path="/columnas/detallado/8-barras/6-ramas" element={<Varillas8_6 />} />
        <Route path="/columnas/detallado/8-barras/6-ramas/estribo" element={<Varillas8_estribo />} />
        <Route path="/columnas/detallado/8-barras/6-ramas/grapas" element={<Varillas8_grapa />} />
        <Route path="/columnas/detallado/8-barras" element={<Varillas8 />} />
        <Route path="/columnas/detallado/10-barras/1-estribo" element={<Varillas10_1 />} />
        <Route path="/columnas/detallado/10-barras/2-estribo" element={<Varillas10_2 />} />
        <Route path="/columnas/detallado/10-barras" element={<Varillas10 />} />
        <Route path="/columnas/detallado/12-barras/7-ramas" element={<Varillas12_7 />} />
        <Route path="/columnas/detallado/12-barras/6-ramas" element={<Varillas12_6 />} />
        <Route path="/columnas/detallado/12-barras/8-ramas" element={<Varillas12_8 />} />
        <Route path="/columnas/detallado/12-barras/7-ramas/1-estribo" element={<Varillas12_1estribo />} />
        <Route path="/columnas/detallado/12-barras/7-ramas/2-estribo" element={<Varillas12_2estribo />} />
        <Route path="/columnas/detallado/12-barras" element={<Varillas12 />} />
        <Route path="/columnas/detallado/16-barras/6-ramas" element={<Varillas16_6 />} />
        <Route path="/columnas/detallado/16-barras/10-ramas" element={<Varillas16_10 />} />
        <Route path="/columnas/detallado/16-barras" element={<Varillas16 />} />


        <Route path="/viga" element={<Viga />} />
        <Route path="/viga/Conexion-De-Vigas" element={<ConexionV />} />
        <Route path="/viga/Empalme" element={<EmpalmeV />} />
        <Route path="/viga/Armado-De-Acero-Transversal" element={<Armado />} />
        <Route path="/viga/Armado-De-Acero-Transversal" element={<EmpalmeV />} />
        <Route path="/viga/Armado-De-Acero-Transversal/No-Perimetral" element={<NoPerimetral />} />
        <Route path="/viga/Armado-De-Acero-Transversal/No-Perimetral/Estribo-Abierto" element={<EstriboAbierto />} />
        <Route path="/viga/Armado-De-Acero-Transversal/No-Perimetral/Estribo-Cerrado" element={<EstriboCerrado />} />
        <Route path="/viga/Armado-De-Acero-Transversal/Perimetral" element={<Perimetralvg />} />
        <Route path="/viga/Armado-De-Acero-Transversal/Sismico" element={<Sismico />} />

        <Route path="/conexiones" element={<Conexiones />} />
        <Route path="/conexiones/Entre-Piso" element={<EntrePiso />} />
        <Route path="/conexiones/De-Techo" element={<DeTecho />} />

        <Route path="/conexiones/Entre-Piso/interior" element={<Interior />} />
        <Route path="/conexiones/Entre-Piso/exterior" element={<Exterior />} />
        <Route path="/conexiones/Entre-Piso/esquina" element={<Esquina />} />
        <Route path="/conexiones/Entre-Piso/perimetral" element={<Perimetral />} />
        <Route path="/conexiones/Entre-Piso/simple" element={<Simple />} />

        <Route path="/conexiones/De-Techo/interior" element={<Interior2 />} />
        <Route path="/conexiones/De-Techo/exterior" element={<Exterior2 />} />
        <Route path="/conexiones/De-Techo/esquina" element={<Esquina2 />} />
        <Route path="/conexiones/De-Techo/perimetral" element={<Perimetral2 />} />
        <Route path="/conexiones/De-Techo/simple" element={<Simple2 />} />

        <Route path="/muros" element={<Muros />} />
        <Route path="/muros/Remate/Sin-Borde/Refuerzo-U" element={<RefuerzoU />} />
        <Route path="/muros/Remate/Sin-Borde/Refuerzo-Doble" element={<RefuerzoDoble />} />
        <Route path="/muros/Remate/Sin-Borde/Refuerzo-Simple" element={<RefuerzoSimple />} />
        <Route path="/muros/Remate/Sin-Borde" element={<RefuerzoSNBorde />} />
        <Route path="/muros/Remate/Con-Borde" element={<RefuerzoCBorde />} />
        <Route path="/muros/Remate/Con-Borde/9-ramas" element={<Ramas9 />} />
        <Route path="/muros/Remate/Con-Borde/8-ramas" element={<Ramas8 />} />
        <Route path="/muros/Remate/Con-Borde/7-ramas" element={<Ramas7 />} />
        <Route path="/muros/Remate/Con-Borde/7-ramas/Remate-de-acero-a-90" element={<M06 />} />
        <Route path="/muros/Remate/Con-Borde/7-ramas/Remate-de-acero-recto" element={<M07 />} />
        <Route path="/muros/Remate" element={<Remate />} />

        <Route path="/muros/Esquina" element={<Esquina3 />} />
        <Route path="/muros/Esquina/Con-Patin" element={<EsqConPatin />} />
        <Route path="/muros/Esquina/Sin-Borde" element={<EsqSBorde />} />
        <Route path="/muros/Esquina/Con-Borde" element={<EsqCBorde />} />
        <Route path="/muros/Esquina/Simple" element={<EsqSimple />} />
        <Route path="/muros/Esquina/Refuerzo-Lateral" element={<EsqRefuerzo />} />
        <Route path="/muros/Esquina/Refuerzo-Lateral/4-ramas" element={<EsqRefuerzo_4 />} />
        <Route path="/muros/Esquina/Refuerzo-Lateral/5-ramas" element={<EsqRefuerzo_5 />} />

        <Route path="/muros/Conexion-Interior" element={<ConexionIn />} />
        <Route path="/muros/Conexion-Interior/Simple" element={<ConexionInSimple />} />
        <Route path="/muros/Conexion-Interior/Con-Patin" element={<ConexionInConPatin />} />

        <Route path="/muros/Separacion" element={<Separacion />} />
      </Routes>
    </AppContainer>
  );
}