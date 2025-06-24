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
    const geometry = new THREE.BoxGeometry(3.5, 2.5, 2.5);
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
    cube.position.set(0, 0.6, 0.5);
    scene.add(cube);

    // Agregar pilares rojos
    const pillarGeometry = new THREE.CylinderGeometry(0.025, 0.025, 3.2, 50);
    const pillarMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const pillarPositions = [
      [0.5, 0.95, -0.5],
      [0.5, 0.95, 1.5],
      [-1.5, 0.95, 1.5],
      [-1.5, 0.95, -0.5],
      [-0.4952, 0.95, -0.4952],
      [-0.4952, 0.95, 1.4952],
      [-1.4952, 0.95, 0.4952],
      [1.4952, 0.95, 0.4952],
      [1.4952, 0.95, -0.4952],
      [1.4952, 0.95, 1.4952],
    ];
    pillarPositions.forEach(([x, y, z]) => {
      const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
      pillar.position.set(x, y, z);
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


    for (let i = 0; i < 1; i++) {
      createMeshLineVarillas2(rectPointsa2, 0x0000ff, 0, 0, 0.5 + i * 2, 0);
    }

    // Crear líneas con esquinas curvas
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

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas2(rectPoints, 0x0000ff, 0, 0, -0.5 + i * 2, 0);
    }

    // Crear líneas con esquinas curvas
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
    

    for (let i = 0; i < 1; i++) {
      createMeshLineVarillas2(rectPoints2, 0xffdb58, 0, 1, 0.6 + i * 2, 0);
    }

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
    
    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas2(rectPointsamarillas2, 0xffdb58, 0, 1, -0.4 + i * 2, 0);
    }

    // Crear líneas con esquinas curvas
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
    
    for (let i = 0; i < 3; i++) {
      createMeshLineVarillas2(rectPoints3, 0x00ff00, 0, 0, -0.3 + i * 1, 0);
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
