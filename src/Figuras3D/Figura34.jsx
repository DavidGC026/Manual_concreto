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

    // Crear un cubo con materiales transparentes
    const geometry = new THREE.BoxGeometry(14, 6, 6);
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

    /*------------------ Crear Varillas Roja con MeshLine ----------------*/

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
      new THREE.Vector3(0, -3, 0),
      new THREE.Vector3(0, 5, 0),
    ];
    for (let i = 0; i < 2; i++) {
      createCylinderVarillas(VarillasRojas, 0xff0000, 0.15, 6, 0, -i * 4 + 2);
    }

    /*------------------ Crear Varillas Roja con MeshLine ----------------*/

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
        lineWidth: 0.15,
        sizeAttenuation: 1,
      });

      // Crear malla de la línea y agregarla a la escena
      const lineMesh = new THREE.Mesh(meshLine, meshLineMaterial);
      lineMesh.position.x += xPosition;
      lineMesh.position.y += yPosition;
      lineMesh.position.z += zOffset;
      scene.add(lineMesh);
    };

    const VarillasAzules = [
      new THREE.Vector3(0, -3, 0),
      new THREE.Vector3(0, 5, 0),
    ];
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 2; i++) {
        createCylinderVarillas(
          VarillasAzules,
          0x0000ff,
          0.125,
          -j * 2.7 + 3.4,
          0,
          -i * 4 + 2
        );
      }
    }

    /* Varilllas Verdes */

    const VarillasVerdes = [
      new THREE.Vector3(5.5, 0, 1.2),
      new THREE.Vector3(6.2, 0, 2),
      new THREE.Vector3(6.2, 0, 2.2),
      new THREE.Vector3(6.1, 0, 2.25),
      new THREE.Vector3(6, 0, 2.25),
      new THREE.Vector3(6, 0, 2.25),
      new THREE.Vector3(6, 0, 2.25),
      new THREE.Vector3(6, 0, 2.25),
      new THREE.Vector3(-6.7, 0, 2.25),
      new THREE.Vector3(-6.7, 0, 2.25),
      new THREE.Vector3(-6.7, 0, 2.25),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas2(VarillasVerdes, 0x00ff00, 0, 0, 3.5 + -i * 5, 0);
    }

    const VarillasVerdes2 = [
      new THREE.Vector3(5.5, 0, -1.2),
      new THREE.Vector3(6.2, 0, -2),
      new THREE.Vector3(6.2, 0, -2.2),
      new THREE.Vector3(6.1, 0, -2.25),
      new THREE.Vector3(6, 0, -2.25),
      new THREE.Vector3(6, 0, -2.25),
      new THREE.Vector3(6, 0, -2.25),
      new THREE.Vector3(6, 0, -2.25),
      new THREE.Vector3(-6.7, -0, -2.25),
      new THREE.Vector3(-6.7, -0, -2.25),
      new THREE.Vector3(-6.7, -0, -2.25),
    ];

    for (let i = 0; i < 1; i++) {
      createMeshLineVarillas2(VarillasVerdes2, 0x00ff00, 0, 0, 0.5 + -i * 5, 0);
    }

    const VarillasAmarillas = [
      new THREE.Vector3(5.1, 0, 1.5),
      new THREE.Vector3(6.1, 0, 2.3),
      new THREE.Vector3(6.2, 0, 2.2),
      new THREE.Vector3(6.2, 0, 2.1),
      new THREE.Vector3(6.2, 0, -2.2),
      new THREE.Vector3(6.2, 0, -2.25),
      new THREE.Vector3(6, 0, -2.25),
      new THREE.Vector3(6, 0, -2.25),
      new THREE.Vector3(6, 0, -2.25),
      new THREE.Vector3(-6.7, 0, -2.25),
      new THREE.Vector3(-6.7, 0, -2.25),
      new THREE.Vector3(-6.7, 0, -2.25),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas2(
        VarillasAmarillas,
        0xffff00,
        0,
        0,
        3.7 + -i * 5,
        0
      );
    }

    const VarillasAmarillas2 = [
      new THREE.Vector3(5.1, 0, -1.5),
      new THREE.Vector3(6.1, 0, -2.3),
      new THREE.Vector3(6.2, 0, -2.2),
      new THREE.Vector3(6.2, 0, -2.1),
      new THREE.Vector3(6.2, 0, 2.2),
      new THREE.Vector3(6.2, 0, 2.25),
      new THREE.Vector3(6, 0, 2.25),
      new THREE.Vector3(6, 0, 2.25),
      new THREE.Vector3(6, 0, 2.25),
      new THREE.Vector3(-6.7, 0, 2.25),
      new THREE.Vector3(-6.7, 0, 2.25),
      new THREE.Vector3(-6.7, 0, 2.25),
    ];

    for (let i = 0; i < 1; i++) {
      createMeshLineVarillas2(
        VarillasAmarillas2,
        0xffff00,
        0,
        0,
        1 + -i * 5,
        0
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
