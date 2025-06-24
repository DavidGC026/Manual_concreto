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
      35,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    camera.position.set(20.5, 30.5, 30.5);
    camera.lookAt(-120.5, -120.5, 120.5);

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
    const geometry = new THREE.BoxGeometry(1.75, 5, 2.5);
    const materials = [
      new THREE.MeshLambertMaterial({
        color: 0x919191,
        opacity: 0,
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
    cube.position.set(-2.125, 0, 0);
    scene.add(cube);

    // Crear un cubo con materiales transparentes
    const geometry2 = new THREE.BoxGeometry(1.75, 5, 2.5);
    const materials2 = [
      new THREE.MeshLambertMaterial({
        color: 0x919191,
        opacity: 0.5,
        transparent: true,
      }),
      new THREE.MeshLambertMaterial({
        color: 0x222222,
        opacity: 0,
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

    const cube2 = new THREE.Mesh(geometry2, materials2);
    cube2.position.set(2.125, 0, 0);
    scene.add(cube2);

    // Crear un cubo con materiales transparentes
    const geometry3 = new THREE.BoxGeometry(2.5, 5, 2.5);
    const materials3 = [
      new THREE.MeshLambertMaterial({
        color: 0x919191,
        opacity: 0,
        transparent: true,
      }),
      new THREE.MeshLambertMaterial({
        color: 0x222222,
        opacity: 0,
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
        opacity: 0,
        transparent: true,
      }),
      new THREE.MeshLambertMaterial({
        color: 0x222222,
        opacity: 0.5,
        transparent: true,
      }),
    ];

    const cube3 = new THREE.Mesh(geometry3, materials3);
    cube3.position.set(0, 0, 0);
    scene.add(cube3);

    // Crear un cubo con materiales transparentes
    const geometry4 = new THREE.BoxGeometry(2.5, 5, 11.5);
    const materials4 = [
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
        opacity: 0,
        transparent: true,
      }),
    ];

    const cube4 = new THREE.Mesh(geometry4, materials4);
    cube4.position.set(0, 0, 7);
    scene.add(cube4);

    /*------------------ Crear Varillas Rojas con MeshLine ----------------*/

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

    const VarillasRojas = [
      new THREE.Vector3(0, -2.4, 0),
      new THREE.Vector3(0, 3.75, 0),
    ];
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 2; i++) {
        createCylinderVarillas(
          VarillasRojas,
          0xff0000,
          0.1,
          -2.65 + j * 1.8,
          0,
          0.8 - i * 1.7
        );
      }
    }

    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 9; i++) {
        createCylinderVarillas(
          VarillasRojas,
          0xff0000,
          0.1,
          -0.9 + j * 1.8,
          0,
          12.25 - i * 1.25
        );
      }
    }

    /*------------------ Crear Estribos con MeshLine ----------------*/

    const createMeshLineEstribos = (
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
        lineWidth: 0.075,
        sizeAttenuation: 1,
      });

      // Crear malla de la línea y agregarla a la escena
      const lineMesh = new THREE.Mesh(meshLine, meshLineMaterial);
      lineMesh.position.x += xPosition;
      lineMesh.position.y += yPosition;
      lineMesh.position.z += zOffset;
      scene.add(lineMesh);
    };

    /* Grapas Naranjas*/

    const GrapasNaranjas = [
      new THREE.Vector3(-6.35, 0, -3.825),
      new THREE.Vector3(-6.675, 0, -4.375),
      new THREE.Vector3(-6.675, 0, -4.525),
      new THREE.Vector3(-6.575, 0, -4.525),
      new THREE.Vector3(-4.85, 0, -4.525),
      new THREE.Vector3(-4.7, 0, -4.525),
      new THREE.Vector3(-4.65, 0, -4.525),
      new THREE.Vector3(-4.65, 0, -3.9),
      new THREE.Vector3(-4.65, 0, -2.3),
      new THREE.Vector3(-4.65, 0, -2.2),
      new THREE.Vector3(-4.65, 0, 0.2),
      new THREE.Vector3(-4.65, 0, 0.3),
      new THREE.Vector3(-4.65, 0, 2.2),
      new THREE.Vector3(-4.65, 0, 2.3),
      new THREE.Vector3(-4.65, 0, 4.9),
      new THREE.Vector3(-4.65, 0, 5),
      new THREE.Vector3(-4.65, 0, 5.1),
      new THREE.Vector3(-4.65, 0, 7.75),
      new THREE.Vector3(-4.65, 0, 8.75),
      new THREE.Vector3(-4.65, 0, 9),
    ];
    for (let i = 0; i < 4; i++) {
      createMeshLineEstribos(
        GrapasNaranjas,
        0xffa420,
        0,
        5.7,
        2.8 + -i * 1.4,
        3.5
      );
    }

    const GrapasNaranjas2 = [
      new THREE.Vector3(-2.7, 0, -3.825),
      new THREE.Vector3(-2.4, 0, -4.375),
      new THREE.Vector3(-2.4, 0, -4.525),
      new THREE.Vector3(-2.5, 0, -4.525),
      new THREE.Vector3(-4.3, 0, -4.525),
      new THREE.Vector3(-4.4, 0, -4.525),
      new THREE.Vector3(-4.425, 0, -4.525),
      new THREE.Vector3(-4.43, 0, -3.9),
      new THREE.Vector3(-4.44, 0, -2.3),
      new THREE.Vector3(-4.45, 0, -2.2),
      new THREE.Vector3(-4.46, 0, 0.2),
      new THREE.Vector3(-4.47, 0, 0.3),
      new THREE.Vector3(-4.48, 0, 2.2),
      new THREE.Vector3(-4.49, 0, 2.3),
      new THREE.Vector3(-4.5, 0, 4.9),
      new THREE.Vector3(-4.5, 0, 5),
      new THREE.Vector3(-4.5, 0, 5.1),
      new THREE.Vector3(-4.5, 0, 7.75),
      new THREE.Vector3(-4.5, 0, 8.75),
      new THREE.Vector3(-4.5, 0, 9),
    ];
    for (let i = 0; i < 4; i++) {
      createMeshLineEstribos(
        GrapasNaranjas2,
        0xffa420,
        0,
        3.45,
        2.9 + -i * 1.4,
        3.5
      );
    }

    /* Estribos Verdes*/

    const EstribosVerdes = [
      new THREE.Vector3(-6.4, 0, -3.85),
      new THREE.Vector3(-6.7, 0, -4.55),
      new THREE.Vector3(-6.6, 0, -4.55),
      new THREE.Vector3(-6, 0, -4.55),
      new THREE.Vector3(-5.5, 0, -4.55),
      new THREE.Vector3(-5, 0, -4.55),
      new THREE.Vector3(-4.9, 0, -4.55),
      
      new THREE.Vector3(-4.85, 0, -4.55),
      new THREE.Vector3(-4.65, 0, -4.55),
      new THREE.Vector3(-4.65, 0, -3.9),
      new THREE.Vector3(-4.65, 0, -2.3),
      new THREE.Vector3(-4.65, 0, -2.2),
      new THREE.Vector3(-4.65, 0, -1.2),
      new THREE.Vector3(-4.65, 0, -1.1),

      new THREE.Vector3(-4.8, 0, -1.1),
      new THREE.Vector3(-4.9, 0, -1.1),
      new THREE.Vector3(-5.5, 0, -1.1),
      new THREE.Vector3(-6.6, 0, -1.1),

      new THREE.Vector3(-6.7, 0, -1.1),
      new THREE.Vector3(-6.7, 0.02, -1.2),
      new THREE.Vector3(-6.7, 0.04, -2.2),
      new THREE.Vector3(-6.7, 0.06, -2.3),
      new THREE.Vector3(-6.7, 0.08, -3.9),
      new THREE.Vector3(-6.7, 0.1, -4.55),
      new THREE.Vector3(-6.5, 0.1, -4.55),
      new THREE.Vector3(-6, 0.1, -4.05),

    ];
    for (let i = 0; i < 2; i++) {
      createMeshLineEstribos(
        EstribosVerdes,
        0x00ff00,
        0,
        5.7,
        3 + -i * 2.8,
        3.5
      );
    }

    const EstribosVerdes2 = [

      new THREE.Vector3(-4.95, 0, -1.9),
      new THREE.Vector3(-4.65, 0, -1.3),
      new THREE.Vector3(-4.65, 0, -1.1),
      new THREE.Vector3(-4.8, 0, -1.1),
      new THREE.Vector3(-4.9, 0, -1.1),
      new THREE.Vector3(-5.5, 0, -1.1),
      new THREE.Vector3(-6.6, 0, -1.1),
      new THREE.Vector3(-6.7, 0, -1.1),

      new THREE.Vector3(-6.7, 0, -1.2),
      new THREE.Vector3(-6.7, 0, -2.2),
      new THREE.Vector3(-6.7, 0, -2.3),
      new THREE.Vector3(-6.7, 0, -3.9),

      new THREE.Vector3(-6.7, 0, -4.6),
      new THREE.Vector3(-6.6, 0, -4.6),
      new THREE.Vector3(-5, 0, -4.6),
      new THREE.Vector3(-4.85, 0, -4.6),

      new THREE.Vector3(-4.65, 0, -4.6),
      new THREE.Vector3(-4.65, 0, -3.9),
      new THREE.Vector3(-4.65, 0.02, -2.3),
      new THREE.Vector3(-4.65, 0.04, -2.2),
      new THREE.Vector3(-4.65, 0.06, -1.2),
      new THREE.Vector3(-4.65, 0.08, -1.1),
      new THREE.Vector3(-4.85, 0.1, -1.1),
      new THREE.Vector3(-5.30, 0.1, -1.6),

    ];
    for (let i = 0; i < 2; i++) {
      createMeshLineEstribos(
        EstribosVerdes2,
        0x00ff00,
        0,
        5.7,
        1.6 + -i * 2.8,
        3.5
      );
    }

    /* Estribos Azules */

    const EstribosAzules = [
      new THREE.Vector3(-6.4, 0, -3.825),
      new THREE.Vector3(-6.7, 0, -4.425),
      new THREE.Vector3(-6.7, 0, -4.525),
      new THREE.Vector3(-6.6, 0, -4.525),
      new THREE.Vector3(-1.35, 0, -4.525),
      new THREE.Vector3(-1.30, 0, -4.525),
      new THREE.Vector3(-1.25, 0, -4.525),

      new THREE.Vector3(-1, 0, -4.525),
      new THREE.Vector3(-1, 0, -4.4),
      new THREE.Vector3(-1, 0, -3.9),
      new THREE.Vector3(-1, 0, -2.60),
      new THREE.Vector3(-1, 0.05, -2.575),

      new THREE.Vector3(-1.15, 0.01, -2.575),
      new THREE.Vector3(-1.25, 0.015, -2.575),
      new THREE.Vector3(-4.8, 0.02, -2.575),
      new THREE.Vector3(-4.9, 0.025, -2.575),
      new THREE.Vector3(-5.5, 0.03, -2.575),
      new THREE.Vector3(-6.575, 0.035, -2.575),
      new THREE.Vector3(-6.675, 0.04, -2.575),

      new THREE.Vector3(-6.675, 0.045, -2.6),
      new THREE.Vector3(-6.675, 0.05, -3.9),
      new THREE.Vector3(-6.675, 0.05, -4.5),
      new THREE.Vector3(-6.475, 0.05, -4.5),
      new THREE.Vector3(-5.975, 0.05, -4),

    ];
    for (let i = 0; i < 2; i++) {
      createMeshLineEstribos(
        EstribosAzules,
        0x0000FF,
        0,
        3.9,
        3.175 + -i * 2.8,
        3.5
      );
    }

    const EstribosAzules2 = [

      new THREE.Vector3(-5, 0, -1.925),
      new THREE.Vector3(-4.7, 0, -1.325),
      new THREE.Vector3(-4.7, 0, -1.125),
      new THREE.Vector3(-4.8, 0, -1.125),
      new THREE.Vector3(-4.9, 0, -1.125),
      new THREE.Vector3(-5.5, 0, -1.125),
      new THREE.Vector3(-6.6, 0, -1.125),
      new THREE.Vector3(-6.7, 0, -1.125),
      new THREE.Vector3(-8.7, 0, -1.125),
      new THREE.Vector3(-10.275, 0, -1.125),
      new THREE.Vector3(-10.375, 0, -1.125),

      new THREE.Vector3(-10.375, 0, -1.225),
      new THREE.Vector3(-10.375, 0, -1.3),
      new THREE.Vector3(-10.375, 0, -2.2),
      new THREE.Vector3(-10.375, 0, -2.3),
      new THREE.Vector3(-10.375, 0, -2.9),
      new THREE.Vector3(-10.375, 0, -3.085),

      new THREE.Vector3(-10.275, 0, -3.085),
      new THREE.Vector3(-10.15, 0, -3.085),
      new THREE.Vector3(-8.7, 0, -3.085),
      new THREE.Vector3(-6.7, 0, -3.085),
      new THREE.Vector3(-6.6, 0, -3.085),
      new THREE.Vector3(-5, 0, -3.085),
      new THREE.Vector3(-4.7, 0, -3.085),

      new THREE.Vector3(-4.7, 0.02, -3),
      new THREE.Vector3(-4.7, 0.02, -2.95),
      new THREE.Vector3(-4.7, 0.02, -2.3),
      new THREE.Vector3(-4.7, 0.04, -2.2),
      new THREE.Vector3(-4.7, 0.06, -1.2),
      new THREE.Vector3(-4.7, 0.08, -1.1),
      new THREE.Vector3(-4.9, 0.1, -1.1),
      new THREE.Vector3(-5.40, 0.1, -1.6),

    ];
    for (let i = 0; i < 2; i++) {
      createMeshLineEstribos(
        EstribosAzules2,
        0x0000FF,
        0,
        7.6,
        1.7 + -i * 2.8,
        2.05
      );
    }

    /* Grapas Verdes*/

    const GrapasVerdes = [
      new THREE.Vector3(-6.2, 0, -4),
      new THREE.Vector3(-6.725, 0, -4.5),
      new THREE.Vector3(-6.6, 0, -4.6),
      new THREE.Vector3(-4.95, 0, -4.6),
      new THREE.Vector3(-4.75, 0, -4.6),
      new THREE.Vector3(-4.625, 0, -4.5),
      new THREE.Vector3(-5.15, 0, -4),
    ];
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 4; i++) {
        createMeshLineEstribos(
          GrapasVerdes,
          0xffff00,
          0,
          5.67,
          3 + -i * 1.4,
          7.975 + (j * 1.0005) * 2.5
        );
      }
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
