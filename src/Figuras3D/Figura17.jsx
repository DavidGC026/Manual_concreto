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
    const geometry = new THREE.BoxGeometry(5, 4, 5);
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
    cube.position.set(0.5, -0.25, 0.5);
    scene.add(cube);

    // Agregar pilares rojos
    const pillarGeometry = new THREE.CylinderGeometry(0.05, 0.05, 5, 50);
    const pillarMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const pillarPositions = [
      [2.5, 0, 2.5],
      [1.5, 0, 2.5],
      [0.5, 0, 2.5],
      [-0.5, 0, 2.5],
      [-1.5, 0, 2.5],

      [2.5, 0, -0.5],
      [2.5, 0, 0.5],
      [2.5, 0, 1.5],

      [-1.5, 0, -0.5],
      [-1.5, 0, 0.5],
      [-1.5, 0, 1.5],

      [-1.5, 0, -1.5],
      [-0.5, 0, -1.5],
      [0.5, 0, -1.5],
      [1.5, 0, -1.5],
      [2.5, 0, -1.5],
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
      new THREE.Vector3(-2.2, 0.5, 2.3),
      new THREE.Vector3(-2.5, 0.5, 2.57),
      new THREE.Vector3(-2.57, 0.5, 2.57),
      new THREE.Vector3(-2.57, 0.5, 2.25),
      new THREE.Vector3(-2.57, 0.5, 2),
      new THREE.Vector3(-2.57, 0.5, 1.75),
      new THREE.Vector3(-2.57, 0.5, 1.5),
      new THREE.Vector3(-2.57, 0.5, 1.25),
      new THREE.Vector3(-2.57, 0.5, 1),
      new THREE.Vector3(-2.57, 0.5, 0.75),
      new THREE.Vector3(-2.57, 0.5, 0.5),
      new THREE.Vector3(-2.57, 0.5, 0.25),
      new THREE.Vector3(-2.57, 0.5, 0),
      new THREE.Vector3(-2.57, 0.5, -0.25),
      new THREE.Vector3(-2.57, 0.5, -0.5),
      new THREE.Vector3(-2.57, 0.5, -1),
      new THREE.Vector3(-2.57, 0.5, -1.25),
      new THREE.Vector3(-2.57, 0.5, -1.57),

      new THREE.Vector3(-2.25, 0.5, -1.57),
      new THREE.Vector3(-2, 0.5, -1.57),
      new THREE.Vector3(-1.75, 0.5, -1.57),
      new THREE.Vector3(-1.5, 0.5, -1.57),
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
      new THREE.Vector3(1.6, 0.5, -1.57),

      new THREE.Vector3(1.57, 0.5, -1.25),
      new THREE.Vector3(1.57, 0.5, -1),
      new THREE.Vector3(1.57, 0.5, -0.75),
      new THREE.Vector3(1.57, 0.5, -0.5),
      new THREE.Vector3(1.57, 0.5, -0.25),
      new THREE.Vector3(1.57, 0.5, 0),
      new THREE.Vector3(1.57, 0.5, 0.25),
      new THREE.Vector3(1.57, 0.5, 0.5),
      new THREE.Vector3(1.57, 0.5, 0.75),
      new THREE.Vector3(1.57, 0.5, 1),
      new THREE.Vector3(1.57, 0.5, 1.25),
      new THREE.Vector3(1.6, 0.5, 1.57),
      new THREE.Vector3(1.57, 0.5, 1.75),
      new THREE.Vector3(1.57, 0.5, 2),
      new THREE.Vector3(1.57, 0.5, 2.25),
      new THREE.Vector3(1.57, 0.5, 2.6),

      new THREE.Vector3(1.25, 0.5, 2.57),
      new THREE.Vector3(1, 0.5, 2.57),
      new THREE.Vector3(0.75, 0.5, 2.57),
      new THREE.Vector3(0.5, 0.5, 2.57),
      new THREE.Vector3(0.25, 0.5, 2.57),
      new THREE.Vector3(0, 0.5, 2.57),
      new THREE.Vector3(-0.25, 0.5, 2.57),
      new THREE.Vector3(-0.5, 0.5, 2.57),
      new THREE.Vector3(-0.75, 0.5, 2.57),
      new THREE.Vector3(-1, 0.5, 2.57),
      new THREE.Vector3(-1.25, 0.51, 2.57),
      new THREE.Vector3(-1.5, 0.52, 2.57),
      new THREE.Vector3(-1.75, 0.53, 2.57),
      new THREE.Vector3(-2, 0.54, 2.57),
      new THREE.Vector3(-2.25, 0.55, 2.57),
      new THREE.Vector3(-2.57, 0.55, 2.57),
      new THREE.Vector3(-2.57, 0.55, 2.5),
      new THREE.Vector3(-2.3, 0.55, 2.1),
    ];

    for (let i = 0; i < 1; i++) {
      createMeshLineVarillas2(rectPointsa2, 0x0000ff, 0, 1, -0.1 + i * 2, 0);
    }

    // Crear líneas con esquinas curvas
    const rectPoints = [
      new THREE.Vector3(1.1, 0.55, -1.3),
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
      new THREE.Vector3(1.57, 0.5, 1.5),
      new THREE.Vector3(1.57, 0.5, 1.75),
      new THREE.Vector3(1.57, 0.5, 2),
      new THREE.Vector3(1.57, 0.5, 2.25),
      new THREE.Vector3(1.57, 0.5, 2.6),

      new THREE.Vector3(1.25, 0.5, 2.57),
      new THREE.Vector3(1, 0.5, 2.57),
      new THREE.Vector3(1.25, 0.5, 2.57),
      new THREE.Vector3(1, 0.5, 2.57),
      new THREE.Vector3(0.75, 0.5, 2.57),
      new THREE.Vector3(0.5, 0.5, 2.57),
      new THREE.Vector3(0.25, 0.5, 2.57),
      new THREE.Vector3(0, 0.5, 2.57),
      new THREE.Vector3(-0.25, 0.5, 2.57),
      new THREE.Vector3(-0.5, 0.5, 2.57),
      new THREE.Vector3(-0.75, 0.5, 2.57),
      new THREE.Vector3(-1, 0.5, 2.57),
      new THREE.Vector3(-1.25, 0.5, 2.57),
      new THREE.Vector3(-1.5, 0.5, 2.57),
      new THREE.Vector3(-1.75, 0.5, 2.57),
      new THREE.Vector3(-2, 0.5, 2.57),
      new THREE.Vector3(-2.25, 0.5, 2.57),
      new THREE.Vector3(-2.6, 0.5, 2.57),

      new THREE.Vector3(-2.57, 0.5, 2.25),
      new THREE.Vector3(-2.57, 0.5, 2),
      new THREE.Vector3(-2.57, 0.5, 1.75),
      new THREE.Vector3(-2.57, 0.5, 1.25),
      new THREE.Vector3(-2.57, 0.5, 1),
      new THREE.Vector3(-2.57, 0.5, 0.75),
      new THREE.Vector3(-2.57, 0.5, 0.5),
      new THREE.Vector3(-2.57, 0.5, 0.25),
      new THREE.Vector3(-2.57, 0.5, 0),
      new THREE.Vector3(-2.57, 0.5, -0.25),
      new THREE.Vector3(-2.57, 0.5, -0.5),
      new THREE.Vector3(-2.57, 0.5, -1),
      new THREE.Vector3(-2.57, 0.5, -1.25),
      new THREE.Vector3(-2.57, 0.5, -1.57),

      new THREE.Vector3(-2.25, 0.5, -1.57),
      new THREE.Vector3(-2, 0.5, -1.57),
      new THREE.Vector3(-1.75, 0.5, -1.57),
      new THREE.Vector3(-1.5, 0.5, -1.57),
      new THREE.Vector3(-1.25, 0.5, -1.57),
      new THREE.Vector3(-1, 0.5, -1.57),
      new THREE.Vector3(-0.75, 0.5, -1.57),
      new THREE.Vector3(-0.5, 0.5, -1.57),
      new THREE.Vector3(-0.25, 0.5, -1.57),
      new THREE.Vector3(-0, 0.5, -1.57),
      new THREE.Vector3(0.25, 0.51, -1.57),
      new THREE.Vector3(0.5, 0.52, -1.57),
      new THREE.Vector3(0.75, 0.53, -1.57),
      new THREE.Vector3(1, 0.54, -1.57),
      new THREE.Vector3(1.25, 0.55, -1.57),
      new THREE.Vector3(1.57, 0.55, -1.57),
      new THREE.Vector3(1.57, 0.55, -1.50),
      new THREE.Vector3(1.3, 0.55, -1.2),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas2(rectPoints, 0x0000ff, 0, 1, -1.7 + i * 3.2, 0);
    }

    const rectPointsverdes1 = [
      new THREE.Vector3(2.2, 0.5, 0.4),
      new THREE.Vector3(2.6, 0.5, 0.4),
      new THREE.Vector3(2.6, 0.5, 0.5),
      new THREE.Vector3(2.4, 0.5, 0.8),
      new THREE.Vector3(2.2, 0.5, 1),
      new THREE.Vector3(2, 0.5, 1.2),
      new THREE.Vector3(1.8, 0.5, 1.4),
      new THREE.Vector3(1.6, 0.5, 1.6),
      new THREE.Vector3(1.4, 0.5, 1.8),
      new THREE.Vector3(1.2, 0.5, 2),
      new THREE.Vector3(1, 0.5, 2.2),
      new THREE.Vector3(0.8, 0.5, 2.4),
      new THREE.Vector3(0.7, 0.5, 2.5),

      new THREE.Vector3(0.5, 0.5, 2.6),
      new THREE.Vector3(0.3, 0.5, 2.4),
      new THREE.Vector3(0.1, 0.5, 2.2),
      new THREE.Vector3(-0.1, 0.5, 2),
      new THREE.Vector3(-0.3, 0.5, 1.8),
      new THREE.Vector3(-0.5, 0.5, 1.6),
      new THREE.Vector3(-0.7, 0.5, 1.4),
      new THREE.Vector3(-0.9, 0.5, 1.2),
      new THREE.Vector3(-1.1, 0.5, 1),
      new THREE.Vector3(-1.3, 0.5, 0.8),
      new THREE.Vector3(-1.6, 0.5, 0.5),

      new THREE.Vector3(-1.4, 0.5, 0.2),
      new THREE.Vector3(-1.2, 0.5, 0),
      new THREE.Vector3(-1, 0.5, -0.2),
      new THREE.Vector3(-0.8, 0.5, -0.4),
      new THREE.Vector3(-0.6, 0.5, -0.6),
      new THREE.Vector3(-0.4, 0.5, -0.8),
      new THREE.Vector3(-0.2, 0.5, -1),
      new THREE.Vector3(0, 0.5, -1.2),
      new THREE.Vector3(0.2, 0.5, -1.4),
      new THREE.Vector3(0.5, 0.5, -1.6),

      new THREE.Vector3(0.7, 0.5, -1.4),
      new THREE.Vector3(0.9, 0.5, -1.2),
      new THREE.Vector3(1.1, 0.5, -1),
      new THREE.Vector3(1.3, 0.5, -0.8),
      new THREE.Vector3(1.5, 0.5, -0.6),
      new THREE.Vector3(1.7, 0.5, -0.4),
      new THREE.Vector3(1.9, 0.51, -0.2),
      new THREE.Vector3(2.1, 0.52, 0),
      new THREE.Vector3(2.3, 0.53, 0.2),
      new THREE.Vector3(2.5, 0.54, 0.4),
      new THREE.Vector3(2.6, 0.55, 0.5),
      new THREE.Vector3(2.6, 0.55, 0.6),
      new THREE.Vector3(2.2, 0.55, 0.6),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas2(rectPointsverdes1, 0x00ff00, 0, 0, -1.4 + i * 3.2, 0);
    }

    const rectPointsverdes2 = [
      new THREE.Vector3(-1, 0.5, 0.6),
      new THREE.Vector3(-1.6, 0.5, 0.6),
      new THREE.Vector3(-1.6, 0.5, 0.4),
      new THREE.Vector3(-1.4, 0.5, 0.2),
      new THREE.Vector3(-1.2, 0.5, 0),
      new THREE.Vector3(-1, 0.5, -0.2),
      new THREE.Vector3(-0.8, 0.5, -0.4),
      new THREE.Vector3(-0.6, 0.5, -0.6),
      new THREE.Vector3(-0.4, 0.5, -0.8),
      new THREE.Vector3(-0.2, 0.5, -1),
      new THREE.Vector3(0, 0.5, -1.2),
      new THREE.Vector3(0.2, 0.5, -1.4),
      new THREE.Vector3(0.5, 0.5, -1.6),

      new THREE.Vector3(0.7, 0.5, -1.4),
      new THREE.Vector3(0.9, 0.5, -1.2),
      new THREE.Vector3(1.1, 0.5, -1),
      new THREE.Vector3(1.3, 0.5, -0.8),
      new THREE.Vector3(1.5, 0.5, -0.6),
      new THREE.Vector3(1.7, 0.5, -0.4),
      new THREE.Vector3(1.9, 0.5, -0.2),
      new THREE.Vector3(2.1, 0.5, 0),
      new THREE.Vector3(2.3, 0.5, 0.2),
      new THREE.Vector3(2.5, 0.5, 0.4),
      new THREE.Vector3(2.6, 0.5, 0.5),
      new THREE.Vector3(2.6, 0.5, 0.6),

      new THREE.Vector3(2.4, 0.5, 0.8),
      new THREE.Vector3(2.2, 0.5, 1),
      new THREE.Vector3(2, 0.5, 1.2),
      new THREE.Vector3(1.8, 0.5, 1.4),
      new THREE.Vector3(1.6, 0.5, 1.6),
      new THREE.Vector3(1.4, 0.5, 1.8),
      new THREE.Vector3(1.2, 0.5, 2),
      new THREE.Vector3(1, 0.5, 2.2),
      new THREE.Vector3(0.8, 0.5, 2.4),
      new THREE.Vector3(0.7, 0.5, 2.5),

      new THREE.Vector3(0.5, 0.5, 2.6),
      new THREE.Vector3(0.3, 0.5, 2.4),
      new THREE.Vector3(0.1, 0.5, 2.2),
      new THREE.Vector3(-0.1, 0.5, 2),
      new THREE.Vector3(-0.3, 0.5, 1.8),
      new THREE.Vector3(-0.5, 0.5, 1.6),
      new THREE.Vector3(-0.7, 0.51, 1.4),
      new THREE.Vector3(-0.9, 0.52, 1.2),
      new THREE.Vector3(-1.1, 0.53, 1),
      new THREE.Vector3(-1.3, 0.54, 0.8),
      new THREE.Vector3(-1.6, 0.55, 0.6),
      new THREE.Vector3(-1.6, 0.55, 0.4),
      new THREE.Vector3(-1, 0.55, 0.4),
    ];

    for (let i = 0; i < 1; i++) {
      createMeshLineVarillas2(rectPointsverdes2, 0x00ff00, 0, 0, 0.2 + i * 2, 0);
    }

    //Agregar rectangulos Amarillos
    const rectPointsAmarillos2 = [
      //Linea Derecha Vertical
      new THREE.Vector3(2.1, 0, -0.2),
      new THREE.Vector3(2.45, 0, -0.6),
      new THREE.Vector3(2.6, 0, -0.6),
      new THREE.Vector3(2.6, 0, -0.25),
      new THREE.Vector3(2.6, 0, 0),
      new THREE.Vector3(2.6, 0, 0.25),
      new THREE.Vector3(2.6, 0, 0.5),
      new THREE.Vector3(2.6, 0, 0.75),
      new THREE.Vector3(2.6, 0, 1),
      new THREE.Vector3(2.6, 0, 1.25),
      new THREE.Vector3(2.55, 0, 1.6),

      //Linea Superior Horizontal
      new THREE.Vector3(2.25, 0, 1.6),
      new THREE.Vector3(2, 0, 1.6),
      new THREE.Vector3(1.75, 0, 1.6),
      new THREE.Vector3(1.5, 0, 1.6),
      new THREE.Vector3(1.25, 0, 1.6),
      new THREE.Vector3(1, 0, 1.6),
      new THREE.Vector3(0.75, 0, 1.6),
      new THREE.Vector3(0.5, 0, 1.6),
      new THREE.Vector3(0.25, 0, 1.6),
      new THREE.Vector3(0, 0, 1.6),
      new THREE.Vector3(-0.25, 0, 1.6),
      new THREE.Vector3(-0.5, 0, 1.6),
      new THREE.Vector3(-0.75, 0, 1.6),
      new THREE.Vector3(-1, 0, 1.6),
      new THREE.Vector3(-1.25, 0, 1.6),
      new THREE.Vector3(-1.6, 0, 1.6),

      //Linea Izquierda Vertical
      new THREE.Vector3(-1.6, 0, 1.25),
      new THREE.Vector3(-1.6, 0, 1),
      new THREE.Vector3(-1.6, 0, 0.75),
      new THREE.Vector3(-1.6, 0, 0.5),
      new THREE.Vector3(-1.6, 0, 0.25),
      new THREE.Vector3(-1.6, 0, 0),
      new THREE.Vector3(-1.6, 0, -0.25),
      new THREE.Vector3(-1.6, 0, -0.6),

      //Linea Inferior Horizontal
      new THREE.Vector3(-1.25, 0, -0.6),
      new THREE.Vector3(-1, 0, -0.6),
      new THREE.Vector3(-0.75, 0, -0.6),
      new THREE.Vector3(-0.5, 0, -0.6),
      new THREE.Vector3(-0.25, 0, -0.6),
      new THREE.Vector3(0, 0, -0.6),
      new THREE.Vector3(0.25, 0, -0.6),
      new THREE.Vector3(0.5, 0, -0.6),
      new THREE.Vector3(0.75, 0, -0.6),
      new THREE.Vector3(1, 0, -0.6),
      new THREE.Vector3(1.25, 0, -0.6),
      new THREE.Vector3(1.5, 0.01, -0.6),
      new THREE.Vector3(1.75, 0.02, -0.6),
      new THREE.Vector3(2, 0.03, -0.6),
      new THREE.Vector3(2.25, 0.04, -0.6),
      new THREE.Vector3(2.6, 0.05, -0.6),
      new THREE.Vector3(2.6, 0.05, -0.45),
      new THREE.Vector3(2.3, 0.05, 0),
    ];

    for (let i = 0; i < 1; i++) {
      createMeshLineVarillas2(rectPointsAmarillos2, 0xffff00, 0, 0, 0.5 + i * 2, 0);
    }

    //Agregar rectangulos Amarillos
    const rectPointsAmarillos3 = [
      //Linea Derecha Vertical
      new THREE.Vector3(1.1, 0, 2.3),
      new THREE.Vector3(1.45, 0, 2.55),
      new THREE.Vector3(1.55, 0, 2.55),
      new THREE.Vector3(1.55, 0, 2.25),
      new THREE.Vector3(1.55, 0, 2),
      new THREE.Vector3(1.55, 0, 1.75),
      new THREE.Vector3(1.55, 0, 1.5),
      new THREE.Vector3(1.55, 0, 1.25),
      new THREE.Vector3(1.55, 0, 1),
      new THREE.Vector3(1.55, 0, 0.75),
      new THREE.Vector3(1.55, 0, 0.5),
      new THREE.Vector3(1.55, 0, 0.25),
      new THREE.Vector3(1.55, 0, 0),
      new THREE.Vector3(1.55, 0, -0.25),
      new THREE.Vector3(1.55, 0, -0.5),
      new THREE.Vector3(1.55, 0, -0.75),
      new THREE.Vector3(1.55, 0, -1),
      new THREE.Vector3(1.55, 0, -1.25),
      new THREE.Vector3(1.55, 0, -1.55),

      //Linea Superior Horizontal
      new THREE.Vector3(1.25, 0, -1.55),
      new THREE.Vector3(1, 0, -1.55),
      new THREE.Vector3(0.75, 0, -1.55),
      new THREE.Vector3(0.5, 0, -1.55),
      new THREE.Vector3(0.25, 0, -1.55),
      new THREE.Vector3(0, 0, -1.55),
      new THREE.Vector3(-0.25, 0, -1.55),
      new THREE.Vector3(-0.55, 0, -1.55),

      //Linea Izquierda Vertical
      new THREE.Vector3(-0.55, 0, -1.25),
      new THREE.Vector3(-0.55, 0, -1),
      new THREE.Vector3(-0.55, 0, -0.75),
      new THREE.Vector3(-0.55, 0, -0.5),
      new THREE.Vector3(-0.55, 0, -0.25),
      new THREE.Vector3(-0.55, 0, 0),
      new THREE.Vector3(-0.55, 0, 0.25),
      new THREE.Vector3(-0.55, 0, 0.5),
      new THREE.Vector3(-0.55, 0, 0.75),
      new THREE.Vector3(-0.55, 0, 1),
      new THREE.Vector3(-0.55, 0, 1.25),
      new THREE.Vector3(-0.55, 0, 1.5),
      new THREE.Vector3(-0.55, 0, 1.75),
      new THREE.Vector3(-0.55, 0, 2),
      new THREE.Vector3(-0.55, 0, 2.25),
      new THREE.Vector3(-0.55, 0, 2.55),

      //Linea Inferior Horizontal
      new THREE.Vector3(-0.5, 0, 2.55),
      new THREE.Vector3(-0.25, 0, 2.55),
      new THREE.Vector3(0, 0, 2.55),
      new THREE.Vector3(0.25, 0, 2.55),
      new THREE.Vector3(0.5, 0.01, 2.55),
      new THREE.Vector3(0.75, 0.02, 2.55),
      new THREE.Vector3(1, 0.03, 2.55),
      new THREE.Vector3(1.25, 0.04, 2.55),
      new THREE.Vector3(1.6, 0.05, 2.55),
      new THREE.Vector3(1.6, 0.05, 2.45),
      new THREE.Vector3(1.3, 0.05, 2.1),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas2(rectPointsAmarillos3, 0xffff00, 0, 0, -1 + i * 3.2, 0);
    }

    //Agregar rectangulos Amarillos
    const rectPointsAmarillos12 = [
      //Linea Izquierda Vertical
      new THREE.Vector3(-1.2, 0, 1.4),
      new THREE.Vector3(-1.4, 0, 1.55),
      new THREE.Vector3(-1.55, 0, 1.55),
      new THREE.Vector3(-1.55, 0, 1.25),
      new THREE.Vector3(-1.55, 0, 1),
      new THREE.Vector3(-1.55, 0, 0.75),
      new THREE.Vector3(-1.55, 0, 0.5),
      new THREE.Vector3(-1.55, 0, 0.25),
      new THREE.Vector3(-1.55, 0, 0),
      new THREE.Vector3(-1.55, 0, -0.25),
      new THREE.Vector3(-1.55, 0, -0.55),

      //Linea Inferior Horizontal
      new THREE.Vector3(-1.25, 0, -0.55),
      new THREE.Vector3(-1, 0, -0.55),
      new THREE.Vector3(-0.75, 0, -0.55),
      new THREE.Vector3(-0.5, 0, -0.55),
      new THREE.Vector3(-0.25, 0, -0.55),
      new THREE.Vector3(0, 0, -0.55),
      new THREE.Vector3(0.25, 0, -0.55),
      new THREE.Vector3(0.5, 0, -0.55),
      new THREE.Vector3(0.75, 0, -0.55),
      new THREE.Vector3(1, 0, -0.55),
      new THREE.Vector3(1.25, 0, -0.55),
      new THREE.Vector3(1.5, 0, -0.55),
      new THREE.Vector3(1.75, 0, -0.55),
      new THREE.Vector3(2, 0, -0.55),
      new THREE.Vector3(2.25, 0, -0.55),
      new THREE.Vector3(2.5, 0, -0.55),

      //Linea Derecha Vertical
      new THREE.Vector3(2.55, 0, -0.55),
      new THREE.Vector3(2.55, 0, -0.25),
      new THREE.Vector3(2.55, 0, 0),
      new THREE.Vector3(2.55, 0, 0.25),
      new THREE.Vector3(2.55, 0, 0.5),
      new THREE.Vector3(2.55, 0, 0.75),
      new THREE.Vector3(2.55, 0, 1),
      new THREE.Vector3(2.55, 0, 1.25),
      new THREE.Vector3(2.55, 0, 1.55),

      //Linea Superior Horizontal
      new THREE.Vector3(2.25, 0, 1.55),
      new THREE.Vector3(2, 0, 1.55),
      new THREE.Vector3(1.75, 0, 1.55),
      new THREE.Vector3(1.5, 0, 1.55),
      new THREE.Vector3(1.25, 0, 1.55),
      new THREE.Vector3(1, 0, 1.55),
      new THREE.Vector3(0.75, 0, 1.55),
      new THREE.Vector3(0.5, 0, 1.55),
      new THREE.Vector3(0.25, 0, 1.55),
      new THREE.Vector3(0, 0, 1.55),
      new THREE.Vector3(-0.25, 0, 1.55),
      new THREE.Vector3(-0.5, 0.01, 1.55),
      new THREE.Vector3(-0.75, 0.02, 1.55),
      new THREE.Vector3(-1, 0.03, 1.55),
      new THREE.Vector3(-1.25, 0.04, 1.55),
      new THREE.Vector3(-1.55, 0.05, 1.55),
      new THREE.Vector3(-1.55, 0.05, 1.4),
      new THREE.Vector3(-1.4, 0.05, 1.2),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas2(rectPointsAmarillos12, 0xffff00, 0, 0, -1.1 + i * 3.2, 0);
    }

    //Agregar rectangulos Amarillos
    const rectPointsAmarillos32 = [
      //Linea Izquierda Vertical
      new THREE.Vector3(-0.1, 0, -1.2),
      new THREE.Vector3(-0.45, 0, -1.6),
      new THREE.Vector3(-0.6, 0, -1.6),
      new THREE.Vector3(-0.6, 0, -1.25),
      new THREE.Vector3(-0.6, 0, -1),
      new THREE.Vector3(-0.6, 0, -0.75),
      new THREE.Vector3(-0.6, 0, -0.5),
      new THREE.Vector3(-0.6, 0, -0.25),
      new THREE.Vector3(-0.6, 0, 0),
      new THREE.Vector3(-0.6, 0, 0.25),
      new THREE.Vector3(-0.6, 0, 0.5),
      new THREE.Vector3(-0.6, 0, 0.75),
      new THREE.Vector3(-0.6, 0, 1),
      new THREE.Vector3(-0.6, 0, 1.25),
      new THREE.Vector3(-0.6, 0, 1.5),
      new THREE.Vector3(-0.6, 0, 1.75),
      new THREE.Vector3(-0.6, 0, 2),
      new THREE.Vector3(-0.6, 0, 2.25),
      new THREE.Vector3(-0.6, 0, 2.6),

      //Linea Inferior Horizontal
      new THREE.Vector3(-0.6, 0, 2.6),
      new THREE.Vector3(-0.25, 0, 2.6),
      new THREE.Vector3(0, 0, 2.6),
      new THREE.Vector3(0.25, 0, 2.6),
      new THREE.Vector3(0.5, 0, 2.6),
      new THREE.Vector3(0.75, 0, 2.6),
      new THREE.Vector3(1, 0, 2.6),
      new THREE.Vector3(1.25, 0, 2.6),
      new THREE.Vector3(1.6, 0, 2.6),

      //Linea Derecha Vertical
      new THREE.Vector3(1.6, 0, 2.25),
      new THREE.Vector3(1.6, 0, 2),
      new THREE.Vector3(1.6, 0, 1.75),
      new THREE.Vector3(1.6, 0, 1.5),
      new THREE.Vector3(1.6, 0, 1.25),
      new THREE.Vector3(1.6, 0, 1),
      new THREE.Vector3(1.6, 0, 0.75),
      new THREE.Vector3(1.6, 0, 0.5),
      new THREE.Vector3(1.6, 0, 0.25),
      new THREE.Vector3(1.6, 0, 0),
      new THREE.Vector3(1.6, 0, -0.25),
      new THREE.Vector3(1.6, 0, -0.5),
      new THREE.Vector3(1.6, 0, -0.75),
      new THREE.Vector3(1.6, 0, -1),
      new THREE.Vector3(1.6, 0, -1.25),
      new THREE.Vector3(1.6, 0, -1.6),

      //Linea Superior Horizontal
      new THREE.Vector3(1.25, 0, -1.6),
      new THREE.Vector3(1, 0, -1.6),
      new THREE.Vector3(0.75, 0, -1.6),
      new THREE.Vector3(0.5, 0.01, -1.6),
      new THREE.Vector3(0.25, 0.02, -1.6),
      new THREE.Vector3(0, 0.03, -1.6),
      new THREE.Vector3(-0.25, 0.04, -1.6),
      new THREE.Vector3(-0.6, 0.05, -1.6),
      new THREE.Vector3(-0.6, 0.05, -1.45),
      new THREE.Vector3(-0.3, 0.05, -1.1),
    ];

    for (let i = 0; i < 1; i++) {
      createMeshLineVarillas2(rectPointsAmarillos32, 0xffff00, 0, 0, 0.6 + i * 3.2, 0);
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
