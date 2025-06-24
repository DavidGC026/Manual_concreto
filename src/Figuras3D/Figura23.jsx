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
    camera.position.set(120.5, 100.5, 100.5);
    camera.lookAt(-20.5, -20.5, 2.5);

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
    const geometry1 = new THREE.BoxGeometry(5, 30, 8);
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

    for (let i = 0; i < 2; i++) {
      const cube11 = new THREE.Mesh(geometry1, materials);
      cube11.position.set(0, 0, i * -50 - 4);
      scene.add(cube11);
    }

    for (let i = 0; i < 2; i++) {
      const cube1 = new THREE.Mesh(geometry1, materials);
      cube1.position.set(0, 0, 16 + i * 50);
      scene.add(cube1);
    }

    // Crear un cubo con materiales transparentes
    const geometry2 = new THREE.BoxGeometry(3, 6, 42);
    const materials2 = [
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
        opacity: 0,
        transparent: true,
      }),
      new THREE.MeshLambertMaterial({
        color: 0x222222,
        opacity: 0,
        transparent: true,
      }),
    ];
    const cube2 = new THREE.Mesh(geometry2, materials2);
    cube2.position.set(0, 0, 41);
    scene.add(cube2);

    const cube21 = new THREE.Mesh(geometry2, materials2);
    cube21.position.set(0, 0, -29);
    scene.add(cube21);

    const geometry3 = new THREE.BoxGeometry(3, 4, 12);
    const cube3 = new THREE.Mesh(geometry3, materials2);
    cube3.position.set(0, 1, 6);
    scene.add(cube3);

    // Crear y agregar Varillas con MeshLine
    const createMeshLineVarillas = (
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
        lineWidth: 0.1,
        sizeAttenuation: 1,
      });

      // Crear malla de la línea y agregarla a la escena
      const lineMesh = new THREE.Mesh(meshLine, meshLineMaterial);
      lineMesh.position.x += xPosition;
      lineMesh.position.y += yPosition;
      lineMesh.position.z += zOffset;
      scene.add(lineMesh);
    };

    // Varillas Azules horizontales

    const VarillasAzules = [
      new THREE.Vector3(4.5, -2.75, 0),
      new THREE.Vector3(4.5, -2.75, -53.5),
    ];

    for (let i = 0; i < 3; i++) {
      createMeshLineVarillas(
        VarillasAzules,
        0x00b096,
        0,
        -i * 1 - 3.45,
        2.25,
        32.7
      );
    }

    // Varillas Verde

    const VarillasVerdeG = [
      new THREE.Vector3(4.5, -11, 0),
      new THREE.Vector3(4.5, -9.75, 0),
      new THREE.Vector3(4.5, -7.75, 0),
      new THREE.Vector3(4.5, -5.75, 0),
      new THREE.Vector3(4.5, -3.75, 0),
      new THREE.Vector3(4.5, -3, 0),
      new THREE.Vector3(4.5, -2.75, -0.5),
      new THREE.Vector3(4.5, -2.75, -1),
      new THREE.Vector3(4.5, -2.75, -50),
      new THREE.Vector3(4.5, -2.75, -117),
      new THREE.Vector3(4.5, -2.75, -122),
      new THREE.Vector3(4.5, -2.75, -122.5),
      new THREE.Vector3(4.5, -2.75, -123.5),
      new THREE.Vector3(4.5, -3, -123.5),
      new THREE.Vector3(4.5, -3.75, -123.5),
      new THREE.Vector3(4.5, -5.75, -123.5),
      new THREE.Vector3(4.5, -7.75, -123.5),
      new THREE.Vector3(4.5, -9.75, -123.5),
      new THREE.Vector3(4.5, -11, -123.5),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas(
        VarillasVerdeG,
        0x00ff00,
        0,
        -i * 2 - 3.45,
        5.25,
        67.5
      );
    }

    const VarillasVerdeG2 = [
      new THREE.Vector3(4.5, -1.25, -68.5),
      new THREE.Vector3(4.5, -2.5, -68.5),
      new THREE.Vector3(4.5, -2.75, -68.5),
      new THREE.Vector3(4.5, -2.75, -69),
      new THREE.Vector3(4.5, -2.75, -70),
      new THREE.Vector3(4.5, -2.75, -73),
      new THREE.Vector3(4.5, -2.75, -73),
      new THREE.Vector3(4.5, -2.75, -117),
      new THREE.Vector3(4.5, -2.75, -122),
      new THREE.Vector3(4.5, -2.75, -122.5),
      new THREE.Vector3(4.5, -2.75, -123.5),
      new THREE.Vector3(4.5, -2.5, -123.5),
      new THREE.Vector3(4.5, -1.25, -123.5),
      new THREE.Vector3(4.5, 1.25, -123.5),
      new THREE.Vector3(4.5, 3.25, -123.5),
      new THREE.Vector3(4.5, 4.25, -123.5),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas(
        VarillasVerdeG2,
        0x00ff00,
        0,
        -i * 2 - 3.55,
        1.25,
        67
      );
    }

    const VarillasVerdeG3 = [
      new THREE.Vector3(4.5, 4.25, -68.5),
      new THREE.Vector3(4.5, 3.25, -68.5),
      new THREE.Vector3(4.5, 1.25, -68.5),
      new THREE.Vector3(4.5, -1.25, -68.5),
      new THREE.Vector3(4.5, -2.5, -68.5),
      new THREE.Vector3(4.5, -2.75, -68.5),
      new THREE.Vector3(4.5, -2.75, -69),
      new THREE.Vector3(4.5, -2.75, -70),
      new THREE.Vector3(4.5, -2.75, -73),
      new THREE.Vector3(4.5, -2.75, -73),
      new THREE.Vector3(4.5, -2.75, -117),
      new THREE.Vector3(4.5, -2.75, -122),
      new THREE.Vector3(4.5, -2.75, -122.5),
      new THREE.Vector3(4.5, -2.75, -123.5),
      new THREE.Vector3(4.5, -2.5, -123.5),
      new THREE.Vector3(4.5, -1.25, -123.5),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas(
        VarillasVerdeG3,
        0x00ff00,
        0,
        -i * 2 - 3.55,
        1.25,
        136.5
      );
    }

    /* Varillas Naranjas */

    const VarillasNaranjas = [
      new THREE.Vector3(4.5, -1.25, -68.5),
      new THREE.Vector3(4.5, -2.5, -68.5),
      new THREE.Vector3(4.5, -2.75, -68.5),
      new THREE.Vector3(4.5, -2.75, -69),
      new THREE.Vector3(4.5, -2.75, -70),
      new THREE.Vector3(4.5, -2.75, -89.5),
    ];

    createMeshLineVarillas(
      VarillasNaranjas,
      0xff9800,
      0,
      -1 - 3.55,
      1.25,
      136.5
    );

    const VarillasNaranjas3 = [
      new THREE.Vector3(4.5, -1.25, -68.5),
      new THREE.Vector3(4.5, -2.5, -68.5),
      new THREE.Vector3(4.5, -2.75, -68.5),
      new THREE.Vector3(4.5, -2.75, -69),
      new THREE.Vector3(4.5, -2.75, -70),
      new THREE.Vector3(4.5, -2.75, -88),
    ];

    createMeshLineVarillas(VarillasNaranjas3, 0xff9800, 0, -1 - 3.55, 1.25, 67);

    const VarillasNaranjas2 = [
      new THREE.Vector3(4.5, -2.75, -103.7),
      new THREE.Vector3(4.5, -2.75, -117),
      new THREE.Vector3(4.5, -2.75, -122),
      new THREE.Vector3(4.5, -2.75, -122.5),
      new THREE.Vector3(4.5, -2.75, -123.5),
      new THREE.Vector3(4.5, -2.5, -123.5),
      new THREE.Vector3(4.5, -1.25, -123.5),
    ];

    createMeshLineVarillas(
      VarillasNaranjas2,
      0xff9800,
      0,
      -1 - 3.55,
      1.25,
      136.5
    );

    const VarillasNaranjas4 = [
      new THREE.Vector3(4.5, -2.75, -103),
      new THREE.Vector3(4.5, -2.75, -117),
      new THREE.Vector3(4.5, -2.75, -122),
      new THREE.Vector3(4.5, -2.75, -122.5),
      new THREE.Vector3(4.5, -2.75, -123.5),
      new THREE.Vector3(4.5, -2.5, -123.5),
      new THREE.Vector3(4.5, -1.25, -123.5),
    ];
    createMeshLineVarillas(VarillasNaranjas4, 0xff9800, 0, -1 - 3.55, 1.25, 67);

    /*-------------------------------Varillas Amarillas---------------------------------*/

    const VarillasAmarillas = [
      new THREE.Vector3(4.5, -11, 0),
      new THREE.Vector3(4.5, -9.75, 0),
      new THREE.Vector3(4.5, -7.75, 0),
      new THREE.Vector3(4.5, -5.75, 0),
      new THREE.Vector3(4.5, -3.75, 0),
      new THREE.Vector3(4.5, -3, 0),
      new THREE.Vector3(4.5, -2.75, -0.5),
      new THREE.Vector3(4.5, -2.75, -1),
      new THREE.Vector3(4.5, -2.75, -3),
      new THREE.Vector3(4.5, -2.75, -7),
      new THREE.Vector3(4.5, -2.75, -18),
      new THREE.Vector3(4.5, -2.75, -19),
      new THREE.Vector3(4.5, -3.55, -20),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas(
        VarillasAmarillas,
        0xfff200,
        0,
        -i * 1 - 4,
        5.25,
        67
      );
    }

    const VarillasAmarillas2 = [
      new THREE.Vector3(4.5, -3.55, 0),
      new THREE.Vector3(4.5, -2.75, -1),
      new THREE.Vector3(4.5, -2.75, -3),
      new THREE.Vector3(4.5, -2.75, -7),
      new THREE.Vector3(4.5, -2.75, -18),
      new THREE.Vector3(4.5, -2.75, -52),
      new THREE.Vector3(4.5, -2.75, -52.4),
      new THREE.Vector3(4.5, -3.55, -53.4),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas(
        VarillasAmarillas2,
        0xfff200,
        0,
        -i * 1 - 4,
        5.25,
        32.5
      );
    }

    const VarillasAmarillas3 = [
      new THREE.Vector3(4.5, -3.75, 0),
      new THREE.Vector3(4.5, -2.75, -1),
      new THREE.Vector3(4.5, -2.75, -3),
      new THREE.Vector3(4.5, -2.75, -7),
      new THREE.Vector3(4.5, -2.75, -18),
      new THREE.Vector3(4.5, -2.75, -19),
      new THREE.Vector3(4.5, -3.55, -20),
      new THREE.Vector3(4.5, -5.55, -20),
      new THREE.Vector3(4.5, -7.55, -20),
      new THREE.Vector3(4.5, -9.55, -20),
      new THREE.Vector3(4.5, -11.55, -20),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas(
        VarillasAmarillas3,
        0xfff200,
        0,
        -i * 1 - 4,
        5.25,
        -36
      );
    }

    //Varillas Azules Verticales

    const VarillasAzulesV = [
      new THREE.Vector3(4.5, -14, 0),
      new THREE.Vector3(4.5, 14, 0),
    ];
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        if (j === 1 && i === 1) {
          continue;
        } else {
          createMeshLineVarillas(
            VarillasAzulesV,
            0x0000ff,
            0,
            -i * 2 - 2.5,
            0,
            13 + j * 3
          );
        }
      }
    }
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        if (j === 1 && i === 1) {
          continue;
        } else {
          createMeshLineVarillas(
            VarillasAzulesV,
            0x0000ff,
            0,
            -i * 2 - 2.5,
            0,
            63 + j * 3
          );
        }
      }
    }

    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        if (j === 1 && i === 1) {
          continue;
        } else {
          createMeshLineVarillas(
            VarillasAzulesV,
            0x0000ff,
            0,
            -i * 2 - 2.5,
            0,
            -7 + j * 3
          );
        }
      }
    }
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        if (j === 1 && i === 1) {
          continue;
        } else {
          createMeshLineVarillas(
            VarillasAzulesV,
            0x0000ff,
            0,
            -i * 2 - 2.5,
            0,
            -57 + j * 3
          );
        }
      }
    }

    /* Estribos Morados*/

    const EstribosMorados = [
      new THREE.Vector3(0.6, 0.5, -0.7),
      new THREE.Vector3(1.05, 0.5, -1.35),
      new THREE.Vector3(1.05, 0.5, -1.55),
      new THREE.Vector3(-1.1, 0.5, -1.55),
      new THREE.Vector3(-2.5, 0.5, -1.55),
      new THREE.Vector3(-3, 0.5, -1.55),
      new THREE.Vector3(-3.1, 0.5, -1.55),

      new THREE.Vector3(-3.1, 0.55, -1.5),
      new THREE.Vector3(-3.1, 0.55, -1.4),
      new THREE.Vector3(-3.1, 0.55, -1.2),
      new THREE.Vector3(-3.1, 0.55, 4),
      new THREE.Vector3(-3.1, 0.55, 4.5),
      new THREE.Vector3(-3.1, 0.55, 4.6),

      new THREE.Vector3(-3, 0.6, 4.6),
      new THREE.Vector3(-2.5, 0.6, 4.6),
      new THREE.Vector3(-2, 0.6, 4.6),
      new THREE.Vector3(0.8, 0.6, 4.6),
      new THREE.Vector3(1, 0.6, 4.6),
      new THREE.Vector3(1.05, 0.6, 4.6),

      new THREE.Vector3(1.05, 0.65, 4.5),
      new THREE.Vector3(1.05, 0.65, 4),
      new THREE.Vector3(1.05, 0.65, -1.55),
      new THREE.Vector3(1.05, 0.65, -1.55),
      new THREE.Vector3(1, 0.65, -1.55),
      new THREE.Vector3(0.8, 0.65, -1.55),
      new THREE.Vector3(0.4, 0.65, -1.1),
    ];

    for (let i = 0; i < 14; i++) {
      createMeshLineVarillas(
        EstribosMorados,
        0xbe2ed6,
        0,
        1,
        -14 + i * 2,
        64.5
      );
    }
    for (let i = 0; i < 14; i++) {
      createMeshLineVarillas(
        EstribosMorados,
        0xbe2ed6,
        0,
        1,
        -14 + i * 2,
        14.5
      );
    }

    for (let i = 0; i < 14; i++) {
      createMeshLineVarillas(
        EstribosMorados,
        0xbe2ed6,
        0,
        1,
        -14 + i * 2,
        -5.5
      );
    }

    for (let i = 0; i < 14; i++) {
      createMeshLineVarillas(
        EstribosMorados,
        0xbe2ed6,
        0,
        1,
        -14 + i * 2,
        -55.5
      );
    }

    /*Estribos Morados Invertidos*/

    const EstribosMorados2 = [
      new THREE.Vector3(-2.6, 0.6, 3.9),
      new THREE.Vector3(-3.05, 0.6, 4.375),
      new THREE.Vector3(-3.05, 0.6, 4.575),
      new THREE.Vector3(-2.5, 0.6, 4.575),
      new THREE.Vector3(1, 0.6, 4.575),
      new THREE.Vector3(1.1, 0.6, 4.575),

      new THREE.Vector3(1.1, 0.65, 4.5),
      new THREE.Vector3(1.1, 0.65, 4),
      new THREE.Vector3(1.1, 0.65, 3.5),
      new THREE.Vector3(1.1, 0.65, -1.5),
      new THREE.Vector3(1.1, 0.65, -1.6),

      new THREE.Vector3(1.1, 0.5, -1.5),
      new THREE.Vector3(1.1, 0.5, -1.6),
      new THREE.Vector3(1, 0.5, -1.6),
      new THREE.Vector3(-3, 0.5, -1.6),
      new THREE.Vector3(-3.05, 0.5, -1.6),

      new THREE.Vector3(-3.05, 0.55, -1.5),
      new THREE.Vector3(-3.05, 0.55, -1.4),
      new THREE.Vector3(-3.05, 0.55, 4),
      new THREE.Vector3(-3.05, 0.55, 4.5),
      new THREE.Vector3(-3.05, 0.55, 4.575),
      new THREE.Vector3(-2.8, 0.55, 4.575),
      new THREE.Vector3(-2.4, 0.55, 4.175),
    ];

    for (let i = 0; i < 14; i++) {
      createMeshLineVarillas(
        EstribosMorados2,
        0xbe2ed6,
        0,
        1,
        -13 + i * 2,
        64.5
      );
    }

    for (let i = 0; i < 14; i++) {
      createMeshLineVarillas(
        EstribosMorados2,
        0xbe2ed6,
        0,
        1,
        -13 + i * 2,
        14.5
      );
    }

    for (let i = 0; i < 14; i++) {
      createMeshLineVarillas(
        EstribosMorados2,
        0xbe2ed6,
        0,
        1,
        -13 + i * 2,
        -5.5
      );
    }

    for (let i = 0; i < 14; i++) {
      createMeshLineVarillas(
        EstribosMorados2,
        0xbe2ed6,
        0,
        1,
        -13 + i * 2,
        -55.5
      );
    }

    // Estribos Rojos

    const EstribosRojosCH = [
      new THREE.Vector3(2.5, -3.6, 4.4),
      new THREE.Vector3(2.15, -3, 4.4),
      new THREE.Vector3(2.15, -2.875, 4.4),
      new THREE.Vector3(2.5, -2.875, 4.4),
      new THREE.Vector3(3, -2.875, 4.45),
      new THREE.Vector3(3.5, -2.875, 4.5),
      new THREE.Vector3(4, -2.875, 4.5),
      new THREE.Vector3(4.3, -2.875, 4.5),

      new THREE.Vector3(4.3, -3.25, 4.5),
      new THREE.Vector3(4.3, -3.75, 4.5),
      new THREE.Vector3(4.3, -4.25, 4.5),
      new THREE.Vector3(4.3, -4.75, 4.5),
      new THREE.Vector3(4.3, -5.25, 4.5),
      new THREE.Vector3(4.3, -5.75, 4.5),
      new THREE.Vector3(4.3, -6.05, 4.5),

      new THREE.Vector3(4, -6.05, 4.5),
      new THREE.Vector3(3.5, -6.05, 4.5),
      new THREE.Vector3(3, -6.05, 4.5),
      new THREE.Vector3(2.5, -6.05, 4.5),

      new THREE.Vector3(2.15, -6.05, 4.46),
      new THREE.Vector3(2.15, -5.75, 4.46),
      new THREE.Vector3(2.15, -5.25, 4.45),
      new THREE.Vector3(2.15, -4.75, 4.44),
      new THREE.Vector3(2.15, -4.25, 4.43),
      new THREE.Vector3(2.15, -3.75, 4.42),
      new THREE.Vector3(2.15, -3.25, 4.41),
      new THREE.Vector3(2.15, -2.875, 4.41),
      new THREE.Vector3(2.3, -2.875, 4.41),
      new THREE.Vector3(2.8, -3.15, 4.41),
    ];

    for (let i = 0; i < 6; i++) {
      createMeshLineVarillas(
        EstribosRojosCH,
        0xff0000,
        0,
        -3.2,
        5.5,
        7 - i * 2
      );
    }

    const EstribosRojosCH2 = [
      new THREE.Vector3(4, -5.35, 4.5),
      new THREE.Vector3(4.3, -5.95, 4.5),
      new THREE.Vector3(4.3, -6.1, 4.5),
      new THREE.Vector3(4.2, -6.1, 4.5),
      new THREE.Vector3(3.5, -6.1, 4.5),
      new THREE.Vector3(3, -6.1, 4.5),
      new THREE.Vector3(2.5, -6.1, 4.5),
      new THREE.Vector3(2.125, -6.1, 4.49),

      new THREE.Vector3(2.125, -6.1, 4.46),
      new THREE.Vector3(2.125, -5.75, 4.46),
      new THREE.Vector3(2.125, -5.25, 4.45),
      new THREE.Vector3(2.125, -4.75, 4.44),
      new THREE.Vector3(2.125, -4.25, 4.43),
      new THREE.Vector3(2.125, -3.75, 4.42),
      new THREE.Vector3(2.125, -3.25, 4.41),
      new THREE.Vector3(2.125, -2.85, 4.41),

      new THREE.Vector3(2.5, -2.85, 4.5),
      new THREE.Vector3(3, -2.85, 4.5),
      new THREE.Vector3(3.5, -2.85, 4.5),
      new THREE.Vector3(4, -2.85, 4.5),
      new THREE.Vector3(4.3, -2.85, 4.5),

      new THREE.Vector3(4.3, -3.25, 4.5),
      new THREE.Vector3(4.3, -3.75, 4.5),
      new THREE.Vector3(4.3, -4.25, 4.5),
      new THREE.Vector3(4.3, -4.75, 4.5),
      new THREE.Vector3(4.3, -5.25, 4.5),
      new THREE.Vector3(4.3, -5.75, 4.5),
      new THREE.Vector3(4.3, -6.1, 4.5),
      new THREE.Vector3(4.1, -6.1, 4.41),
      new THREE.Vector3(3.6, -5.5, 4.41),
    ];

    for (let i = 0; i < 6; i++) {
      createMeshLineVarillas(
        EstribosRojosCH2,
        0xff0000,
        0,
        -3.2,
        5.5,
        6 - i * 2
      );
    }

    const EstribosRojosGR = [
      new THREE.Vector3(2.5, -3.6, 4.5),
      new THREE.Vector3(2.125, -3, 4.5),
      new THREE.Vector3(2.125, -2.85, 4.5),
      new THREE.Vector3(2.5, -2.85, 4.5),
      new THREE.Vector3(3, -2.85, 4.5),
      new THREE.Vector3(3.5, -2.85, 4.5),
      new THREE.Vector3(4, -2.85, 4.5),
      new THREE.Vector3(4.3, -2.85, 4.5),

      new THREE.Vector3(4.3, -3.25, 4.5),
      new THREE.Vector3(4.3, -3.75, 4.5),
      new THREE.Vector3(4.3, -4.25, 4.5),
      new THREE.Vector3(4.3, -4.75, 4.5),
      new THREE.Vector3(4.3, -5.25, 4.5),
      new THREE.Vector3(4.3, -5.75, 4.5),
      new THREE.Vector3(4.3, -6.1, 4.5),
      new THREE.Vector3(4.3, -6.6, 4.5),
      new THREE.Vector3(4.3, -7, 4.5),
      new THREE.Vector3(4.3, -7.1, 4.5),

      new THREE.Vector3(4, -7.1, 4.5),
      new THREE.Vector3(3.5, -7.1, 4.5),
      new THREE.Vector3(3, -7.1, 4.5),
      new THREE.Vector3(2.5, -7.1, 4.5),
      new THREE.Vector3(2.125, -7.1, 4.49),

      new THREE.Vector3(2.125, -7.1, 4.47),
      new THREE.Vector3(2.125, -6.1, 4.46),
      new THREE.Vector3(2.125, -5.75, 4.46),
      new THREE.Vector3(2.125, -5.25, 4.45),
      new THREE.Vector3(2.125, -4.75, 4.44),
      new THREE.Vector3(2.125, -4.25, 4.43),
      new THREE.Vector3(2.125, -3.75, 4.42),
      new THREE.Vector3(2.125, -3.25, 4.41),
      new THREE.Vector3(2.125, -2.85, 4.41),
      new THREE.Vector3(2.3, -2.85, 4.41),
      new THREE.Vector3(2.8, -3.25, 4.41),
    ];

    const EstribosRojosGR2 = [
      new THREE.Vector3(4, -6.35, 4.5),
      new THREE.Vector3(4.3, -6.95, 4.5),
      new THREE.Vector3(4.3, -7.1, 4.5),
      new THREE.Vector3(4.2, -7.1, 4.5),
      new THREE.Vector3(3.5, -7.1, 4.5),
      new THREE.Vector3(3, -7.1, 4.5),
      new THREE.Vector3(2.5, -7.1, 4.5),
      new THREE.Vector3(2.125, -7.1, 4.49),

      new THREE.Vector3(2.125, -7.1, 4.46),
      new THREE.Vector3(2.125, -6.1, 4.46),
      new THREE.Vector3(2.125, -5.75, 4.46),
      new THREE.Vector3(2.125, -5.25, 4.45),
      new THREE.Vector3(2.125, -4.75, 4.44),
      new THREE.Vector3(2.125, -4.25, 4.43),
      new THREE.Vector3(2.125, -3.75, 4.42),
      new THREE.Vector3(2.125, -3.25, 4.41),

      new THREE.Vector3(2.125, -2.85, 4.5),
      new THREE.Vector3(2.5, -2.85, 4.5),
      new THREE.Vector3(3, -2.85, 4.5),
      new THREE.Vector3(3.5, -2.85, 4.5),
      new THREE.Vector3(4, -2.85, 4.5),
      new THREE.Vector3(4.3, -2.85, 4.5),

      new THREE.Vector3(4.3, -3.25, 4.5),
      new THREE.Vector3(4.3, -3.75, 4.5),
      new THREE.Vector3(4.3, -4.25, 4.5),
      new THREE.Vector3(4.3, -4.75, 4.5),
      new THREE.Vector3(4.3, -5.25, 4.5),
      new THREE.Vector3(4.3, -5.75, 4.5),
      new THREE.Vector3(4.3, -7.1, 4.5),
      new THREE.Vector3(4.1, -7.1, 4.41),
      new THREE.Vector3(4.1, -7.1, 4.41),
      new THREE.Vector3(3.6, -6.5, 4.41),
    ];

    /*Lado 1*/

    for (let i = 0; i < 6; i++) {
      createMeshLineVarillas(
        EstribosRojosGR,
        0xff0000,
        0,
        -3.2,
        5.5,
        57 - i * 2.5
      );
    }

    for (let i = 0; i < 6; i++) {
      createMeshLineVarillas(
        EstribosRojosGR2,
        0xff0000,
        0,
        -3.2,
        5.5,
        55.8 - i * 2.5
      );
    }

    for (let i = 0; i < 6; i++) {
      createMeshLineVarillas(
        EstribosRojosGR,
        0xff0000,
        0,
        -3.2,
        5.5,
        27 - i * 2
      );
    }

    for (let i = 0; i < 6; i++) {
      createMeshLineVarillas(
        EstribosRojosGR2,
        0xff0000,
        0,
        -3.2,
        5.5,
        26 - i * 2
      );
    }

    for (let i = 0; i < 5; i++) {
      createMeshLineVarillas(
        EstribosRojosGR,
        0xff0000,
        0,
        -3.2,
        5.5,
        42 - i * 3
      );
    }

    for (let i = 0; i < 5; i++) {
      createMeshLineVarillas(
        EstribosRojosGR2,
        0xff0000,
        0,
        -3.2,
        5.5,
        40.5 - i * 3
      );
    }
    /*------------------------------------------------------------------------------------*/

    /*Lado 2*/

    for (let i = 0; i < 6; i++) {
      createMeshLineVarillas(
        EstribosRojosGR,
        0xff0000,
        0,
        -3.2,
        5.5,
        -41 - i * 2.5
      );
    }

    for (let i = 0; i < 6; i++) {
      createMeshLineVarillas(
        EstribosRojosGR2,
        0xff0000,
        0,
        -3.2,
        5.5,
        -39.8 - i * 2.5
      );
    }

    for (let i = 0; i < 6; i++) {
      createMeshLineVarillas(
        EstribosRojosGR,
        0xff0000,
        0,
        -3.2,
        5.5,
        -14 - i * 2
      );
    }

    for (let i = 0; i < 6; i++) {
      createMeshLineVarillas(
        EstribosRojosGR2,
        0xff0000,
        0,
        -3.2,
        5.5,
        -13 - i * 2
      );
    }

    for (let i = 0; i < 5; i++) {
      createMeshLineVarillas(
        EstribosRojosGR,
        0xff0000,
        0,
        -3.2,
        5.5,
        -27 - i * 3
      );
    }

    for (let i = 0; i < 5; i++) {
      createMeshLineVarillas(
        EstribosRojosGR2,
        0xff0000,
        0,
        -3.2,
        5.5,
        -25.5 - i * 3
      );
    }
    /*------------------------------------------------------------------------------------*/

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
