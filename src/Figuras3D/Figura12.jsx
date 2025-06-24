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
    camera.position.set(9.5, 9.5, 9.5);
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
    const geometry = new THREE.BoxGeometry(5, 4, 4);
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
    cube.position.set(0.5, 0, 0);
    scene.add(cube);

    // Agregar pilares rojos
    const pillarGeometry = new THREE.CylinderGeometry(0.05, 0.05, 5, 50);
    const pillarMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const pillarPositions = [
      [2.5, 0, -1.5],
      [2.5, 0, 1.5],
      [2.5, 0, 0],
      [1.5, 0, 1.5],
      [0.5, 0, 1.5],
      [-0.5, 0, 1.5],
      [-1.5, 0, 1.5],
      [-1.5, 0, 0],
      [-1.5, 0, -1.5],
      [-0.5, 0, -1.5],
      [0.5, 0, -1.5],
      [1.5, 0, -1.5],
    ];
    pillarPositions.forEach(([x, y, z]) => {
      const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
      pillar.position.set(x, y + 0.25, z);
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
      new THREE.Vector3(-1, 0.5, 1.3),
      new THREE.Vector3(-1.57, 0.5, 1.6),
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
      new THREE.Vector3(0.25, 0.5, -1.57),
      new THREE.Vector3(0.5, 0.5, -1.57),
      new THREE.Vector3(0.75, 0.5, -1.57),
      new THREE.Vector3(1, 0.5, -1.57),
      new THREE.Vector3(1.25, 0.5, -1.57),
      new THREE.Vector3(1.57, 0.5, -1.57),
      new THREE.Vector3(1.75, 0.5, -1.57),
      new THREE.Vector3(2.25, 0.5, -1.57),
      new THREE.Vector3(2.6, 0.5, -1.57),

      new THREE.Vector3(2.57, 0.5, -1.57),
      new THREE.Vector3(2.57, 0.5, -1.25),
      new THREE.Vector3(2.57, 0.5, -1),
      new THREE.Vector3(2.57, 0.5, -0.75),
      new THREE.Vector3(2.57, 0.5, -0.5),
      new THREE.Vector3(2.57, 0.5, -0.25),
      new THREE.Vector3(2.57, 0.5, 0),
      new THREE.Vector3(2.57, 0.5, 0.25),
      new THREE.Vector3(2.57, 0.5, 0.5),
      new THREE.Vector3(2.57, 0.5, 1),
      new THREE.Vector3(2.57, 0.5, 1.25),
      new THREE.Vector3(2.57, 0.5, 1.57),

      new THREE.Vector3(2.5, 0.5, 1.57),
      new THREE.Vector3(2.25, 0.5, 1.57),
      new THREE.Vector3(2, 0.5, 1.57),
      new THREE.Vector3(1.75, 0.5, 1.57),
      new THREE.Vector3(1.5, 0.5, 1.57),
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
      new THREE.Vector3(-1.6, 0.5, 1.57),
      new THREE.Vector3(-1.3, 0.5, 1),
    ];

    for (let i = 0; i < 1; i++) {
      createMeshLineVarillas2(rectPointsa2, 0x0000ff, 0, 0, 0.2 + i * 2, 0);
    }

    // Crear líneas con esquinas curvas
    const rectPoints = [
      new THREE.Vector3(2, 0.55, -1.3),
      new THREE.Vector3(2.57, 0.5, -1.57),
      new THREE.Vector3(2.57, 0.5, -1.25),
      new THREE.Vector3(2.57, 0.5, -1),
      new THREE.Vector3(2.57, 0.5, -0.75),
      new THREE.Vector3(2.57, 0.5, -0.5),
      new THREE.Vector3(2.57, 0.5, -0.25),
      new THREE.Vector3(2.57, 0.5, 0),
      new THREE.Vector3(2.57, 0.5, 0.25),
      new THREE.Vector3(2.57, 0.5, 0.5),
      new THREE.Vector3(2.57, 0.5, 1),
      new THREE.Vector3(2.57, 0.5, 1.25),
      new THREE.Vector3(2.57, 0.5, 1.57),

      new THREE.Vector3(2.25, 0.5, 1.57),
      new THREE.Vector3(2, 0.5, 1.57),
      new THREE.Vector3(1.75, 0.5, 1.57),
      new THREE.Vector3(1.5, 0.5, 1.57),
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
      new THREE.Vector3(0.25, 0.5, -1.57),
      new THREE.Vector3(0.5, 0.5, -1.57),
      new THREE.Vector3(0.75, 0.5, -1.57),
      new THREE.Vector3(1, 0.5, -1.57),
      new THREE.Vector3(1.25, 0.5, -1.57),
      new THREE.Vector3(1.5, 0.505, -1.57),
      new THREE.Vector3(1.75, 0.51, -1.57),
      new THREE.Vector3(2, 0.515, -1.57),
      new THREE.Vector3(2.25, 0.52, -1.57),
      new THREE.Vector3(2.6, 0.52, -1.57),
      new THREE.Vector3(2.3, 0.525, -1),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas2(rectPoints, 0x0000ff, 0, 0, -1.5 + i * 3.2, 0);
    }

    const rectPointsVerdes = [
      new THREE.Vector3(-1.3, 0.5, 0.3),
      new THREE.Vector3(-1.62, 0.5, -0.1),
      new THREE.Vector3(-1.25, 0.5, -0.1),
      new THREE.Vector3(-1, 0.5, -0.1),
      new THREE.Vector3(-0.5, 0.5, -0.1),
      new THREE.Vector3(0, 0.5, -0.1),
      new THREE.Vector3(0.25, 0.5, -0.1),
      new THREE.Vector3(0.5, 0.5, -0.1),
      new THREE.Vector3(1, 0.5, -0.1),
      new THREE.Vector3(1.25, 0.5, -0.1),
      new THREE.Vector3(1.5, 0.5, -0.1),
      new THREE.Vector3(1.75, 0.5, -0.1),
      new THREE.Vector3(2, 0.5, -0.1),
      new THREE.Vector3(2.25, 0.5, -0.1),
      new THREE.Vector3(2.62, 0.5, -0.1),
      new THREE.Vector3(2.3, 0.5, 0.3),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas2(rectPointsVerdes, 0x00FF00, 0, 0, -1.4 + i * 3.2, 0);
    }

    for (let i = 0; i < 1; i++) {
      createMeshLineVarillas2(rectPointsVerdes, 0x00FF00, 0, 0, 0.3 + i * 2, 0);
    }

    // Crear líneas con esquinas curvas
    const rectPointsAmarillas = [
      new THREE.Vector3(-0.2, 0.5, 1.3),
      new THREE.Vector3(-0.565, 0.5, 1.475),
      new THREE.Vector3(-0.565, 0.5, 1.575),
      new THREE.Vector3(-0.565, 0.5, 1.25),
      new THREE.Vector3(-0.565, 0.5, 1),
      new THREE.Vector3(-0.565, 0.5, 0.75),
      new THREE.Vector3(-0.565, 0.5, 0.5),
      new THREE.Vector3(-0.565, 0.5, 0.25),
      new THREE.Vector3(-0.565, 0.5, 0),
      new THREE.Vector3(-0.565, 0.5, -0.25),
      new THREE.Vector3(-0.565, 0.5, -0.5),
      new THREE.Vector3(-0.565, 0.5, -0.75),
      new THREE.Vector3(-0.565, 0.5, -1),
      new THREE.Vector3(-0.565, 0.5, -1.25),
      new THREE.Vector3(-0.565, 0.5, -1.56),

      new THREE.Vector3(-0.56, 0.5, -1.56),
      new THREE.Vector3(-0.25, 0.5, -1.56),
      new THREE.Vector3(0, 0.5, -1.56),
      new THREE.Vector3(0.25, 0.5, -1.56),
      new THREE.Vector3(0.5, 0.5, -1.56),
      new THREE.Vector3(1, 0.5, -1.56),
      new THREE.Vector3(1.25, 0.5, -1.56),
      new THREE.Vector3(1.565, 0.5, -1.56),

      new THREE.Vector3(1.565, 0.5, -1.5),
      new THREE.Vector3(1.565, 0.5, -1.25),
      new THREE.Vector3(1.565, 0.5, -1),
      new THREE.Vector3(1.565, 0.5, -0.75),
      new THREE.Vector3(1.565, 0.5, -0.5),
      new THREE.Vector3(1.565, 0.5, -0.25),
      new THREE.Vector3(1.565, 0.5, -0),
      new THREE.Vector3(1.565, 0.5, 0.25),
      new THREE.Vector3(1.565, 0.5, 0.5),
      new THREE.Vector3(1.565, 0.5, 0.75),
      new THREE.Vector3(1.565, 0.5, 1),
      new THREE.Vector3(1.565, 0.5, 1.25),
      new THREE.Vector3(1.565, 0.5, 1.575),

      new THREE.Vector3(1.56, 0.5, 1.575),
      new THREE.Vector3(1.25, 0.5, 1.575),
      new THREE.Vector3(0, 0.55, 1.575),
      new THREE.Vector3(-0.25, 0.55, 1.575),
      new THREE.Vector3(-0.55, 0.55, 1.575),
      new THREE.Vector3(-0.45, 0.55, 1.575),
      new THREE.Vector3(-0.3, 0.55, 1.2),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas2(rectPointsAmarillas, 0xffdb58, 0, 0, -1.45 + i * 3.2, 0);
    }

    const rectPointsAmarillas2 = [
      new THREE.Vector3(1.3, 0.5, -1.2),
      new THREE.Vector3(1.55, 0.5, -1.47),
      new THREE.Vector3(1.55, 0.5, -1.57),
      new THREE.Vector3(1.25, 0.5, -1.57),
      new THREE.Vector3(1, 0.5, -1.57),
      new THREE.Vector3(0.75, 0.5, -1.57),
      new THREE.Vector3(0.5, 0.5, -1.57),
      new THREE.Vector3(0.25, 0.5, -1.57),
      new THREE.Vector3(0, 0.5, -1.57),
      new THREE.Vector3(-0.25, 0.5, -1.57),
      new THREE.Vector3(-0.565, 0.5, -1.57),

      new THREE.Vector3(-0.565, 0.5, -1.56),
      new THREE.Vector3(-0.565, 0.5, -1.25),
      new THREE.Vector3(-0.565, 0.5, -1),
      new THREE.Vector3(-0.565, 0.5, -0.75),
      new THREE.Vector3(-0.565, 0.5, -0.5),
      new THREE.Vector3(-0.565, 0.5, -0.25),
      new THREE.Vector3(-0.565, 0.5, -0),
      new THREE.Vector3(-0.565, 0.5, 0.25),
      new THREE.Vector3(-0.565, 0.5, 0.5),
      new THREE.Vector3(-0.565, 0.5, 0.75),
      new THREE.Vector3(-0.565, 0.5, 1),
      new THREE.Vector3(-0.565, 0.5, 1.25),
      new THREE.Vector3(-0.565, 0.5, 1.575),

      new THREE.Vector3(-0.55, 0.5, 1.575),
      new THREE.Vector3(-0.25, 0.5, 1.575),
      new THREE.Vector3(-0, 0.5, 1.575),
      new THREE.Vector3(0.25, 0.5, 1.575),
      new THREE.Vector3(0.5, 0.5, 1.575),
      new THREE.Vector3(1, 0.5, 1.575),
      new THREE.Vector3(1.25, 0.5, 1.575),
      new THREE.Vector3(1.56, 0.5, 1.575),

      new THREE.Vector3(1.565, 0.5, 1.575),
      new THREE.Vector3(1.565, 0.5, 1.25),
      new THREE.Vector3(1.565, 0.5, 1),
      new THREE.Vector3(1.565, 0.5, 0.75),
      new THREE.Vector3(1.565, 0.5, 0.5),
      new THREE.Vector3(1.565, 0.5, 0.25),
      new THREE.Vector3(1.565, 0.5, 0),
      new THREE.Vector3(1.565, 0.5, -0.25),
      new THREE.Vector3(1.565, 0.55, -1.25),
      new THREE.Vector3(1.565, 0.55, -1.55),
      new THREE.Vector3(1.465, 0.55, -1.55),
      new THREE.Vector3(1.2, 0.55, -1.3),
    ];

    for (let i = 0; i < 1; i++) {
      createMeshLineVarillas2(rectPointsAmarillas2, 0xffdb58, 0, 0, 0.25 + i * 2, 0);
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
