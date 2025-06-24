import { useEffect, useRef } from "react";
import * as THREE from "three";
import { MeshLine, MeshLineMaterial } from "three.meshline"; // Importamos MeshLine
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const ThreeScene = () => {
  const mountRef = useRef(null); // Referencia al contenedor del canvas
  useEffect(() => {
    // Configuración básica de la escena
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Crear un canvas para el fondo con un degradado
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    // Crear un degradado de naranja a azul claro
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(1, "#FFFFFF"); // Blancos
    gradient.addColorStop(0, "#ADD8E6"); // Azul claro

    // Aplicar el degradado al canvas
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Crear una textura de Three.js usando el canvas
    const texture = new THREE.CanvasTexture(canvas);
    scene.background = texture;
    // Configuración de la cámara
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    camera.position.set(7, 7, 7);
    camera.lookAt(0, 0, 0);

    // Habilitar controles interactivos
    const controls = new OrbitControls(camera, renderer.domElement);

    // Configuración de iluminación
    const bright = 1;
    const add_light = (x, y, z) => {
      const directionalLight = new THREE.DirectionalLight("#ffffff", bright);
      directionalLight.position.set(x, y, z);
      scene.add(directionalLight);
    };

    // Añadir luces a la escena
    add_light(10, 10, 10);
    add_light(-10, -10, -10);
    add_light(-10, 10, 10);
    add_light(10, -10, -10);

    // Crear un cubo con materiales transparentes
    const geometry = new THREE.BoxGeometry(5, 4, 5.8);
    const materials = [
      new THREE.MeshLambertMaterial({
        color: 0x919191,
        opacity: 0.5,
        transparent: true,
      }),
      new THREE.MeshLambertMaterial({
        color: 0x222222,
        opacity: 0.5,
        transparent: true,
      }),
      new THREE.MeshLambertMaterial({
        color: 0xf2f2f2,
        opacity: 0.5,
        transparent: true,
      }),
      new THREE.MeshLambertMaterial({
        color: 0x222222,
        opacity: 0.5,
        transparent: true,
      }),
      new THREE.MeshLambertMaterial({
        color: 0x333333,
        opacity: 0.5,
        transparent: true,
      }),
      new THREE.MeshLambertMaterial({
        color: 0x222222,
        opacity: 0.5,
        transparent: true,
      }),
    ];
    const cube = new THREE.Mesh(geometry, materials);
    cube.position.set(0, -0.25, 0.15);
    scene.add(cube);

    // Agregar pilares rojos
    const pillarGeometry = new THREE.CylinderGeometry(0.05, 0.05, 5.25, 610);
    const pillarMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const pillarPositions = [
      [2, 0, 2],
      [1.2, 0, 2],
      [0.4, 0, 2],
      [-0.4, 0, 2],
      [-1.2, 0, 2],
      [-2, 0, 2],

      [2, 0, 1.2],
      [2, 0, 0.4],
      [2, 0, -0.4],
      [2, 0, -1.2],
      [2, 0, -2],

      [-2, 0, 1.2],
      [-2, 0, 0.4],
      [-2, 0, -0.4],
      [-2, 0, -1.2],
      [-2, 0, -2],

      [-2, 0, -2.8],
      [-1.2, 0, -2.8],
      [-0.4, 0, -2.8],
      [0.4, 0, -2.8],
      [1.2, 0, -2.8],
      [2, 0, -2.8],
      [2, 0, -2.8],
    ];
    pillarPositions.forEach(([x, y, z]) => {
      const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
      pillar.position.set(x, y + 0.375, z + 0.5);
      scene.add(pillar);
    });

    /* Crear y agregar Varillas con MeshLine */

    const createMeshLineVarillas2 = (
      points,
      color,
      lineWidth,
      xPosition = 0,
      yPosition = 0,
      zOffset = 0
    ) => {
      const curve = new THREE.CatmullRomCurve3(points, false);
      const curvePoints = curve.getPoints(100);

      // Crear geometría de la línea
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(
        curvePoints
      );

      // Crear MeshLine y material
      const meshLine = new MeshLine();
      meshLine.setGeometry(lineGeometry);

      const meshLineMaterial = new MeshLineMaterial({
        color,
        lineWidth: 0.05,
        sizeAttenuation: 1,
      });

      // Crear malla de la línea y agregarla a la escena
      const lineMesh = new THREE.Mesh(meshLine, meshLineMaterial);
      lineMesh.position.x += xPosition;
      lineMesh.position.y += yPosition;
      lineMesh.position.z += zOffset;
      scene.add(lineMesh);
    };


    /*---------------------------------------------------------------*/
    const rectPointsa2 = [
      new THREE.Vector3(-1.8, 0.5, 1.6),
      new THREE.Vector3(-2.075, 0.5, 2),
      new THREE.Vector3(-2.075, 0.5, 2.075),
      new THREE.Vector3(-1.9, 0.5, 2.075),
      new THREE.Vector3(0.2, 0.5, 2.075),
      new THREE.Vector3(0.4, 0.5, 2.075),
      new THREE.Vector3(0.45, 0.5, 2.075),

      new THREE.Vector3(0.45, 0.5, 2.0),
      new THREE.Vector3(0.45, 0.5, 1.8),
      new THREE.Vector3(0.45, 0.5, 1.6),
      new THREE.Vector3(0.45, 0.5, -2.1),
      new THREE.Vector3(0.45, 0.5, -2.875),

      new THREE.Vector3(0.4, 0.5, -2.875),
      new THREE.Vector3(0.2, 0.5, -2.875),
      new THREE.Vector3(0, 0.5, -2.875),
      new THREE.Vector3(-2, 0.5, -2.875),
      new THREE.Vector3(-2.075, 0.5, -2.875),

      new THREE.Vector3(-2.075, 0.51, -2.8),
      new THREE.Vector3(-2.075, 0.52, -2.0),
      new THREE.Vector3(-2.075, 0.53, -1.8),
      new THREE.Vector3(-2.075, 0.54, 2.0),
      new THREE.Vector3(-2.075, 0.55, 2.075),
      new THREE.Vector3(-2, 0.55, 2.075),
      new THREE.Vector3(-1.6, 0.55, 1.8),
    ];

    /* Varillas Azules 1 */

    for (let i = 0; i < 1; i++) {
      createMeshLineVarillas2(rectPointsa2, 0x0000ff, 0, 0, -2 + (i + 1) * 2, 0.5);
    }

    /*-----------------------------------------------------------------

-----------------------Lineas Azules 2-------------------------

-----------------------------------------------------------------*/
    const rectPointsa12 = [
      new THREE.Vector3(0.2, 0.5, -2.5),
      new THREE.Vector3(0.475, 0.5, -2.8),
      new THREE.Vector3(0.475, 0.5, -2.875),
      new THREE.Vector3(0.4, 0.5, -2.875),
      new THREE.Vector3(0.3, 0.5, -2.875),
      new THREE.Vector3(-0.4, 0.5, -2.875),
      new THREE.Vector3(-2, 0.5, -2.875),
      new THREE.Vector3(-2.075, 0.5, -2.875),

      new THREE.Vector3(-2.075, 0.5, -2.8),
      new THREE.Vector3(-2.075, 0.5, -2),
      new THREE.Vector3(-2.075, 0.5, -1.8),
      new THREE.Vector3(-2.075, 0.5, -1.3),
      new THREE.Vector3(-2.075, 0.5, 1.3),
      new THREE.Vector3(-2.075, 0.5, 1.8),
      new THREE.Vector3(-2.075, 0.5, 2.075),

      new THREE.Vector3(-2.0, 0.5, 2.075),
      new THREE.Vector3(-1.8, 0.5, 2.075),
      new THREE.Vector3(-1.6, 0.5, 2.075),
      new THREE.Vector3(-1.4, 0.5, 2.075),
      new THREE.Vector3(0.2, 0.5, 2.075),
      new THREE.Vector3(0.4, 0.5, 2.075),
      new THREE.Vector3(0.475, 0.5, 2.075),

      new THREE.Vector3(0.475, 0.5, 1.9),
      new THREE.Vector3(0.475, 0.5, 1.8),
      new THREE.Vector3(0.475, 0.51, 1.6),
      new THREE.Vector3(0.475, 0.52, -1.9),
      new THREE.Vector3(0.475, 0.53, -2.1),
      new THREE.Vector3(0.475, 0.54, -2.8),
      new THREE.Vector3(0.475, 0.55, -2.85),
      new THREE.Vector3(0.375, 0.55, -2.85),
      new THREE.Vector3(0, 0.55, -2.7),
    ];

    /* Varillas Azules 1 */

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas2(rectPointsa12, 0x0000ff, 0, 0, -2 + i * 4, 0.5);
    }

    /*-----------------------------------------------------------------

------------------------Lineas Amarillas---------------------------

/*---------------------------------------------------------------*/

    /* Varillas Amarillas 1 */

    for (let i = 0; i < 1; i++) {
      createMeshLineVarillas2(rectPointsa12, 0xFFFF00, 0, 1.6, -2.1 + (i + 1) * 2, 0.5);
    }

    /* Varillas Amarillas 2 */

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas2(rectPointsa2, 0xFFFF00, 0, 1.6, -2.1 + i * 4, 0.5);
    }
    
    /*---------------------------------------------------------------*/
    const rectPointsa3 = [
      new THREE.Vector3(-1.8, 0.5, 1.6),
      new THREE.Vector3(-2.075, 0.5, 2),
      new THREE.Vector3(-2.075, 0.5, 2.075),
      new THREE.Vector3(-1.9, 0.5, 2.075),
      new THREE.Vector3(0.2, 0.5, 2.075),
      new THREE.Vector3(1.95, 0.5, 2.075),
      new THREE.Vector3(2.075, 0.5, 2.075),

      new THREE.Vector3(2.075, 0.5, 2.0),
      new THREE.Vector3(2.075, 0.5, 1.8),
      new THREE.Vector3(2.075, 0.5, 1.6),
      new THREE.Vector3(2.075, 0.5, -0.1),
      new THREE.Vector3(2.075, 0.5, -0.3),
      new THREE.Vector3(2.075, 0.5, -0.475),
      new THREE.Vector3(2.075, 0.5, -1.05),
      new THREE.Vector3(2.075, 0.5, -1.275),

      new THREE.Vector3(1.95, 0.5, -1.275),
      new THREE.Vector3(0.2, 0.5, -1.275),
      new THREE.Vector3(0, 0.5, -1.275),
      new THREE.Vector3(-2, 0.5, -1.275),
      new THREE.Vector3(-2.075, 0.5, -1.275),

      new THREE.Vector3(-2.075, 0.5, -1.25),
      new THREE.Vector3(-2.075, 0.5, -1.05),
      new THREE.Vector3(-2.075, 0.51, -0.45),
      new THREE.Vector3(-2.075, 0.52, -0.2),
      new THREE.Vector3(-2.075, 0.53, -0.1),
      new THREE.Vector3(-2.075, 0.54, 2.0),
      new THREE.Vector3(-2.075, 0.55, 2.075),
      new THREE.Vector3(-2, 0.55, 2.075),
      new THREE.Vector3(-1.6, 0.55, 1.8),
    ];

    /* Varillas Azules 1 */

    for (let i = 0; i < 1; i++) {
      createMeshLineVarillas2(rectPointsa3, 0x00FF00, 0, 0, -2.2 + (i + 1) * 2, -1.1);
    }

    /*-----------------------------------------------------------------

-----------------------Lineas Azules 2-------------------------

-----------------------------------------------------------------*/
    const rectPointsa4 = [
      new THREE.Vector3(0.2, 0.5, -2.5),
      new THREE.Vector3(0.475, 0.5, -2.8),
      new THREE.Vector3(0.475, 0.5, -2.875),
      new THREE.Vector3(0.4, 0.5, -2.875),
      new THREE.Vector3(0.3, 0.5, -2.875),
      new THREE.Vector3(-0.4, 0.5, -2.875),
      new THREE.Vector3(-2, 0.5, -2.875),
      new THREE.Vector3(-2.075, 0.5, -2.875),
      new THREE.Vector3(-3.5, 0.5, -2.875),
      new THREE.Vector3(-3.6, 0.5, -2.875),

      new THREE.Vector3(-3.7, 0.5, -2.8),
      new THREE.Vector3(-3.7, 0.5, -2.7),
      new THREE.Vector3(-3.7, 0.5, -2),
      new THREE.Vector3(-3.7, 0.5, -1.8),
      new THREE.Vector3(-3.7, 0.5, -1.3),
      new THREE.Vector3(-3.7, 0.5, -0.925),
      new THREE.Vector3(-3.7, 0.5, 0.425),
      new THREE.Vector3(-3.7, 0.5, 0.455),

      new THREE.Vector3(-3.6, 0.5, 0.46),
      new THREE.Vector3(-3.5, 0.5, 0.46),
      new THREE.Vector3(-2.0, 0.5, 0.46),
      new THREE.Vector3(-1.8, 0.5, 0.46),
      new THREE.Vector3(-1.6, 0.5, 0.46),
      new THREE.Vector3(-1.4, 0.5, 0.46),
      new THREE.Vector3(0.2, 0.5, 0.46),
      new THREE.Vector3(0.4, 0.5, 0.46),
      new THREE.Vector3(0.475, 0.5, 0.46),

      new THREE.Vector3(0.475, 0.5, 0.455),
      new THREE.Vector3(0.475, 0.5, 0.425),
      new THREE.Vector3(0.475, 0.51, 0.325),
      new THREE.Vector3(0.475, 0.52, -1.9),
      new THREE.Vector3(0.475, 0.53, -2.1),
      new THREE.Vector3(0.475, 0.54, -2.8),
      new THREE.Vector3(0.475, 0.55, -2.85),
      new THREE.Vector3(0.375, 0.55, -2.85),
      new THREE.Vector3(0, 0.55, -2.7),
    ];

    /* Varillas Azules 1 */

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas2(rectPointsa4, 0x00ff00, 0, 1.6, -2.2 + i * 4, 0.525);
    }

    /*-----------------------------------------------------------------

------------------------Lineas Amarillas---------------------------

/*---------------------------------------------------------------*/

    /* Varillas Amarillas 1 */

    for (let i = 0; i < 1; i++) {
      createMeshLineVarillas2(rectPointsa4, 0xca5cdd, 0, 1.6, -2.3 + (i + 1) * 2, 2.1);
    }

    /* Varillas Amarillas 2 */

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas2(rectPointsa3, 0xca5cdd, 0, 0, -2.3 + i * 4, 0.5);
    }

    /*---------------------------------------------------------------*/

    // Función de renderizado
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (mountRef && mountRef.current) {
        mountRef.current.removeChild(mountRef.current.childNodes[0]);
        renderer.dispose();
      }
    };
  }, []);

  return (
    <>
      <div
        ref={mountRef}
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      />
    </>
  );
};

export default ThreeScene;
