import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { MeshLine, MeshLineMaterial } from "three.meshline";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const ThreeScene = () => {
  const mountRef = useRef(null);
  const [guiVisible, setGuiVisible] = useState(true);
  const [controlsMode, setControlsMode] = useState("orbit");
  const [helpers, setHelpers] = useState({
    axes: false,
    grid: false,
  });

  // Referencias Three.js
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const rendererRef = useRef(null);
  const cubeRef = useRef(null);
  const pillarsRef = useRef([]);
  const linesRef = useRef([]);
  const helpersRef = useRef({
    axes: null,
    grid: null,
  });

  const createMeshLineVarillas2 = (points, color, x, y, z) => {
    const curve = new THREE.CatmullRomCurve3(points, false);
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(100));
    
    const meshLine = new MeshLine();
    meshLine.setGeometry(lineGeometry);
    
    const material = new MeshLineMaterial({
      color,
      lineWidth: 0.05,
      sizeAttenuation: 1
    });

    const lineMesh = new THREE.Mesh(meshLine, material);
    lineMesh.position.set(x, y, z);
    sceneRef.current.add(lineMesh);
    linesRef.current.push(lineMesh);
  };

  const setupControls = (mode) => {
    const controls = controlsRef.current;
    if (!controls) return;

    switch (mode) {
      case "orbit":
        controls.mouseButtons = {
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.PAN
        };
        break;
      case "pan":
        controls.mouseButtons = {
          LEFT: THREE.MOUSE.PAN,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.ROTATE
        };
        break;
      default:
        break;
    }
    controls.update();
  };

  const setupScene = () => {
    const scene = sceneRef.current;
    while(scene.children.length > 0) scene.remove(scene.children[0]);

    // Cubo principal
    const geometry = new THREE.BoxGeometry(3.5, 2.5, 2.5);
    const materials = [
      new THREE.MeshLambertMaterial({ color: 0x919191, opacity: 0.5, transparent: true }),
      new THREE.MeshLambertMaterial({ color: 0x222222, opacity: 0.5, transparent: true }),
      new THREE.MeshLambertMaterial({ color: 0xf2f2f2, opacity: 0.5, transparent: true }),
      new THREE.MeshLambertMaterial({ color: 0x222222, opacity: 0.5, transparent: true }),
      new THREE.MeshLambertMaterial({ color: 0x333333, opacity: 0.5, transparent: true }),
      new THREE.MeshLambertMaterial({ color: 0x222222, opacity: 0.5, transparent: true }),
    ];
    cubeRef.current = new THREE.Mesh(geometry, materials);
    cubeRef.current.position.set(0, 0.6, 0.5);
    scene.add(cubeRef.current);

    // Pilares
    const pillarGeometry = new THREE.CylinderGeometry(0.025, 0.025, 3.2, 50);
    const pillarMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const pillarPositions = [
      [0.5, 0.95, -0.5], [0.5, 0.95, 1.5], [-1.5, 0.95, 1.5], [-1.5, 0.95, -0.5],
      [-0.4952, 0.95, -0.4952], [-0.4952, 0.95, 1.4952], [-1.4952, 0.95, 0.4952],
      [1.4952, 0.95, 0.4952], [1.4952, 0.95, -0.4952], [1.4952, 0.95, 1.4952]
    ];

    pillarsRef.current = pillarPositions.map(([x, y, z]) => {
      const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
      pillar.position.set(x, y, z);
      scene.add(pillar);
      return pillar;
    });

    // Puntos para las varillas
    const rectPointsa2 = [
      new THREE.Vector3(-1.25, 0.5, 1.35),
      new THREE.Vector3(-1.4, 0.5, 1.54),
      new THREE.Vector3(-1.54, 0.5, 1.54),
      new THREE.Vector3(-1.538, 0.5, 1.275),
      new THREE.Vector3(-1.536, 0.5, 1.025),
      new THREE.Vector3(-1.534, 0.5, 0.775),
      new THREE.Vector3(-1.532, 0.5, 0.525),
      new THREE.Vector3(-1.53, 0.5, 0.275),
      new THREE.Vector3(-1.528, 0.5, 0.025),
      new THREE.Vector3(-1.526, 0.5, -0.275),
      new THREE.Vector3(-1.524, 0.5, -0.525),
      new THREE.Vector3(-1.275, 0.5, -0.525),
      new THREE.Vector3(-1.025, 0.5, -0.525),
      new THREE.Vector3(-0.775, 0.5, -0.525),
      new THREE.Vector3(-0.525, 0.5, -0.525),
      new THREE.Vector3(-0.275, 0.5, -0.525),
      new THREE.Vector3(1.025, 0.5, -0.525),
      new THREE.Vector3(1.275, 0.5, -0.525),
      new THREE.Vector3(1.525, 0.5025, -0.525),
      new THREE.Vector3(1.525, 0.505, -0.525),
      new THREE.Vector3(1.525, 0.5075, -0.275),
      new THREE.Vector3(1.525, 0.51, 0.025),
      new THREE.Vector3(1.525, 0.5125, 0.275),
      new THREE.Vector3(1.525, 0.515, 0.525),
      new THREE.Vector3(1.525, 0.5175, 0.775),
      new THREE.Vector3(1.525, 0.52, 1.025),
      new THREE.Vector3(1.525, 0.5225, 1.275),
      new THREE.Vector3(1.525, 0.525, 1.524),
      new THREE.Vector3(1.275, 0.5275, 1.526),
      new THREE.Vector3(1.025, 0.53, 1.528),
      new THREE.Vector3(-0.275, 0.5325, 1.53),
      new THREE.Vector3(-0.525, 0.535, 1.532),
      new THREE.Vector3(-0.775, 0.5375, 1.534),
      new THREE.Vector3(-1.025, 0.54, 1.536),
      new THREE.Vector3(-1.275, 0.5425, 1.538),
      new THREE.Vector3(-1.54, 0.545, 1.54),
      new THREE.Vector3(-1.54, 0.5475, 1.44),
      new THREE.Vector3(-1.35, 0.55, 1.25),
    ];

    const rectPoints = [
      new THREE.Vector3(1.2, 0.5, -0.325),
      new THREE.Vector3(1.4, 0.5, -0.525),
      new THREE.Vector3(1.555, 0.5, -0.525),
      new THREE.Vector3(1.55, 0.5, -0.275),
      new THREE.Vector3(1.545, 0.5, 0.025),
      new THREE.Vector3(1.54, 0.5, 0.275),
      new THREE.Vector3(1.535, 0.5, 0.525),
      new THREE.Vector3(1.53, 0.5, 0.775),
      new THREE.Vector3(1.525, 0.5, 1.025),
      new THREE.Vector3(1.525, 0.5, 1.275),
      new THREE.Vector3(1.525, 0.5, 1.525),
      new THREE.Vector3(1.275, 0.5, 1.525),
      new THREE.Vector3(1.025, 0.5025, 1.525),
      new THREE.Vector3(-0.275, 0.505, 1.525),
      new THREE.Vector3(-0.525, 0.5075, 1.525),
      new THREE.Vector3(-0.775, 0.51, 1.525),
      new THREE.Vector3(-1.025, 0.5125, 1.525),
      new THREE.Vector3(-1.275, 0.515, 1.525),
      new THREE.Vector3(-1.525, 0.5175, 1.525),
      new THREE.Vector3(-1.525, 0.52, 1.275),
      new THREE.Vector3(-1.525, 0.5225, 1.025),
      new THREE.Vector3(-1.525, 0.525, 0.775),
      new THREE.Vector3(-1.525, 0.5275, 0.525),
      new THREE.Vector3(-1.525, 0.53, 0.275),
      new THREE.Vector3(-1.525, 0.5325, 0.025),
      new THREE.Vector3(-1.525, 0.535, -0.275),
      new THREE.Vector3(-1.525, 0.5375, -0.525),
      new THREE.Vector3(-1.275, 0.54, -0.525),
      new THREE.Vector3(-1.025, 0.5425, -0.525),
      new THREE.Vector3(-0.775, 0.545, -0.525),
      new THREE.Vector3(-0.525, 0.5475, -0.528),
      new THREE.Vector3(-0.275, 0.55, -0.525),
      new THREE.Vector3(1.025, 0.55, -0.525),
      new THREE.Vector3(1.275, 0.55, -0.525),
      new THREE.Vector3(1.525, 0.55, -0.525),
      new THREE.Vector3(1.525, 0.55, -0.400),
      new THREE.Vector3(1.325, 0.55, -0.2),
    ];

    const rectPoints2 = [
      new THREE.Vector3(-0.7, 0.495, -0.36),
      new THREE.Vector3(-0.5, 0.495, -0.56),
      new THREE.Vector3(-0.47, 0.495, -0.56),
      new THREE.Vector3(-0.47, 0.495, -0.275),
      new THREE.Vector3(-0.47, 0.4975, 0.025),
      new THREE.Vector3(-0.47, 0.5, 0.275),
      new THREE.Vector3(-0.47, 0.5, 0.525),
      new THREE.Vector3(-0.47, 0.5, 0.775),
      new THREE.Vector3(-0.47, 0.5, 1.025),
      new THREE.Vector3(-0.47, 0.5, 1.275),
      new THREE.Vector3(-0.47, 0.5, 1.54),
      new THREE.Vector3(-0.775, 0.5, 1.525),
      new THREE.Vector3(-0.725, 0.5, 1.525),
      new THREE.Vector3(-0.775, 0.5, 1.525),
      new THREE.Vector3(-0.525, 0.5, 1.525),
      new THREE.Vector3(-0.775, 0.5, 1.525),
      new THREE.Vector3(-1.025, 0.5, 1.525),
      new THREE.Vector3(-1.275, 0.5, 1.525),
      new THREE.Vector3(-1.525, 0.5, 1.525),
      new THREE.Vector3(-1.525, 0.5, 1.275),
      new THREE.Vector3(-1.525, 0.505, 1.025),
      new THREE.Vector3(-1.525, 0.51, 0.775),
      new THREE.Vector3(-1.525, 0.515, 0.525),
      new THREE.Vector3(-1.525, 0.52, 0.275),
      new THREE.Vector3(-1.525, 0.525, 0.025),
      new THREE.Vector3(-1.525, 0.53, -0.275),
      new THREE.Vector3(-1.525, 0.535, -0.54),
      new THREE.Vector3(-1.275, 0.54, -0.54),
      new THREE.Vector3(-1.025, 0.545, -0.54),
      new THREE.Vector3(-0.775, 0.55, -0.54),
      new THREE.Vector3(-0.525, 0.55, -0.54),
      new THREE.Vector3(-0.44, 0.55, -0.54),
      new THREE.Vector3(-0.44, 0.55, -0.49),
      new THREE.Vector3(-0.64, 0.55, -0.29),
    ];

    const rectPointsamarillas2 = [
      new THREE.Vector3(-1.25, 0.495, 1.35),
      new THREE.Vector3(-1.45, 0.495, 1.56),
      new THREE.Vector3(-1.538, 0.495, 1.56),
      new THREE.Vector3(-1.538, 0.4975, 1.275),
      new THREE.Vector3(-1.536, 0.5, 1.025),
      new THREE.Vector3(-1.534, 0.5, 0.775),
      new THREE.Vector3(-1.532, 0.5, 0.525),
      new THREE.Vector3(-1.53, 0.5, 0.275),
      new THREE.Vector3(-1.528, 0.5, 0.025),
      new THREE.Vector3(-1.526, 0.5, -0.275),
      new THREE.Vector3(-1.524, 0.5025, -0.525),
      new THREE.Vector3(-1.275, 0.505, -0.525),
      new THREE.Vector3(-1.025, 0.5075, -0.525),
      new THREE.Vector3(-0.8, 0.51, -0.525),
      new THREE.Vector3(-0.5, 0.5125, -0.525),
      new THREE.Vector3(-0.46, 0.515, -0.525),
      new THREE.Vector3(-0.46, 0.5175, -0.525),
      new THREE.Vector3(-0.46, 0.52, -0.275),
      new THREE.Vector3(-0.46, 0.5225, 0.025),
      new THREE.Vector3(-0.46, 0.525, 0.275),
      new THREE.Vector3(-0.46, 0.5275, 0.525),
      new THREE.Vector3(-0.46, 0.53, 0.775),
      new THREE.Vector3(-0.46, 0.5325, 1.025),
      new THREE.Vector3(-0.46, 0.535, 1.275),
      new THREE.Vector3(-0.46, 0.5375, 1.524),
      new THREE.Vector3(-0.5, 0.54, 1.532),
      new THREE.Vector3(-0.8, 0.5425, 1.534),
      new THREE.Vector3(-1.025, 0.545, 1.536),
      new THREE.Vector3(-1.275, 0.5475, 1.538),
      new THREE.Vector3(-1.54, 0.55, 1.54),
      new THREE.Vector3(-1.54, 0.5525, 1.49),
      new THREE.Vector3(-1.34, 0.55, 1.20),
    ];

    const rectPoints3 = [
      new THREE.Vector3(1.33, 0.51, 0.3),
      new THREE.Vector3(1.53, 0.51, 0.47),
      new THREE.Vector3(1.53, 0.51, 0.52),
      new THREE.Vector3(1.03, 0.51, 0.52),
      new THREE.Vector3(0.53, 0.51, 0.52),
      new THREE.Vector3(-0.53, 0.51, 0.52),
      new THREE.Vector3(-1.03, 0.51, 0.52),
      new THREE.Vector3(-1.53, 0.51, 0.52),
      new THREE.Vector3(-1.53, 0.51, 0.47),
      new THREE.Vector3(-1.33, 0.51, 0.3),
    ];

    // Crear todas las varillas
    createMeshLineVarillas2(rectPoints, 0x0000ff, 0, 1.5, 0);
    createMeshLineVarillas2(rectPointsa2, 0x0000ff, 0, 0.5, 0);
    createMeshLineVarillas2(rectPoints, 0x0000ff, 0, -0.5, 0);
    createMeshLineVarillas2(rectPointsamarillas2, 0xffdb58, 1, 1.6, 0);
    createMeshLineVarillas2(rectPoints2, 0xffdb58, 1, 0.6, 0);
    createMeshLineVarillas2(rectPointsamarillas2, 0xffdb58, 1, -0.4, 0);
    createMeshLineVarillas2(rectPoints3, 0x00ff00, 0, 1.7, 0);
    createMeshLineVarillas2(rectPoints3, 0x00ff00, 0, 0.7, 0);
    createMeshLineVarillas2(rectPoints3, 0x00ff00, 0, -0.3, 0);

    // Helpers
    helpersRef.current.axes = new THREE.AxesHelper(5);
    helpersRef.current.axes.visible = helpers.axes;
    scene.add(helpersRef.current.axes);
    
    helpersRef.current.grid = new THREE.GridHelper(10, 10);
    helpersRef.current.grid.visible = helpers.grid;
    scene.add(helpersRef.current.grid);
  };

  useEffect(() => {
    const scene = sceneRef.current;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    // Configurar cámara
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    camera.position.set(5.5, 5.5, 5.5);
    camera.lookAt(2.5, 2.5, 2.5);
    cameraRef.current = camera;

    // Controles
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = true;
    controlsRef.current = controls;
    setupControls(controlsMode);

    // Configurar escena
    setupScene();

    // Fondo
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(1, "#FFFFFF");
    gradient.addColorStop(0, "#ADD8E6");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    scene.background = new THREE.CanvasTexture(canvas);

    // Iluminación
    const addLight = (x, y, z) => {
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(x, y, z);
      scene.add(light);
    };
    addLight(10, 10, 10);
    addLight(-10, -10, -10);
    addLight(-10, 10, 10);
    addLight(10, -10, -10);

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Event listeners
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    mountRef.current.appendChild(renderer.domElement);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    setupControls(controlsMode);
  }, [controlsMode]);

  const toggleGUI = () => setGuiVisible(!guiVisible);
  
  const resetCamera = () => {
    cameraRef.current.position.set(5.5, 5.5, 5.5);
    cameraRef.current.lookAt(2.5, 2.5, 2.5);
    controlsRef.current.target.set(2.5, 2.5, 2.5);
    controlsRef.current.update();
  };

  const toggleHelper = (helper) => {
    setHelpers(prev => {
      const newState = { ...prev, [helper]: !prev[helper] };
      if (helpersRef.current[helper]) {
        helpersRef.current[helper].visible = newState[helper];
      }
      return newState;
    });
  };

  const fitToView = () => {
    const box = new THREE.Box3().setFromObject(cubeRef.current);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = cameraRef.current.fov * (Math.PI / 180);
    const cameraZ = Math.abs((maxDim / 2) / Math.tan(fov / 2)) * 1.5;
    
    cameraRef.current.position.copy(center);
    cameraRef.current.position.z += cameraZ;
    controlsRef.current.target.copy(center);
    controlsRef.current.update();
  };

  return (
    <>
      <div ref={mountRef} style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        {guiVisible && (
          <div style={styles.guiContainer}>
            <div style={styles.guiPanel}>
              <h3 style={styles.panelTitle}>Controles</h3>
              
              <div style={styles.controlsGroup}>
                <button 
                  style={controlsMode === 'orbit' ? styles.activeButton : styles.button}
                  onClick={() => setControlsMode('orbit')}
                >
                  Órbita
                </button>
                <button
                  style={controlsMode === 'pan' ? styles.activeButton : styles.button}
                  onClick={() => setControlsMode('pan')}
                >
                  Encuadre
                </button>
              </div>

              <div style={styles.section}>
                <button style={styles.button} onClick={resetCamera}>
                  ↻ Resetear Vista
                </button>
                <button style={styles.button} onClick={fitToView}>
                  ⌂ Centrar Modelo
                </button>
              </div>

              <div style={styles.section}>
                <label style={styles.label}>
                  <input
                    type="checkbox"
                    checked={helpers.grid}
                    onChange={() => toggleHelper('grid')}
                  />
                  Cuadrícula
                </label>
              </div>
            </div>
          </div>
        )}
        
        <button 
          style={styles.toggleButton}
          onClick={toggleGUI}
          title={guiVisible ? "Ocultar controles" : "Mostrar controles"}
        >
          {guiVisible ? '◄ Ocultar' : 'Controles ►'}
        </button>
      </div>
    </>
  );
};

const styles = {
  guiContainer: {
    position: 'fixed',
    top: '70px',
    left: '15px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: '10px',
    padding: '15px',
    color: 'white',
    minWidth: '220px',
    backdropFilter: 'blur(5px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    zIndex: 1000
  },
  guiPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  panelTitle: {
    margin: '0 0 10px 0',
    fontSize: '1.1rem',
    color: '#4CAF50'
  },
  controlsGroup: {
    display: 'flex',
    gap: '8px',
    marginBottom: '15px'
  },
  button: {
    padding: '10px',
    backgroundColor: '#2196F3',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontSize: '0.9rem',
    flex: 1,
    ':hover': {
      backgroundColor: '#1976D2'
    }
  },
  activeButton: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontSize: '0.9rem',
    flex: 1
  },
  toggleButton: {
    position: 'fixed',
    top: '20px',
    left: '15px',
    zIndex: 1001,
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontSize: '0.9rem',
    ':hover': {
      backgroundColor: '#45a049',
      transform: 'translateX(5px)'
    }
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    userSelect: 'none'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '15px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    paddingTop: '15px'
  }
};

export default ThreeScene;