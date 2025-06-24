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
    camera.position.set(20.5, 20.5, 30.5);
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

    // Crear un cubo con materiales transparentes
    const geometry = new THREE.BoxGeometry(6, 20, 6);
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

    // Crear un cubo con materiales transparentes
    const geometry2 = new THREE.BoxGeometry(4.5, 6, 6);

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
        opacity: 0.5,
        transparent: true,
      }),
    ];

    const cube2 = new THREE.Mesh(geometry2, materials2);
    cube2.position.set(0, 0, -6);
    scene.add(cube2);

    const materials3 = [
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
    const cube3 = new THREE.Mesh(geometry2, materials3);
    cube3.position.set(0, 0, 6);
    scene.add(cube3);

    const geometry4 = new THREE.BoxGeometry(6, 6, 3);

    const materials4 = [
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
    const cube4 = new THREE.Mesh(geometry4, materials4);
    cube4.position.set(6, 0, 0);
    scene.add(cube4);

    const materials5 = [
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
    const cube5 = new THREE.Mesh(geometry4, materials5);
    cube5.position.set(-6, 0, 0);
    scene.add(cube5);

    /* Varilllas Verdes */

    const VarillasAmarillas3 = [
      new THREE.Vector3(4.5, -2.75, -1),
      new THREE.Vector3(4.5, -2.75, -3),
      new THREE.Vector3(4.5, -2.75, -7),
      new THREE.Vector3(4.5, -2.75, -18),
      new THREE.Vector3(4.5, -2.75, -19),
    ];

    for (let i = 0; i < 4; i++) {
      createMeshLineVarillas(
        VarillasAmarillas3,
        0x00ff00,
        0,
        -i * 1 - 3,
        5,
        10
      );
    }

    for (let i = 0; i < 4; i++) {
      createMeshLineVarillas(
        VarillasAmarillas3,
        0x00ff00,
        0,
        -i * 1 - 3,
        0.5,
        10
      );
    }

    /* Varilllas Verdes */

    const VarillasAmarillas2 = [
      new THREE.Vector3(-1, -2.75, -4.5),
      new THREE.Vector3(-3, -2.75, -4.5),
      new THREE.Vector3(-7, -2.75, -4.5),
      new THREE.Vector3(-18, -2.75, -4.5),
      new THREE.Vector3(-19, -2.75, -4.5),
    ];

    for (let i = 0; i < 4; i++) {
      createMeshLineVarillas(
        VarillasAmarillas2,
        0x0000ff,
        0,
        10,
        5.2,
        i * 0.75 + 3.35
      );
    }

    for (let i = 0; i < 4; i++) {
      createMeshLineVarillas(
        VarillasAmarillas2,
        0x0000ff,
        0,
        10,
        0.3,
        i * 0.75 + 3.35
      );
    }

    //Varillas Rojo Verticales

    const VarillasRojas = [
      new THREE.Vector3(4.5, -10, 0),
      new THREE.Vector3(4.5, 10, 0),
    ];
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        if (j === 1 && i === 1) {
          continue;
        } else {
          createCylinderVarillas(
            VarillasRojas,
            0xff0000,
            0.1,
            -i * 1.95 - 2.525,
            0,
            -1.975 + j * 1.95
          );
        }
      }
    }

    /* Estribos Amarillos*/

    const EstribosAmarillos = [
      new THREE.Vector3(0.7, 0.5, -0.9),
      new THREE.Vector3(1.1, 0.5, -1.5),
      new THREE.Vector3(1.1, 0.5, -1.6),
      new THREE.Vector3(1, 0.5, -1.6),
      new THREE.Vector3(0.8, 0.5, -1.6),
      new THREE.Vector3(-2.5, 0.5, -1.6),
      new THREE.Vector3(-3, 0.5, -1.6),
      new THREE.Vector3(-3.1, 0.5, -1.6),

      new THREE.Vector3(-3.1, 0.55, -1.5),
      new THREE.Vector3(-3.1, 0.55, -1.4),
      new THREE.Vector3(-3.1, 0.55, -1.2),
      new THREE.Vector3(-3.1, 0.55, 1.7),
      new THREE.Vector3(-3.1, 0.55, 2.2),
      new THREE.Vector3(-3.1, 0.55, 2.575),

      new THREE.Vector3(-3, 0.6, 2.575),
      new THREE.Vector3(-2.5, 0.6, 2.575),
      new THREE.Vector3(-2, 0.6, 2.575),
      new THREE.Vector3(0.8, 0.6, 2.575),
      new THREE.Vector3(1, 0.6, 2.575),
      new THREE.Vector3(1.1, 0.6, 2.575),

      new THREE.Vector3(1.1, 0.65, 2.5),
      new THREE.Vector3(1.1, 0.65, 2),
      new THREE.Vector3(1.1, 0.65, 1.5),
      new THREE.Vector3(1.1, 0.65, -1.5),
      new THREE.Vector3(1.1, 0.65, -1.6),
      new THREE.Vector3(1, 0.65, -1.6),
      new THREE.Vector3(0.8, 0.65, -1.6),
      new THREE.Vector3(0.2, 0.65, -1.2),
    ];

    for (let i = 0; i < 7; i++) {
      createMeshLineVarillas(
        EstribosAmarillos,
        0xffff00,
        0,
        1,
        -9.5 + i * 3,
        -0.5
      );
    }


    const EstribosAmarillos2 = [

      new THREE.Vector3(-2.7, 0.6, 1.975),
      new THREE.Vector3(-3.1, 0.6, 2.375),
      new THREE.Vector3(-3.1, 0.6, 2.575),
      new THREE.Vector3(-2.5, 0.6, 2.575),
      new THREE.Vector3(-2, 0.6, 2.575),
      new THREE.Vector3(0.8, 0.6, 2.575),
      new THREE.Vector3(1, 0.6, 2.575),
      new THREE.Vector3(1.1, 0.6, 2.575),

      new THREE.Vector3(1.1, 0.6, 2.5),
      new THREE.Vector3(1.1, 0.6, 2),
      new THREE.Vector3(1.1, 0.6, 1.5),
      new THREE.Vector3(1.1, 0.6, -1.5),
      new THREE.Vector3(1.1, 0.6, -1.6),

      new THREE.Vector3(1, 0.59, -1.6),
      new THREE.Vector3(0.8, 0.58, -1.6),
      new THREE.Vector3(-2.5, 0.57, -1.6),
      new THREE.Vector3(-3, 0.56, -1.6),
      new THREE.Vector3(-3.1, 0.55, -1.6),

      new THREE.Vector3(-3.1, 0.54, -1.5),
      new THREE.Vector3(-3.1, 0.53, -1.4),
      new THREE.Vector3(-3.1, 0.52, -1.2),
      new THREE.Vector3(-3.1, 0.515, 1.7),
      new THREE.Vector3(-3.1, 0.515, 2.2),
      new THREE.Vector3(-3.1, 0.515, 2.575),
      new THREE.Vector3(-2.9, 0.515, 2.575),
      new THREE.Vector3(-2.5, 0.515, 2.3),
    ];

    for (let i = 0; i < 6; i++) {
      createMeshLineVarillas(
        EstribosAmarillos2,
        0xffff00,
        0,
        1,
        -8 + i * 3,
        -0.5
      );
    }

    /* Estribos Rosas*/

    const EstribosRosas = [
      new THREE.Vector3(0.3, 0.7, 0.6),
      new THREE.Vector3(1.1, 0.7, 0.6),
      new THREE.Vector3(1.1, 0.7, 0.5),
      new THREE.Vector3(1, 0.7, 0.3),
      new THREE.Vector3(0.8, 0.7, 0.1),
      new THREE.Vector3(0.6, 0.7, -0.1),
      new THREE.Vector3(0.4, 0.7, -0.3),
      new THREE.Vector3(0.2, 0.7, -0.5),
      new THREE.Vector3(0, 0.7, -0.7),
      new THREE.Vector3(-0.2, 0.7, -0.9),
      new THREE.Vector3(-0.4, 0.7, -1.1),
      new THREE.Vector3(-0.6, 0.7, -1.3),
      new THREE.Vector3(-0.8, 0.7, -1.5),
      new THREE.Vector3(-1, 0.7, -1.6),

      new THREE.Vector3(-1.2, 0.7, -1.5),
      new THREE.Vector3(-1.4, 0.7, -1.3),
      new THREE.Vector3(-1.6, 0.7, -1.1),
      new THREE.Vector3(-1.8, 0.7, -0.9),
      new THREE.Vector3(-2, 0.7, -0.7),
      new THREE.Vector3(-2.2, 0.7, -0.5),
      new THREE.Vector3(-2.4, 0.7, -0.3),
      new THREE.Vector3(-2.6, 0.7, -0.1),
      new THREE.Vector3(-2.8, 0.7, 0.1),
      new THREE.Vector3(-3, 0.7, 0.3),
      new THREE.Vector3(-3.05, 0.7, 0.5),

      new THREE.Vector3(-2.9, 0.7, 0.7),
      new THREE.Vector3(-2.7, 0.7, 0.9),
      new THREE.Vector3(-2.5, 0.7, 1.1),
      new THREE.Vector3(-2.3, 0.7, 1.3),
      new THREE.Vector3(-2.1, 0.7, 1.5),
      new THREE.Vector3(-1.9, 0.7, 1.7),
      new THREE.Vector3(-1.7, 0.7, 1.9),
      new THREE.Vector3(-1.5, 0.7, 2.1),
      new THREE.Vector3(-1.3, 0.7, 2.3),
      new THREE.Vector3(-1.1, 0.7, 2.5),
      new THREE.Vector3(-1, 0.7, 2.6),

      new THREE.Vector3(-0.85, 0.7, 2.5),
      new THREE.Vector3(-0.7, 0.7, 2.3),
      new THREE.Vector3(-0.5, 0.7, 2.1),
      new THREE.Vector3(-0.3, 0.7, 1.9),
      new THREE.Vector3(-0.1, 0.7, 1.7),
      new THREE.Vector3(0.1, 0.7, 1.5),
      new THREE.Vector3(0.3, 0.7, 1.3),
      new THREE.Vector3(0.5, 0.7, 1.1),
      new THREE.Vector3(0.7, 0.7, 0.9),
      new THREE.Vector3(0.9, 0.7, 0.7),
      new THREE.Vector3(1.1, 0.7, 0.5),
      new THREE.Vector3(1.1, 0.7, 0.4),
      new THREE.Vector3(0.3, 0.7, 0.3),
    ];

    for (let i = 0; i < 7; i++) {
      createMeshLineVarillas(
        EstribosRosas,
        0xff00ff,
        0,
        1,
        -9.4 + i * 3,
        -0.5
      );
    }

    const EstribosRosas2 = [

      new THREE.Vector3(-2.2, 0.7, 0.325),
      new THREE.Vector3(-2.225, 0.7, 0.325),
      new THREE.Vector3(-2.975, 0.7, 0.325),
      new THREE.Vector3(-3, 0.7, 0.325),
      new THREE.Vector3(-3, 0.7, 0.6),
      new THREE.Vector3(-2.7, 0.7, 0.9),
      new THREE.Vector3(-2.5, 0.7, 1.1),
      new THREE.Vector3(-2.3, 0.7, 1.3),
      new THREE.Vector3(-2.1, 0.7, 1.5),
      new THREE.Vector3(-1.9, 0.7, 1.7),
      new THREE.Vector3(-1.7, 0.7, 1.9),
      new THREE.Vector3(-1.5, 0.7, 2.1),
      new THREE.Vector3(-1.3, 0.7, 2.3),
      new THREE.Vector3(-1.1, 0.7, 2.5),
      new THREE.Vector3(-1, 0.7, 2.55),

      new THREE.Vector3(-0.8, 0.7, 2.5),
      new THREE.Vector3(-0.6, 0.7, 2.3),
      new THREE.Vector3(-0.4, 0.7, 2.1),
      new THREE.Vector3(-0.2, 0.7, 1.9),
      new THREE.Vector3(0, 0.7, 1.7),
      new THREE.Vector3(0.2, 0.7, 1.5),
      new THREE.Vector3(0.4, 0.7, 1.3),
      new THREE.Vector3(0.6, 0.7, 1.1),
      new THREE.Vector3(0.8, 0.7, 0.9),
      new THREE.Vector3(1.1, 0.7, 0.55),

      new THREE.Vector3(1.1, 0.7, 0.45),
      new THREE.Vector3(0.8, 0.7, 0.1),
      new THREE.Vector3(0.6, 0.7, -0.1),
      new THREE.Vector3(0.4, 0.7, -0.3),
      new THREE.Vector3(0.2, 0.7, -0.5),
      new THREE.Vector3(0, 0.7, -0.7),
      new THREE.Vector3(-0.2, 0.7, -0.9),
      new THREE.Vector3(-0.4, 0.7, -1.1),
      new THREE.Vector3(-0.6, 0.7, -1.3),
      new THREE.Vector3(-0.8, 0.7, -1.5),
      new THREE.Vector3(-0.9, 0.7, -1.6),

      new THREE.Vector3(-1.1, 0.7, -1.5),
      new THREE.Vector3(-1.3, 0.7, -1.3),
      new THREE.Vector3(-1.5, 0.7, -1.1),
      new THREE.Vector3(-1.7, 0.7, -0.9),
      new THREE.Vector3(-1.9, 0.7, -0.7),
      new THREE.Vector3(-2.1, 0.7, -0.5),
      new THREE.Vector3(-2.3, 0.7, -0.3),
      new THREE.Vector3(-2.5, 0.7, -0.1),
      new THREE.Vector3(-2.7, 0.7, 0.1),
      new THREE.Vector3(-2.9, 0.7, 0.3),
      new THREE.Vector3(-3, 0.7, 0.4),
      new THREE.Vector3(-3, 0.7, 0.65),
      new THREE.Vector3(-2.2, 0.7, 0.65),
    ];

    for (let i = 0; i < 6; i++) {
      createMeshLineVarillas(
        EstribosRosas2,
        0xff00ff,
        0,
        1,
        -7.9 + i * 3,
        -0.5
      );
    }

    /* Estribos Morados */

    const EstribosMorados = [
      new THREE.Vector3(4.8, -6.8, 4.5),
      new THREE.Vector3(5.3, -7.45, 4.5),
      new THREE.Vector3(5.3, -7.6, 4.5),
      new THREE.Vector3(4.4, -7.6, 4.5),
      new THREE.Vector3(3.5, -7.6, 4.5),
      new THREE.Vector3(3, -7.6, 4.5),
      new THREE.Vector3(2.5, -7.6, 4.5),
      new THREE.Vector3(2.05, -7.6, 4.49),

      new THREE.Vector3(2.05, -7.5, 4.46),
      new THREE.Vector3(2.05, -7.1, 4.46),
      new THREE.Vector3(2.05, -6.6, 4.46),
      new THREE.Vector3(2.05, -6.1, 4.46),
      new THREE.Vector3(2.05, -5.75, 4.46),
      new THREE.Vector3(2.05, -5.25, 4.45),
      new THREE.Vector3(2.05, -4.75, 4.44),
      new THREE.Vector3(2.05, -4.25, 4.43),
      new THREE.Vector3(2.05, -3.75, 4.42),
      new THREE.Vector3(2.05, -3.25, 4.41),
      new THREE.Vector3(2.05, -2.85, 4.41),

      new THREE.Vector3(2.05, -2.85, 4.5),
      new THREE.Vector3(2.5, -2.85, 4.5),
      new THREE.Vector3(3, -2.85, 4.5),
      new THREE.Vector3(3.5, -2.85, 4.5),
      new THREE.Vector3(4, -2.85, 4.5),
      new THREE.Vector3(4.4, -2.85, 4.5),
      new THREE.Vector3(4.9, -2.85, 4.5),
      new THREE.Vector3(5.2, -2.85, 4.5),

      new THREE.Vector3(5.2, -3.25, 4.5),
      new THREE.Vector3(5.2, -3.75, 4.5),
      new THREE.Vector3(5.2, -4.25, 4.5),
      new THREE.Vector3(5.2, -4.75, 4.5),
      new THREE.Vector3(5.2, -5.25, 4.5),
      new THREE.Vector3(5.2, -5.75, 4.5),
      new THREE.Vector3(5.2, -7.6, 4.5),
      new THREE.Vector3(4.9, -7.6, 4.41),
      new THREE.Vector3(4.4, -7, 4.41),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas(
        EstribosMorados,
        0xb100cd,
        0,
        -3.65,
        5.2,
        2 - i * 3
      );
    }

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas(
        EstribosMorados,
        0xb100cd,
        0,
        -3.65,
        5.2,
        -8.2 - i * 2.5
      );
    }

    const EstribosMorados2 = [
      new THREE.Vector3(2.55, -3.6, 4.5),
      new THREE.Vector3(2.05, -2.9, 4.5),
      new THREE.Vector3(2.05, -2.85, 4.5),
      new THREE.Vector3(2.5, -2.85, 4.5),
      new THREE.Vector3(3, -2.85, 4.5),
      new THREE.Vector3(3.5, -2.85, 4.5),
      new THREE.Vector3(4, -2.85, 4.5),
      new THREE.Vector3(4.4, -2.85, 4.5),
      new THREE.Vector3(4.9, -2.85, 4.5),
      new THREE.Vector3(5.2, -2.85, 4.5),

      new THREE.Vector3(5.225, -3.25, 4.5),
      new THREE.Vector3(5.225, -3.3, 4.5),
      new THREE.Vector3(5.225, -3.75, 4.5),
      new THREE.Vector3(5.225, -4.25, 4.5),
      new THREE.Vector3(5.225, -4.75, 4.5),
      new THREE.Vector3(5.225, -5.25, 4.5),
      new THREE.Vector3(5.225, -5.75, 4.5),
      new THREE.Vector3(5.225, -7.45, 4.5),
      new THREE.Vector3(5.225, -7.575, 4.5),

      new THREE.Vector3(5.2, -7.575, 4.5),
      new THREE.Vector3(4.4, -7.575, 4.5),
      new THREE.Vector3(3.5, -7.575, 4.5),
      new THREE.Vector3(3, -7.575, 4.5),
      new THREE.Vector3(2.5, -7.575, 4.5),
      new THREE.Vector3(2.05, -7.575, 4.49),

      new THREE.Vector3(2.05, -7.5, 4.46),
      new THREE.Vector3(2.05, -7.1, 4.46),
      new THREE.Vector3(2.05, -6.6, 4.46),
      new THREE.Vector3(2.05, -6.1, 4.46),
      new THREE.Vector3(2.05, -5.75, 4.46),
      new THREE.Vector3(2.05, -5.25, 4.45),
      new THREE.Vector3(2.05, -4.75, 4.44),
      new THREE.Vector3(2.05, -4.25, 4.43),
      new THREE.Vector3(2.05, -3.75, 4.42),
      new THREE.Vector3(2.05, -3.25, 4.41),
      new THREE.Vector3(2.05, -2.85, 4.41),
      new THREE.Vector3(2.2, -2.85, 4.41),
      new THREE.Vector3(2.9, -3.35, 4.41),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas(
        EstribosMorados2,
        0xb100cd,
        0,
        -3.65,
        5.2,
        3.5 - i * 3
      );
    }

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas(
        EstribosMorados2,
        0xb100cd,
        0,
        -3.65,
        5.2,
        -9.5 - i * 2.5
      );
    }

    /* Estribos Morados */
    const EstribosCafes = [
      new THREE.Vector3(4.5, -3.55, 2.7),
      new THREE.Vector3(4.5, -3, 2.3),
      new THREE.Vector3(4.5, -2.85, 2.3),
      new THREE.Vector3(4.5, -2.85, 2.5),
      new THREE.Vector3(4.5, -2.85, 3),
      new THREE.Vector3(4.5, -2.85, 3.5),
      new THREE.Vector3(4.5, -2.85, 4),
      new THREE.Vector3(4.5, -2.85, 4.5),
      new THREE.Vector3(4.5, -2.85, 4.675),

      new THREE.Vector3(4.5, -3, 4.675),
      new THREE.Vector3(4.5, -3.25, 4.675),
      new THREE.Vector3(4.5, -3.75, 4.675),
      new THREE.Vector3(4.5, -4.25, 4.675),
      new THREE.Vector3(4.5, -4.75, 4.675),
      new THREE.Vector3(4.5, -5.25, 4.675),
      new THREE.Vector3(4.5, -5.75, 4.675),
      new THREE.Vector3(4.5, -7.6, 4.675),
      new THREE.Vector3(4.5, -8, 4.675),

      new THREE.Vector3(4.4, -8, 4.5),
      new THREE.Vector3(4.4, -8, 4),
      new THREE.Vector3(4.4, -8, 3.5),
      new THREE.Vector3(4.4, -8, 3),
      new THREE.Vector3(4.4, -8, 2.5),
      new THREE.Vector3(4.4, -8, 2.3),

      new THREE.Vector3(4.4, -7.5, 2.3),
      new THREE.Vector3(4.4, -7.1, 2.3),
      new THREE.Vector3(4.4, -6.6, 2.3),
      new THREE.Vector3(4.4, -6.1, 2.3),
      new THREE.Vector3(4.4, -5.75, 2.3),
      new THREE.Vector3(4.4, -5.25, 2.3),
      new THREE.Vector3(4.4, -4.75, 2.3),
      new THREE.Vector3(4.4, -4.25, 2.3),
      new THREE.Vector3(4.4, -3.75, 2.3),
      new THREE.Vector3(4.4, -3.25, 2.3),
      new THREE.Vector3(4.4, -2.85, 2.3),
      new THREE.Vector3(4.4, -2.85, 2.6),
      new THREE.Vector3(4.4, -3.45, 3),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas(EstribosCafes, 0x8b5737, 0, -1 + i * 3, 5.4, -3.5);
    }

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas(
        EstribosCafes,
        0x8b5737,
        0,
        -11 + i * 3,
        5.4,
        -3.5
      );
    }

    const EstribosCafes2 = [
      new THREE.Vector3(4.4, -7.25, 4.4),
      new THREE.Vector3(4.4, -7.75, 4.675),
      new THREE.Vector3(4.4, -7.925, 4.675),
      new THREE.Vector3(4.4, -7.925, 4.5),
      new THREE.Vector3(4.4, -7.925, 4),
      new THREE.Vector3(4.4, -7.925, 3.5),
      new THREE.Vector3(4.4, -7.925, 3),
      new THREE.Vector3(4.4, -7.925, 2.5),
      new THREE.Vector3(4.4, -7.925, 2.3),

      new THREE.Vector3(4.4, -7.5, 2.3),
      new THREE.Vector3(4.4, -7.1, 2.3),
      new THREE.Vector3(4.4, -6.6, 2.3),
      new THREE.Vector3(4.4, -6.1, 2.3),
      new THREE.Vector3(4.4, -5.75, 2.3),
      new THREE.Vector3(4.4, -5.25, 2.3),
      new THREE.Vector3(4.4, -4.75, 2.3),
      new THREE.Vector3(4.4, -4.25, 2.3),
      new THREE.Vector3(4.4, -3.75, 2.3),
      new THREE.Vector3(4.4, -3.25, 2.3),
      new THREE.Vector3(4.4, -2.85, 2.3),
      new THREE.Vector3(4.4, -2.85, 2.6),

      new THREE.Vector3(4.5, -2.85, 3),
      new THREE.Vector3(4.5, -2.85, 3.5),
      new THREE.Vector3(4.5, -2.85, 4),
      new THREE.Vector3(4.5, -2.85, 4.5),
      new THREE.Vector3(4.5, -2.85, 4.675),

      new THREE.Vector3(4.5, -3, 4.675),
      new THREE.Vector3(4.5, -3.25, 4.675),
      new THREE.Vector3(4.5, -3.75, 4.675),
      new THREE.Vector3(4.5, -4.25, 4.675),
      new THREE.Vector3(4.5, -4.75, 4.675),
      new THREE.Vector3(4.5, -5.25, 4.675),
      new THREE.Vector3(4.5, -5.75, 4.675),
      new THREE.Vector3(4.5, -7.65, 4.675),
      new THREE.Vector3(4.5, -7.925, 4.675),
      new THREE.Vector3(4.5, -7.925, 4.5),
      new THREE.Vector3(4.5, -7.375, 4.1),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas(
        EstribosCafes2,
        0x8b5737,
        0,
        0.5 + i * 3,
        5.4,
        -3.5
      );
    }

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas(
        EstribosCafes2,
        0x8b5737,
        0,
        -12.5 + i * 3,
        5.4,
        -3.5
      );
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
