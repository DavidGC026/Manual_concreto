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

    //Cubos transparentes
    const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5); // Geometría de un cubo
    // Materiales para las 6 caras del cubo (con diferentes colores y transparencias)
    const materials = [
      new THREE.MeshLambertMaterial({
        color: 0x919191,
        opacity: 0.5,
        transparent: true,
      }), // Cara derecha
      new THREE.MeshLambertMaterial({
        color: 0x222222,
        opacity: 0.5,
        transparent: true,
      }), // Cara izquierda
      new THREE.MeshLambertMaterial({
        color: 0xf2f2f2,
        opacity: 0.5,
        transparent: true,
      }), // Cara superior
      new THREE.MeshLambertMaterial({
        color: 0x222222,
        opacity: 0.5,
        transparent: true,
      }), // Cara inferior
      new THREE.MeshLambertMaterial({
        color: 0x333333,
        opacity: 0.5,
        transparent: true,
      }), // Cara frontal
      new THREE.MeshLambertMaterial({
        color: 0x222222,
        opacity: 0.5,
        transparent: true,
      }), // Cara trasera
    ];
    const cube = new THREE.Mesh(geometry, materials); // Crea un cubo con la geometría y los materiales

    cube.position.set(-0.5, 0.5, 0.5);
    scene.add(cube);

    // Crear y agregar Varillas con MeshLine
    const createCylinderVarillas = (
      points,
      color,
      radius,
      xPosition = 0,
      yPosition = 0,
      zOffset = 0
    ) => {
      const start = points[0];
      const end = points[1];

      // Calcular dirección y altura
      const direction = new THREE.Vector3().subVectors(end, start);
      const height = direction.length();

      // Crear geometría del cilindro
      const geometry = new THREE.CylinderGeometry(
        radius,   // radio superior
        radius,   // radio inferior
        height,   // altura
        8         // segmentos radiales
      );

      // Crear material y malla
      const material = new THREE.MeshBasicMaterial({ color: color });
      const cylinder = new THREE.Mesh(geometry, material);

      // Posicionar en el punto medio
      const midpoint = new THREE.Vector3()
        .addVectors(start, end)
        .multiplyScalar(0.5);

      cylinder.position.copy(midpoint);
      cylinder.position.x += xPosition;
      cylinder.position.y += yPosition;
      cylinder.position.z += zOffset;

      // Rotar para alineación
      cylinder.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),         // Dirección original (eje Y)
        direction.clone().normalize()        // Nueva dirección
      );

      scene.add(cylinder);
    };

    //Varillas Rojas

    const VarillasRojas = [
      new THREE.Vector3(4.5, -1, 0),
      new THREE.Vector3(4.5, 2, 0),
    ];
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 2; i++) {
        createCylinderVarillas(
          VarillasRojas,
          0xff0000,
          0.075,
          -i * 1.94 - 4.025,
          0.25,
          j * 1.94 - 0.475
        );
      }
    }

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

    // Blue Lines

    const VarillasAzules = [
      new THREE.Vector3(0, 0.5, -0.3),
      new THREE.Vector3(0.43, 0.5, -0.55),
      new THREE.Vector3(0.55, 0.5, -0.55),
      new THREE.Vector3(0.55, 0.5, -0.525),
      new THREE.Vector3(0.55, 0.5, -0.5),
      new THREE.Vector3(0.55, 0.5, 0),
      new THREE.Vector3(0.55, 0.5, 0.5),
      new THREE.Vector3(0.55, 0.5, 1),
      new THREE.Vector3(0.55, 0.5, 1.35),
      new THREE.Vector3(0.55, 0.5, 1.375),
      new THREE.Vector3(0.55, 0.5, 1.4),

      new THREE.Vector3(0.55, 0.5, 1.57),
      new THREE.Vector3(0.5, 0.5, 1.57),
      new THREE.Vector3(0, 0.5, 1.57),
      new THREE.Vector3(-0.5, 0.5, 1.57),
      new THREE.Vector3(-1, 0.5, 1.57),
      new THREE.Vector3(-1.45, 0.5, 1.57),
      new THREE.Vector3(-1.5, 0.5, 1.57),

      new THREE.Vector3(-1.55, 0.5, 1.57),
      new THREE.Vector3(-1.55, 0.51, 1.525),
      new THREE.Vector3(-1.55, 0.51, 0.5),
      new THREE.Vector3(-1.55, 0.52, 0),
      new THREE.Vector3(-1.55, 0.53, -0.45),
      new THREE.Vector3(-1.55, 0.53, -0.5),

      new THREE.Vector3(-1.5, 0.54, -0.55),
      new THREE.Vector3(-1, 0.55, -0.55),
      new THREE.Vector3(-0.5, 0.56, -0.55),
      new THREE.Vector3(0, 0.57, -0.55),
      new THREE.Vector3(0.55, 0.58, -0.55),
      new THREE.Vector3(0.55, 0.59, -0.4),
      new THREE.Vector3(0.2, 0.6, 0),
    ];
    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas2(VarillasAzules, 0x0000ff, 0, 0, i * 2 - 1, 0);
    }

    // Blue Lines

    const VarillasAzules2 = [
      new THREE.Vector3(-1, 0.5, 1.3),
      new THREE.Vector3(-1.35, 0.5, 1.55),
      new THREE.Vector3(-1.55, 0.5, 1.55),
      new THREE.Vector3(-1.55, 0.5, 1.5),
      new THREE.Vector3(-1.55, 0.5, 1.45),
      new THREE.Vector3(-1.55, 0.5, 1),
      new THREE.Vector3(-1.55, 0.5, 0.5),
      new THREE.Vector3(-1.55, 0.5, 0),
      new THREE.Vector3(-1.55, 0.5, -0.4),
      new THREE.Vector3(-1.55, 0.5, -0.5),
      new THREE.Vector3(-1.55, 0.5, -0.55),

      new THREE.Vector3(-1.5, 0.5, -0.55),
      new THREE.Vector3(-1.4, 0.5, -0.55),
      new THREE.Vector3(-1.35, 0.5, -0.55),
      new THREE.Vector3(-0.5, 0.5, -0.55),
      new THREE.Vector3(0, 0.5, -0.55),
      new THREE.Vector3(0.5, 0.5, -0.55),
      new THREE.Vector3(0.55, 0.5, -0.55),

      new THREE.Vector3(0.55, 0.5, -0.5),
      new THREE.Vector3(0.55, 0.5, -0.45),
      new THREE.Vector3(0.55, 0.5, 0),
      new THREE.Vector3(0.55, 0.5, 0.5),
      new THREE.Vector3(0.55, 0.51, 1),
      new THREE.Vector3(0.55, 0.52, 1.5),
      new THREE.Vector3(0.55, 0.53, 1.55),

      new THREE.Vector3(0.5, 0.54, 1.6),
      new THREE.Vector3(0.45, 0.54, 1.6),
      new THREE.Vector3(0, 0.54, 1.6),
      new THREE.Vector3(-0.1, 0.55, 1.6),
      new THREE.Vector3(-0.5, 0.55, 1.6),
      new THREE.Vector3(-1, 0.56, 1.6),
      new THREE.Vector3(-1.5, 0.57, 1.6),
      new THREE.Vector3(-1.55, 0.58, 1.6),
      new THREE.Vector3(-1.55, 0.59, 1.4),
      new THREE.Vector3(-1.2, 0.6, 1),
    ];
    for (let i = 0; i < 1; i++) {
      createMeshLineVarillas2(VarillasAzules2, 0x0000ff, 0, 0, i * 1, 0);
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