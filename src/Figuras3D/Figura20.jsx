import { useEffect, useRef } from "react";
import * as THREE from "three";
import { MeshLine, MeshLineMaterial } from "three.meshline"; // Importamos MeshLine
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const ThreeScene = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());
  const controlsRef = useRef(null);
  const textureRef = useRef(null);
  useEffect(() => {
    const scene = sceneRef.current;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );

    // 1. Configuración inicial
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // 2. Configuración de cámara
    camera.position.set(40.5, 40.5, 40.5);
    camera.lookAt(2.5, 2.5, 2.5);

    // 3. Controles
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;

    // 4. Manejo de redimensionado (Nuevo)
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

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

    textureRef.current = new THREE.CanvasTexture(canvas);
    scene.background = textureRef.current;

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
    const geometry11 = new THREE.BoxGeometry(3, 7, 4);
    const materials11 = [
      new THREE.MeshLambertMaterial({
        color: 0x919191,
        opacity: 0.5,
        transparent: true,
        alphaTest: 0.5 // ← Esto falta
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
        opacity: 0,
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
    const cube11 = new THREE.Mesh(geometry11, materials11);
    cube11.position.set(0, 19, 0);
    scene.add(cube11);

    // Crear un cubo con materiales transparentes
    const geometry12 = new THREE.BoxGeometry(3, 7, 4);
    const materials12 = [
      new THREE.MeshLambertMaterial({
        color: 0x919191,
        opacity: 0.5,
        transparent: true,
        alphaTest: 0.5 // ← Esto falta
      }),
      new THREE.MeshLambertMaterial({
        color: 0x222222,
        opacity: 0.5,
        transparent: true,
      }),
      new THREE.MeshLambertMaterial({
        color: 0xf2f2f2,
        opacity: 0,
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

    const cube12 = new THREE.Mesh(geometry12, materials12);
    cube12.position.set(0, 18.75 * -1, 0);
    scene.add(cube12);

    // Crear un cubo con materiales transparentes
    const geometry = new THREE.BoxGeometry(3, 27.5, 4);
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
        opacity: 0,
        transparent: true,
      }),
      new THREE.MeshLambertMaterial({
        color: 0x222222,
        opacity: 0,
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
    cube.position.set(0, 0.5, 0);
    scene.add(cube);

    // Crear un cubo con materiales transparentes
    const geometry2 = new THREE.BoxGeometry(9.4, 2, 7.4);
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
    cube2.position.set(0, 15.25, 0);
    scene.add(cube2);

    const cube7 = new THREE.Mesh(geometry2, materials2);
    cube7.position.set(0, 15.25 * -1 + 1, 0);
    scene.add(cube7);

    // Crear un cubo con materiales transparentes
    const geometry3 = new THREE.BoxGeometry(7.74, 2, 2.6);
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
        opacity: 0,
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
    const cube3 = new THREE.Mesh(geometry3, materials3);
    cube3.position.set(5.37175, 13.25, 0);
    scene.add(cube3);

    const cube34 = new THREE.Mesh(geometry3, materials3);
    cube34.position.set(5.37175 * -1, 13.25, 0);
    scene.add(cube34);

    const geometry32 = new THREE.BoxGeometry(4.545, 2, 2.6);
    const materials32 = [
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
        opacity: 0,
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
    const cube32 = new THREE.Mesh(geometry32, materials32);
    cube32.position.set(6.97, 15.25, 0);
    scene.add(cube32);

    const materials321 = [
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
        opacity: 0,
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

    const cube33 = new THREE.Mesh(geometry32, materials321);
    cube33.position.set(6.97 * -1, 15.25, 0);
    scene.add(cube33);

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
      // Crear geometría de la línea
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(100));

      // Crear MeshLine y material
      const meshLine = new MeshLine();
      meshLine.setGeometry(lineGeometry);

      const meshLineMaterial = new MeshLineMaterial({
        color,
        lineWidth: 0.2,
        sizeAttenuation: 1,
      });

      // Crear malla de la línea y agregarla a la escena
      const lineMesh = new THREE.Mesh(meshLine, meshLineMaterial);
      lineMesh.position.x += xPosition;
      lineMesh.position.y = yPosition;
      lineMesh.position.z += zOffset;
      scene.add(lineMesh);
      return lineMesh;
    };

    // Líneas azules 1
    const VarillasRojas = [
      new THREE.Vector3(1, 22, 1.6),
      new THREE.Vector3(1, -2, 1.6),
      new THREE.Vector3(1, -8, 1.3),
      new THREE.Vector3(1, -22, 1.3),
    ];

    for (let i = 0; i > -3; i--) {
      createMeshLineVarillas(VarillasRojas, 0xff0000, 0, i, 0, -0.1);
    }

    // Líneas azules 1
    const VarillasRojas2 = [
      new THREE.Vector3(1, 22, 1.5),
      new THREE.Vector3(1, -22, 1.5),
    ];

    for (let i = 0; i > -2; i--) {
      createMeshLineVarillas(VarillasRojas2, 0xff0000, 0, i * 2, 0, -1.6);
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
        lineWidth: 0.2,
        sizeAttenuation: 1,
      });

      // Crear malla de la línea y agregarla a la escena
      const lineMesh = new THREE.Mesh(meshLine, meshLineMaterial);
      lineMesh.position.x += xPosition;
      lineMesh.position.y = yPosition;
      lineMesh.position.z += zOffset;
      scene.add(lineMesh);
    };

    // Líneas azules 1
    const VarillasRojas223 = [
      new THREE.Vector3(1, 22, 1.5),
      new THREE.Vector3(1, -3, 1.5),
      new THREE.Vector3(1, -8, 1.65),
      new THREE.Vector3(1, -22, 1.65),
    ];

    for (let i = 0; i > -3; i--) {
      createMeshLineVarillas2(VarillasRojas223, 0xff0000, 0, i, 0, -3.1);
    }

    // Crear y agregar Varillas Amarillas con MeshLine
    const createMeshLineVarillas3 = (
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
        lineWidth: 0.2,
        sizeAttenuation: 1,
      });

      // Crear malla de la línea y agregarla a la escena
      const lineMesh = new THREE.Mesh(meshLine, meshLineMaterial);
      lineMesh.position.x += xPosition;
      lineMesh.position.y = yPosition;
      lineMesh.position.z += zOffset;
      scene.add(lineMesh);
    };

    // Líneas azules 1
    const VarillasAmarillas = [
      new THREE.Vector3(1, -8, -1.65),
      new THREE.Vector3(1, -22, -1.65),
    ];

    for (let i = 0; i > -3; i--) {
      for (let j = 0; j > -2; j--) {
        createMeshLineVarillas3(VarillasAmarillas, 0xffff00, 0, i, 0, -j * 3);
      }
    }

    // Líneas azules 1
    const VarillasAmarillas2 = [
      new THREE.Vector3(1, 22, -1.4),
      new THREE.Vector3(1, 16, -1.4),
    ];

    for (let i = 0; i > -3; i--) {
      for (let j = 0; j > -2; j--) {
        createMeshLineVarillas3(
          VarillasAmarillas2,
          0xffff00,
          0,
          i,
          0,
          -j * 2.7
        );
      }
    }

    // Crear y agregar líneas con MeshLine
    const createMeshLine = (
      points,
      color,
      lineWidth,
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
        lineWidth: 0.15,
        sizeAttenuation: 1,
      });

      // Crear malla de la línea y agregarla a la escena
      const lineMesh = new THREE.Mesh(meshLine, meshLineMaterial);
      lineMesh.position.y = yPosition;
      lineMesh.position.z += zOffset;
      scene.add(lineMesh);
    };

    // Líneas azules 1
    const rectPointsa2 = [
      new THREE.Vector3(-9, 0.5, 0.4),
      new THREE.Vector3(9, 0.5, 0.4),
    ];
    Array.from({ length: 3 }, (_, i) =>
      createMeshLine(rectPointsa2, 0x0000ff, 0.1, 12.5, -i + 0.6)
    );

    // Crear y agregar Varillas con MeshLine
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
        lineWidth: 0.1,
        sizeAttenuation: 0.5,
      });

      // Crear malla de la línea y agregarla a la escena
      const lineMesh = new THREE.Mesh(meshLine, meshLineMaterial);
      lineMesh.position.x += xPosition;
      lineMesh.position.y = yPosition;
      lineMesh.position.z += zOffset;
      scene.add(lineMesh);
    };

    // Líneas azules 2
    const rectPointsEstribos = [
      new THREE.Vector3(0.7, 0.5, -0.7),
      new THREE.Vector3(1.2, 0.5, -1.3),
      new THREE.Vector3(1.2, 0.5, -1.5),
      new THREE.Vector3(1.2, 0.5, -1.675),
      new THREE.Vector3(1, 0.5, -1.675),
      new THREE.Vector3(0.8, 0.5, -1.675),
      new THREE.Vector3(0.6, 0.5, -1.675),
      new THREE.Vector3(0.4, 0.5, -1.675),
      new THREE.Vector3(0.2, 0.5, -1.675),
      new THREE.Vector3(0, 0.5, -1.675),
      new THREE.Vector3(-0.2, 0.5, -1.675),
      new THREE.Vector3(-0.4, 0.5, -1.675),
      new THREE.Vector3(-0.6, 0.5, -1.675),
      new THREE.Vector3(-0.8, 0.5, -1.675),
      new THREE.Vector3(-1, 0.5, -1.675),
      new THREE.Vector3(-1.125, 0.5, -1.675),

      new THREE.Vector3(-1.125, 0.5, -1.5),
      new THREE.Vector3(-1.125, 0.5, -1.4),
      new THREE.Vector3(-1.125, 0.5, -1.2),
      new THREE.Vector3(-1.125, 0.5, 1.4),
      new THREE.Vector3(-1.125, 0.5, 1.5),
      new THREE.Vector3(-1.125, 0.5, 1.675),

      new THREE.Vector3(-1, 0.5, 1.675),
      new THREE.Vector3(-0.8, 0.5, 1.675),
      new THREE.Vector3(-0.6, 0.5, 1.675),
      new THREE.Vector3(0.8, 0.5, 1.675),
      new THREE.Vector3(1, 0.5, 1.675),
      new THREE.Vector3(1.1, 0.5, 1.675),

      new THREE.Vector3(1.1, 0.5, 1.5),
      new THREE.Vector3(1.1, 0.5, 1.4),
      new THREE.Vector3(1.1, 0.5, 1.2),
      new THREE.Vector3(1.1, 0.62, -1.7),
      new THREE.Vector3(1, 0.65, -1.7),
      new THREE.Vector3(0.8, 0.65, -1.7),
      new THREE.Vector3(0.2, 0.65, -1.2),
    ];
    Array.from({ length: 5 }, (_, i) =>
      createMeshLineEstribos(
        rectPointsEstribos,
        0x0000ff,
        0,
        0,
        21 - i * 1.1,
        0
      )
    );

    // Líneas azules 2
    const rectPointsEstribos2 = [
      new THREE.Vector3(-0.6, 0.5, 0.6),
      new THREE.Vector3(-1.15, 0.5, 1.2),
      new THREE.Vector3(-1.15, 0.5, 1.6),
      new THREE.Vector3(-1, 0.5, 1.6),
      new THREE.Vector3(-0.8, 0.5, 1.6),
      new THREE.Vector3(-0.6, 0.5, 1.6),
      new THREE.Vector3(-0.4, 0.5, 1.6),
      new THREE.Vector3(-0.2, 0.5, 1.6),
      new THREE.Vector3(-0, 0.5, 1.6),
      new THREE.Vector3(0.2, 0.5, 1.6),
      new THREE.Vector3(0.4, 0.5, 1.6),
      new THREE.Vector3(0.6, 0.5, 1.6),
      new THREE.Vector3(0.8, 0.5, 1.6),
      new THREE.Vector3(1, 0.5, 1.6),
      new THREE.Vector3(1.15, 0.5, 1.6),

      new THREE.Vector3(1.15, 0.5, 1.5),
      new THREE.Vector3(1.15, 0.5, 1.4),
      new THREE.Vector3(1.15, 0.5, 1.2),
      new THREE.Vector3(1.15, 0.5, -1.4),
      new THREE.Vector3(1.15, 0.5, -1.5),
      new THREE.Vector3(1.15, 0.5, -1.7),

      new THREE.Vector3(1.15, 0.5, -1.7),
      new THREE.Vector3(1, 0.5, -1.7),
      new THREE.Vector3(0.8, 0.5, -1.7),
      new THREE.Vector3(0.6, 0.5, -1.7),
      new THREE.Vector3(0.4, 0.5, -1.7),
      new THREE.Vector3(0.2, 0.5, -1.7),
      new THREE.Vector3(0, 0.5, -1.7),
      new THREE.Vector3(-0.2, 0.5, -1.7),
      new THREE.Vector3(-0.4, 0.5, -1.7),
      new THREE.Vector3(-0.6, 0.5, -1.7),
      new THREE.Vector3(-0.8, 0.5, -1.7),
      new THREE.Vector3(-1, 0.5, -1.7),
      new THREE.Vector3(-1.15, 0.5, -1.7),

      new THREE.Vector3(-1.15, 0.5, -1.5),
      new THREE.Vector3(-1.15, 0.5, -1.4),
      new THREE.Vector3(-1.15, 0.5, -1.2),
      new THREE.Vector3(-1.15, 0.56, 1.4),
      new THREE.Vector3(-1.15, 0.58, 1.5),
      new THREE.Vector3(-1.15, 0.6, 1.7),
      new THREE.Vector3(-1, 0.62, 1.7),
      new THREE.Vector3(-0.4, 0.65, 1.1),
    ];
    Array.from({ length: 5 }, (_, i) =>
      createMeshLineEstribos(
        rectPointsEstribos2,
        0x0000ff,
        0,
        0,
        21 - 0.5 - i * 1.1,
        0
      )
    );

    Array.from({ length: 4 }, (_, i) =>
      createMeshLineEstribos(rectPointsEstribos, 0x0000ff, 0, 0, 10.5 - i, 0)
    );

    Array.from({ length: 4 }, (_, i) =>
      createMeshLineEstribos(
        rectPointsEstribos2,
        0x0000ff,
        0,
        0,
        10.5 - 0.5 - i,
        0
      )
    );

    Array.from({ length: 3 }, (_, i) =>
      createMeshLineEstribos(rectPointsEstribos, 0x0000ff, 0, 0, 5.25 - i * 3.5, 0)
    );

    Array.from({ length: 4 }, (_, i) =>
      createMeshLineEstribos(rectPointsEstribos2, 0x0000ff, 0, 0, 7 - i * 3.5, 0)
    );

    // Líneas azules 2
    const rectPointsEstribos31 = [
      new THREE.Vector3(0.7, 0.5, -0.7),
      new THREE.Vector3(1.2, 0.5, -1.3),
      new THREE.Vector3(1.2, 0.5, -1.5),
      new THREE.Vector3(1.2, 0.5, -1.675),
      new THREE.Vector3(1, 0.5, -1.675),
      new THREE.Vector3(0.8, 0.5, -1.675),
      new THREE.Vector3(-1, 0.5, -1.675),
      new THREE.Vector3(-1.125, 0.5, -1.675),

      new THREE.Vector3(-1.125, 0.5, -1.5),
      new THREE.Vector3(-1.125, 0.5, -1.4),
      new THREE.Vector3(-1.125, 0.5, -1.2),
      new THREE.Vector3(-1.125, 0.5, 1.2),
      new THREE.Vector3(-1.125, 0.5, 1.3),

      new THREE.Vector3(-1, 0.5, 1.5),
      new THREE.Vector3(-0.8, 0.5, 1.5),
      new THREE.Vector3(-0.6, 0.5, 1.5),
      new THREE.Vector3(0.8, 0.5, 1.5),
      new THREE.Vector3(1, 0.5, 1.5),
      new THREE.Vector3(1.1, 0.5, 1.5),

      new THREE.Vector3(1.1, 0.5, 1.3),
      new THREE.Vector3(1.1, 0.5, 1.2),
      new THREE.Vector3(1.1, 0.62, -1.7),
      new THREE.Vector3(1, 0.65, -1.7),
      new THREE.Vector3(0.8, 0.65, -1.7),
      new THREE.Vector3(0.2, 0.65, -1.2),
    ];
    Array.from({ length: 5 }, (_, i) =>
      createMeshLineEstribos(
        rectPointsEstribos,
        0x0000ff,
        0,
        0,
        21 - i * 1.1,
        0
      )
    );

    Array.from({ length: 1 }, (_, i) =>
      createMeshLineEstribos(rectPointsEstribos31, 0x0000ff, 0, 0, -4.15 + (i-1), 0)
    );

    // Líneas azules 2
    const rectPointsEstribos3 = [
      new THREE.Vector3(0.7, 0.5, -0.7),
      new THREE.Vector3(1.2, 0.5, -1.3),
      new THREE.Vector3(1.2, 0.5, -1.5),
      new THREE.Vector3(1.2, 0.5, -1.675),
      new THREE.Vector3(1, 0.5, -1.675),
      new THREE.Vector3(0.8, 0.5, -1.675),
      new THREE.Vector3(-1, 0.5, -1.675),
      new THREE.Vector3(-1.125, 0.5, -1.675),

      new THREE.Vector3(-1.125, 0.5, -1.5),
      new THREE.Vector3(-1.125, 0.5, -1.4),
      new THREE.Vector3(-1.125, 0.5, -1.2),
      new THREE.Vector3(-1.125, 0.5, 1.2),
      new THREE.Vector3(-1.125, 0.5, 1.3),

      new THREE.Vector3(-1, 0.5, 1.4),
      new THREE.Vector3(-0.8, 0.5, 1.4),
      new THREE.Vector3(-0.6, 0.5, 1.4),
      new THREE.Vector3(0.8, 0.5, 1.4),
      new THREE.Vector3(1, 0.5, 1.4),
      new THREE.Vector3(1.1, 0.5, 1.4),

      new THREE.Vector3(1.1, 0.5, 1.3),
      new THREE.Vector3(1.1, 0.5, 1.2),
      new THREE.Vector3(1.1, 0.62, -1.7),
      new THREE.Vector3(1, 0.65, -1.7),
      new THREE.Vector3(0.8, 0.65, -1.7),
      new THREE.Vector3(0.2, 0.65, -1.2),
    ];
    Array.from({ length: 5 }, (_, i) =>
      createMeshLineEstribos(
        rectPointsEstribos,
        0x0000ff,
        0,
        0,
        21 - i * 1.1,
        0
      )
    );

    // Líneas azules 2
    const rectPointsEstribos4 = [
      new THREE.Vector3(-0.6, 0.5, 0.4),
      new THREE.Vector3(-1.15, 0.5, 1),
      new THREE.Vector3(-1.15, 0.5, 1.4),
      new THREE.Vector3(-1, 0.5, 1.4),
      new THREE.Vector3(-0.8, 0.5, 1.4),
      new THREE.Vector3(-0.6, 0.5, 1.4),
      new THREE.Vector3(1, 0.5, 1.4),
      new THREE.Vector3(1.15, 0.5, 1.4),

      new THREE.Vector3(1.15, 0.5, 1.3),
      new THREE.Vector3(1.15, 0.5, 1.2),
      new THREE.Vector3(1.15, 0.5, -1.4),
      new THREE.Vector3(1.15, 0.5, -1.5),
      new THREE.Vector3(1.15, 0.5, -1.7),

      new THREE.Vector3(1.15, 0.5, -1.6),
      new THREE.Vector3(1, 0.5, -1.6),
      new THREE.Vector3(0.8, 0.5, -1.6),
      new THREE.Vector3(0.6, 0.5, -1.6),
      new THREE.Vector3(-0.8, 0.5, -1.6),
      new THREE.Vector3(-1, 0.5, -1.6),
      new THREE.Vector3(-1.15, 0.5, -1.6),

      new THREE.Vector3(-1.15, 0.5, -1.5),
      new THREE.Vector3(-1.15, 0.5, -1.4),
      new THREE.Vector3(-1.15, 0.5, -1.2),
      new THREE.Vector3(-1.15, 0.56, 1.4),
      new THREE.Vector3(-1.15, 0.6, 1.425),
      new THREE.Vector3(-1, 0.62, 1.425),
      new THREE.Vector3(-0.4, 0.65, 0.875),
    ];

    Array.from({ length: 2 }, (_, i) =>
      createMeshLineEstribos(
        rectPointsEstribos3,
        0x0000ff,
        0,
        0,
        -7.2 - i * 1.1,
        0
      )
    );

    Array.from({ length: 2 }, (_, i) =>
      createMeshLineEstribos(
        rectPointsEstribos4,
        0x0000ff,
        0,
        0,
        -6.2 - 0.5 - i * 1.1,
        0
      )
    );

    // Líneas azules 2
    const rectPointsEstribos11 = [
      new THREE.Vector3(0.7, 0.5, -0.7),
      new THREE.Vector3(1.2, 0.5, -1.3),
      new THREE.Vector3(1.2, 0.5, -1.5),
      new THREE.Vector3(1.2, 0.5, -1.675),
      new THREE.Vector3(1, 0.5, -1.675),
      new THREE.Vector3(0.8, 0.5, -1.675),
      new THREE.Vector3(0.6, 0.5, -1.675),
      new THREE.Vector3(-1, 0.5, -1.675),
      new THREE.Vector3(-1.125, 0.5, -1.675),

      new THREE.Vector3(-1.125, 0.5, -1.5),
      new THREE.Vector3(-1.125, 0.5, -1.4),
      new THREE.Vector3(-1.125, 0.5, -1.2),
      new THREE.Vector3(-1.125, 0.5, 1.4),
      new THREE.Vector3(-1.125, 0.5, 1.5),
      new THREE.Vector3(-1.125, 0.5, 1.55),

      new THREE.Vector3(-1, 0.5, 1.55),
      new THREE.Vector3(-0.8, 0.5, 1.55),
      new THREE.Vector3(-0.6, 0.5, 1.55),
      new THREE.Vector3(0.8, 0.5, 1.55),
      new THREE.Vector3(1, 0.5, 1.55),
      new THREE.Vector3(1.1, 0.5, 1.55),

      new THREE.Vector3(1.1, 0.5, 1.5),
      new THREE.Vector3(1.1, 0.5, 1.4),
      new THREE.Vector3(1.1, 0.5, 1.2),
      new THREE.Vector3(1.1, 0.62, -1.7),
      new THREE.Vector3(1, 0.65, -1.7),
      new THREE.Vector3(0.8, 0.65, -1.7),
      new THREE.Vector3(0.2, 0.65, -1.2),
    ];

    // Líneas azules 2
    const rectPointsEstribos22 = [
      new THREE.Vector3(-0.6, 0.5, 0.5),
      new THREE.Vector3(-1.15, 0.5, 1.1),
      new THREE.Vector3(-1.15, 0.5, 1.5),
      new THREE.Vector3(-1, 0.5, 1.5),
      new THREE.Vector3(-0.8, 0.5, 1.5),
      new THREE.Vector3(-0.6, 0.5, 1.5),
      new THREE.Vector3(-0.4, 0.5, 1.5),
      new THREE.Vector3(-0.2, 0.5, 1.5),
      new THREE.Vector3(-0, 0.5, 1.5),
      new THREE.Vector3(0.2, 0.5, 1.5),
      new THREE.Vector3(0.4, 0.5, 1.5),
      new THREE.Vector3(0.6, 0.5, 1.5),
      new THREE.Vector3(0.8, 0.5, 1.5),
      new THREE.Vector3(1, 0.5, 1.5),
      new THREE.Vector3(1.15, 0.5, 1.5),

      new THREE.Vector3(1.15, 0.5, 1.4),
      new THREE.Vector3(1.15, 0.5, 1.2),
      new THREE.Vector3(1.15, 0.5, -1.4),
      new THREE.Vector3(1.15, 0.5, -1.5),
      new THREE.Vector3(1.15, 0.5, -1.7),

      new THREE.Vector3(1.15, 0.5, -1.7),
      new THREE.Vector3(1, 0.5, -1.7),
      new THREE.Vector3(0.8, 0.5, -1.7),
      new THREE.Vector3(0.6, 0.5, -1.7),
      new THREE.Vector3(0.4, 0.5, -1.7),
      new THREE.Vector3(0.2, 0.5, -1.7),
      new THREE.Vector3(0, 0.5, -1.7),
      new THREE.Vector3(-0.2, 0.5, -1.7),
      new THREE.Vector3(-0.4, 0.5, -1.7),
      new THREE.Vector3(-0.6, 0.5, -1.7),
      new THREE.Vector3(-0.8, 0.5, -1.7),
      new THREE.Vector3(-1, 0.5, -1.7),
      new THREE.Vector3(-1.15, 0.5, -1.7),

      new THREE.Vector3(-1.15, 0.5, -1.5),
      new THREE.Vector3(-1.15, 0.5, -1.4),
      new THREE.Vector3(-1.15, 0.5, -1.2),
      new THREE.Vector3(-1.15, 0.56, 1.4),
      new THREE.Vector3(-1.15, 0.6, 1.5),
      new THREE.Vector3(-1, 0.62, 1.5),
      new THREE.Vector3(-0.4, 0.65, 1.0),
    ];

    Array.from({ length: 4 }, (_, i) =>
      createMeshLineEstribos(
        rectPointsEstribos11,
        0x0000ff,
        0,
        0,
        -9.5 - i * 1.1,
        0
      )
    );

    Array.from({ length: 5 }, (_, i) =>
      createMeshLineEstribos(
        rectPointsEstribos22,
        0x0000ff,
        0,
        0,
        -8.5 - 0.5 - i * 1.1,
        0
      )
    );

    Array.from({ length: 5 }, (_, i) =>
      createMeshLineEstribos(
        rectPointsEstribos11,
        0x0000ff,
        0,
        0,
        -17 - i * 1.1,
        0
      )
    );

    Array.from({ length: 5 }, (_, i) =>
      createMeshLineEstribos(
        rectPointsEstribos22,
        0x0000ff,
        0,
        0,
        -17 - 0.5 - i * 1.1,
        0
      )
    );

    const rectPointsVERDE3 = [
      new THREE.Vector3(0.6, 0.8, -0.4),
      new THREE.Vector3(1, 0.8, -0.2),
      new THREE.Vector3(1.2, 0.8, -0.1),
      new THREE.Vector3(1.03, 0.8, 0.05),
      new THREE.Vector3(0.53, 0.8, 0.05),
      new THREE.Vector3(-0.53, 0.8, 0.05),
      new THREE.Vector3(-1.03, 0.8, 0.05),
      new THREE.Vector3(-1.2, 0.8, -0.1),
      new THREE.Vector3(-1, 0.8, -0.2),
      new THREE.Vector3(-0.6, 0.8, -0.4),
    ];

    Array.from({ length: 5 }, (_, i) =>
      createMeshLineEstribos(rectPointsVERDE3, 0x008631, 0, 0, 21 - i * 1.1, 0)
    );
    Array.from({ length: 4 }, (_, i) =>
      createMeshLineEstribos(
        rectPointsVERDE3,
        0x008631,
        0,
        0,
        21 - 0.5 - i * 1.1,
        0
      )
    );

    Array.from({ length: 4 }, (_, i) =>
      createMeshLineEstribos(rectPointsVERDE3, 0x008631, 0, 0, 10.5 - i, 0)
    );

    Array.from({ length: 3 }, (_, i) =>
      createMeshLineEstribos(
        rectPointsVERDE3,
        0x008631,
        0,
        0,
        10.5 - 0.5 - i,
        0
      )
    );

    Array.from({ length: 7 }, (_, i) =>
      createMeshLineEstribos(rectPointsVERDE3, 0x008631, 0, 0, 5.3 - i * 1.75, 0)
    );

    Array.from({ length: 4 }, (_, i) =>
      createMeshLineEstribos(
        rectPointsVERDE3,
        0x008631,
        0,
        0,
        -6.8 - i * 0.55,
        0
      )
    );

    Array.from({ length: 9 }, (_, i) =>
      createMeshLineEstribos(
        rectPointsVERDE3,
        0x008631,
        0,
        0,
        -9.1 - i * 0.55,
        0
      )
    );

    Array.from({ length: 10 }, (_, i) =>
      createMeshLineEstribos(
        rectPointsVERDE3,
        0x008631,
        0,
        0,
        -17.1 - i * 0.55,
        0
      )
    );

    let frame;
    // 8. Animación
    const animate = () => {
      frame = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 9. Cleanup mejorado (CRÍTICO)
    return () => {
      cancelAnimationFrame(frame);
      scene.clear(); // Asegura limpiar todos los objetos
      scene.children.forEach(child => {
        if (child.isLight) {
          child.dispose();
        }
      });
      [geometry11, geometry, geometry2, geometry3, geometry32].forEach(geo => {
        if (geo) geo.dispose();
      });
      // Limpiar event listeners
      window.removeEventListener('resize', handleResize);

      if (mountRef.current) {
        // Limpiar renderer
        renderer.dispose();
        mountRef.current.removeChild(renderer.domElement);

        // Limpiar escena
        scene.traverse(child => {
          if (child.isMesh) {
            child.geometry?.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach(m => m.dispose());
            } else {
              child.material?.dispose();
            }
          }
        });

        // Limpiar controles
        controls.dispose();

        // Limpiar textura
        textureRef.current?.dispose();
        scene.background = null;
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
