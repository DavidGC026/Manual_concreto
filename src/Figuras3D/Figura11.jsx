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
    camera.position.set(5.5, 5.5, 5.5);
    camera.lookAt(2.5, 2.5, 2.5);

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
    const geometry = new THREE.BoxGeometry(4, 4, 4);
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
    cube.position.set(0, 0, 0);
    scene.add(cube);

    // Agregar pilares rojos
    const pillarGeometry = new THREE.CylinderGeometry(0.05, 0.05, 5, 50);
    const pillarMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const pillarPositions = [
      [1.5, 0, 0.5],
      [1.5, 0, 1.5],
      [0.5, 0, 1.5],
      [-0.5, 0, 1.5],
      [-1.5, 0, 1.5],
      [-1.5, 0, 0.5],
      [-1.5, 0, -0.5],
      [-1.5, 0, -1.5],
      [-0.5, 0, -1.5],
      [0.5, 0, -1.5],
      [1.5, 0, -1.5],
      [1.5, 0, -0.5],
    ];
    pillarPositions.forEach(([x, y, z]) => {
      const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
      pillar.position.set(x, y + 0.5, z);
      scene.add(pillar);
    });

    // Crear y agregar Varillas con MeshLine
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

    const rectPointsa2 = [
      new THREE.Vector3(1.25, 0.5, -1.37),
      new THREE.Vector3(1.5, 0.5, -1.57),
      new THREE.Vector3(1.57, 0.5, -1.57),
      new THREE.Vector3(1.57, 0.5, -1.25),
      new THREE.Vector3(1.57, 0.5, -1),
      new THREE.Vector3(1.57, 0.5, -0.75),
      new THREE.Vector3(1.57, 0.5, -0.5),
      new THREE.Vector3(1.57, 0.5, -0.25),
      new THREE.Vector3(1.57, 0.5, 0),
      new THREE.Vector3(1.57, 0.5, 0.25),
      new THREE.Vector3(1.57, 0.5, 0.5),
      new THREE.Vector3(1.57, 0.5, 1),
      new THREE.Vector3(1.57, 0.5, 1.25),
      new THREE.Vector3(1.57, 0.5, 1.57),

      new THREE.Vector3(1.25, 0.5, 1.57),
      new THREE.Vector3(1, 0.5, 1.57),
      new THREE.Vector3(0.75, 0.5, 1.57),
      new THREE.Vector3(0.5, 0.5, 1.57),
      new THREE.Vector3(0.25, 0.5, 1.57),
      new THREE.Vector3(0, 0.5, 1.57),
      new THREE.Vector3(-0.25, 0.5, 1.57),
      new THREE.Vector3(-0.5, 0.5, 1.57),
      new THREE.Vector3(-0.75, 0.5, 1.57),
      new THREE.Vector3(-1, 0.5, 1.57),
      new THREE.Vector3(-1.25, 0.5, 1.57),
      new THREE.Vector3(-1.57, 0.5, 1.57),

      new THREE.Vector3(-1.57, 0.5, 1.25),
      new THREE.Vector3(-1.57, 0.5, 1),
      new THREE.Vector3(-1.57, 0.5, 0.75),
      new THREE.Vector3(-1.57, 0.5, 0.5),
      new THREE.Vector3(-1.57, 0.5, 0.25),
      new THREE.Vector3(-1.57, 0.5, 0),
      new THREE.Vector3(-1.57, 0.5, -0.25),
      new THREE.Vector3(-1.57, 0.5, -0.5),
      new THREE.Vector3(-1.57, 0.5, -1),
      new THREE.Vector3(-1.57, 0.5, -1.25),
      new THREE.Vector3(-1.57, 0.5, -1.57),

      new THREE.Vector3(-1.25, 0.5, -1.57),
      new THREE.Vector3(-1, 0.5, -1.57),
      new THREE.Vector3(-0.75, 0.5, -1.57),
      new THREE.Vector3(-0.5, 0.5, -1.57),
      new THREE.Vector3(-0.25, 0.5, -1.57),
      new THREE.Vector3(-0, 0.5, -1.57),
      new THREE.Vector3(0.25, 0.51, -1.57),
      new THREE.Vector3(0.5, 0.52, -1.57),
      new THREE.Vector3(0.75, 0.525, -1.57),
      new THREE.Vector3(1, 0.53, -1.57),
      new THREE.Vector3(1.25, 0.535, -1.57),
      new THREE.Vector3(1.57, 0.54, -1.57),
      new THREE.Vector3(1.6, 0.5475, -1.57),
      new THREE.Vector3(1.6, 0.5475, -1.5),
      new THREE.Vector3(1.35, 0.5475, -1.3),
    ];

    for (let i = 0; i < 1; i++) {
      createMeshLineVarillas2(rectPointsa2, 0x0000ff, 0, 0, 0.2 + i * 2, 0);
    }

    // Crear líneas con esquinas curvas
    const rectPoints = [
      new THREE.Vector3(-1.25, 0.5, 1.4),
      new THREE.Vector3(-1.5, 0.5, 1.6),
      new THREE.Vector3(-1.57, 0.5, 1.6),
      new THREE.Vector3(-1.57, 0.5, 1.57),
      new THREE.Vector3(-1.57, 0.5, 1.25),
      new THREE.Vector3(-1.57, 0.5, 1),
      new THREE.Vector3(-1.57, 0.5, 0.75),
      new THREE.Vector3(-1.57, 0.5, 0.5),
      new THREE.Vector3(-1.57, 0.5, 0.25),
      new THREE.Vector3(-1.57, 0.5, 0),
      new THREE.Vector3(-1.57, 0.5, -0.25),
      new THREE.Vector3(-1.57, 0.5, -0.5),
      new THREE.Vector3(-1.57, 0.5, -1),
      new THREE.Vector3(-1.57, 0.5, -1.25),
      new THREE.Vector3(-1.57, 0.5, -1.57),

      new THREE.Vector3(-1.50, 0.5, -1.57),
      new THREE.Vector3(-1.25, 0.5, -1.57),
      new THREE.Vector3(-1, 0.5, -1.57),
      new THREE.Vector3(-0.75, 0.5, -1.57),
      new THREE.Vector3(-0.5, 0.5, -1.57),
      new THREE.Vector3(-0.25, 0.5, -1.57),
      new THREE.Vector3(-0, 0.5, -1.57),
      new THREE.Vector3(0.25, 0.5, -1.57),
      new THREE.Vector3(0.5, 0.5, -1.57),
      new THREE.Vector3(0.75, 0.5, -1.57),
      new THREE.Vector3(1, 0.5, -1.57),
      new THREE.Vector3(1.25, 0.5, -1.57),
      new THREE.Vector3(1.57, 0.5, -1.57),

      new THREE.Vector3(1.57, 0.5, -1.57),
      new THREE.Vector3(1.57, 0.5, -1.25),
      new THREE.Vector3(1.57, 0.5, -1),
      new THREE.Vector3(1.57, 0.5, -0.75),
      new THREE.Vector3(1.57, 0.5, -0.5),
      new THREE.Vector3(1.57, 0.5, -0.25),
      new THREE.Vector3(1.57, 0.5, 0),
      new THREE.Vector3(1.57, 0.5, 0.25),
      new THREE.Vector3(1.57, 0.5, 0.5),
      new THREE.Vector3(1.57, 0.5, 1),
      new THREE.Vector3(1.57, 0.5, 1.25),
      new THREE.Vector3(1.57, 0.5, 1.57),

      new THREE.Vector3(1.25, 0.5, 1.57),
      new THREE.Vector3(1, 0.5, 1.57),
      new THREE.Vector3(0.75, 0.5, 1.57),
      new THREE.Vector3(0.5, 0.5, 1.57),
      new THREE.Vector3(0.25, 0.5, 1.57),
      new THREE.Vector3(0, 0.51, 1.57),
      new THREE.Vector3(-0.25, 0.52, 1.57),
      new THREE.Vector3(-0.5, 0.525, 1.57),
      new THREE.Vector3(-0.75, 0.53, 1.57),
      new THREE.Vector3(-1, 0.535, 1.57),
      new THREE.Vector3(-1.25, 0.54, 1.57),
      new THREE.Vector3(-1.6, 0.5475, 1.57),
      new THREE.Vector3(-1.6, 0.5475, 1.5),
      new THREE.Vector3(-1.35, 0.5475, 1.3),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas2(rectPoints, 0x0000ff, 0, 0, -1.5 + i * 3.2, 0);
    }

    // Crear líneas con esquinas curvas
    const rectPoints2 = [

      new THREE.Vector3(-1.22, 0.5, 0.37),
      new THREE.Vector3(-1.47, 0.5, 0.57),
      new THREE.Vector3(-1.57, 0.5, 0.57),
      new THREE.Vector3(-1.57, 0.5, 0.25),
      new THREE.Vector3(-1.57, 0.5, 0),
      new THREE.Vector3(-1.57, 0.5, -0.25),
      new THREE.Vector3(-1.57, 0.5, -0.57),

      new THREE.Vector3(-1.25, 0.5, -0.57),
      new THREE.Vector3(-1, 0.5, -0.57),
      new THREE.Vector3(-0.5, 0.5, -0.57),
      new THREE.Vector3(0, 0.5, -0.57),
      new THREE.Vector3(0.25, 0.5, -0.57),
      new THREE.Vector3(0.5, 0.5, -0.57),
      new THREE.Vector3(1, 0.5, -0.57),
      new THREE.Vector3(1.25, 0.5, -0.57),
      new THREE.Vector3(1.57, 0.5, -0.57),

      new THREE.Vector3(1.57, 0.5, -0.53),
      new THREE.Vector3(1.57, 0.5, -0.25),
      new THREE.Vector3(1.57, 0.5, 0),
      new THREE.Vector3(1.57, 0.5, 0.25),
      new THREE.Vector3(1.57, 0.5, 0.57),

      new THREE.Vector3(1.53, 0.5, 0.57),
      new THREE.Vector3(1.25, 0.5, 0.57),
      new THREE.Vector3(1, 0.5, 0.57),
      new THREE.Vector3(0.5, 0.5, 0.57),
      new THREE.Vector3(0, 0.51, 0.57),
      new THREE.Vector3(-0.25, 0.52, 0.57),
      new THREE.Vector3(-0.5, 0.53, 0.57),
      new THREE.Vector3(-1, 0.535, 0.57),
      new THREE.Vector3(-1.25, 0.54, 0.57),
      new THREE.Vector3(-1.57, 0.5475, 0.57),
      new THREE.Vector3(-1.57, 0.5475, 0.47),
      new THREE.Vector3(-1.32, 0.5475, 0.27),
    ];

    for (let i = 0; i < 1; i++) {
      createMeshLineVarillas2(rectPoints2, 0xffdb58, 0, 0, 0.275 + i * 2, 0);
    }

    const rectPointsamarillas2 = [
      new THREE.Vector3(1.2, 0.5, -0.3),
      new THREE.Vector3(1.56, 0.5, -0.6),
      new THREE.Vector3(1.57, 0.5, -0.25),
      new THREE.Vector3(1.57, 0.5, 0),
      new THREE.Vector3(1.57, 0.5, 0.25),
      new THREE.Vector3(1.57, 0.5, 0.57),

      new THREE.Vector3(1.25, 0.5, 0.57),
      new THREE.Vector3(1, 0.5, 0.57),
      new THREE.Vector3(0.5, 0.5, 0.57),
      new THREE.Vector3(0, 0.5, 0.57),
      new THREE.Vector3(-0.25, 0.5, 0.57),
      new THREE.Vector3(-0.5, 0.5, 0.57),
      new THREE.Vector3(-1, 0.5, 0.57),
      new THREE.Vector3(-1.25, 0.5, 0.57),
      new THREE.Vector3(-1.57, 0.5, 0.57),

      new THREE.Vector3(-1.57, 0.5, 0.25),
      new THREE.Vector3(-1.57, 0.5, 0),
      new THREE.Vector3(-1.57, 0.5, -0.25),
      new THREE.Vector3(-1.57, 0.5, -0.57),

      new THREE.Vector3(-1.25, 0.5, -0.57),
      new THREE.Vector3(-1, 0.5, -0.57),
      new THREE.Vector3(-0.5, 0.51, -0.57),
      new THREE.Vector3(0, 0.52, -0.57),
      new THREE.Vector3(0.25, 0.53, -0.57),
      new THREE.Vector3(0.5, 0.535, -0.57),
      new THREE.Vector3(1, 0.54, -0.57),
      new THREE.Vector3(1.25, 0.5475, -0.57),
      new THREE.Vector3(1.6, 0.5475, -0.57),
      new THREE.Vector3(1.3, 0.5475, -0.2),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas2(rectPointsamarillas2, 0xffdb58, 0, 0, -1.425 + i * 3.2, 0);
    }

    // Crear líneas con esquinas curvas
    const rectPoints3 = [
      new THREE.Vector3(-0.25, 0.5, 1.4),
      new THREE.Vector3(-0.5, 0.5, 1.6),
      new THREE.Vector3(-0.57, 0.5, 1.6),
      new THREE.Vector3(-0.57, 0.5, 1.25),
      new THREE.Vector3(-0.57, 0.5, 1),
      new THREE.Vector3(-0.57, 0.5, 0.75),
      new THREE.Vector3(-0.57, 0.5, 0.5),
      new THREE.Vector3(-0.57, 0.5, 0.25),
      new THREE.Vector3(-0.57, 0.5, 0),
      new THREE.Vector3(-0.57, 0.5, -0.25),
      new THREE.Vector3(-0.57, 0.5, -0.5),
      new THREE.Vector3(-0.57, 0.5, -0.75),
      new THREE.Vector3(-0.57, 0.5, -1),
      new THREE.Vector3(-0.57, 0.5, -1.25),
      new THREE.Vector3(-0.57, 0.5, -1.57),

      new THREE.Vector3(-0.25, 0.5, -1.6),
      new THREE.Vector3(0, 0.5, -1.6),
      new THREE.Vector3(0.25, 0.5, -1.6),
      new THREE.Vector3(0.6, 0.5, -1.6),

      new THREE.Vector3(0.57, 0.5, -1.25),
      new THREE.Vector3(0.57, 0.5, -1),
      new THREE.Vector3(0.57, 0.5, -0.75),
      new THREE.Vector3(0.57, 0.5, -0.5),
      new THREE.Vector3(0.57, 0.5, -0.25),
      new THREE.Vector3(0.57, 0.5, -0),
      new THREE.Vector3(0.57, 0.5, 0.25),
      new THREE.Vector3(0.57, 0.5, 0.5),
      new THREE.Vector3(0.57, 0.51, 0.75),
      new THREE.Vector3(0.57, 0.52, 1),
      new THREE.Vector3(0.57, 0.525, 1.25),
      new THREE.Vector3(0.57, 0.53, 1.6),

      new THREE.Vector3(0.25, 0.535, 1.6),
      new THREE.Vector3(0, 0.54, 1.6),
      new THREE.Vector3(-0.25, 0.5475, 1.6),
      new THREE.Vector3(-0.6, 0.5475, 1.57),
      new THREE.Vector3(-0.6, 0.5475, 1.5),
      new THREE.Vector3(-0.35, 0.5475, 1.25),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas2(rectPoints3, 0x00ff00, 0, 0, -1.35 + i * 3.2, 0);
    }

    const rectPointsVERDE3 = [
      new THREE.Vector3(0.4, 0.5, -1.25),
      new THREE.Vector3(0.6, 0.5, -1.5),
      new THREE.Vector3(0.6, 0.5, -1.57),
      new THREE.Vector3(0.25, 0.5, -1.57),
      new THREE.Vector3(0, 0.5, -1.57),
      new THREE.Vector3(-0.25, 0.5, -1.57),
      new THREE.Vector3(-0.6, 0.5, -1.57),

      new THREE.Vector3(-0.57, 0.5, -1.25),
      new THREE.Vector3(-0.57, 0.5, -1),
      new THREE.Vector3(-0.57, 0.5, -0.75),
      new THREE.Vector3(-0.57, 0.5, -0.5),
      new THREE.Vector3(-0.57, 0.5, -0.25),
      new THREE.Vector3(-0.57, 0.5, -0),
      new THREE.Vector3(-0.57, 0.5, 0.25),
      new THREE.Vector3(-0.57, 0.5, 0.5),
      new THREE.Vector3(-0.57, 0.5, 0.75),
      new THREE.Vector3(-0.57, 0.5, 1),
      new THREE.Vector3(-0.57, 0.5, 1.25),
      new THREE.Vector3(-0.57, 0.5, 1.6),

      new THREE.Vector3(-0.25, 0.5, 1.6),
      new THREE.Vector3(-0, 0.5, 1.6),
      new THREE.Vector3(0.25, 0.5, 1.6),
      new THREE.Vector3(0.6, 0.5, 1.6),

      new THREE.Vector3(0.57, 0.5, 1.57),
      new THREE.Vector3(0.57, 0.5, 1.25),
      new THREE.Vector3(0.57, 0.5, 1),
      new THREE.Vector3(0.57, 0.5, 0.75),
      new THREE.Vector3(0.57, 0.5, 0.5),
      new THREE.Vector3(0.57, 0.505, 0.25),
      new THREE.Vector3(0.57, 0.505, 0),
      new THREE.Vector3(0.57, 0.51, -0.25),
      new THREE.Vector3(0.57, 0.52, -0.5),
      new THREE.Vector3(0.57, 0.53, -0.75),
      new THREE.Vector3(0.57, 0.54, -1),
      new THREE.Vector3(0.57, 0.5475, -1.25),
      new THREE.Vector3(0.57, 0.5475, -1.6),
      new THREE.Vector3(0.5, 0.5475, -1.6),
      new THREE.Vector3(0.25, 0.5475, -1.4),
    ];

    for (let i = 0; i < 1; i++) {
      createMeshLineVarillas2(rectPointsVERDE3, 0x00ff00, 0, 0, 0.325 + i * 2, 0);
    }

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
