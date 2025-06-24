import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";

const ThreeScene = ({ width = "100%", height = "100%" }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Configuración básica de la escena
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });

    // Configuración de la cámara
    const camera = new THREE.PerspectiveCamera(
      40,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      10000
    );
    camera.position.set(5.5, 5.5, 5.5);
    camera.lookAt(2.5, 2.5, 2.5);

    // Controles de órbita
    const controls = new OrbitControls(camera, renderer.domElement);

    // Función para actualizar el tamaño del renderer y la cámara
    const updateSize = () => {
      const { clientWidth, clientHeight } = mountRef.current;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    // Observar cambios de tamaño del contenedor
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(mountRef.current);

    // Agregar el renderer al DOM
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Fondo degradado
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(1, "#FFFFFF"); // Blancos
    gradient.addColorStop(0, "#ADD8E6"); // Azul claro
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    scene.background = new THREE.CanvasTexture(canvas);

    // Iluminación
    const addLight = (x, y, z) => {
      const directionalLight = new THREE.DirectionalLight("#ffffff", 1);
      directionalLight.position.set(x, y, z);
      scene.add(directionalLight);
    };
    addLight(10, 10, 10);
    addLight(-10, -10, -10);
    addLight(-10, 10, 10);
    addLight(10, -10, -10);

    // Geometrías y materiales
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

    // Pilares rojos
    const pillarGeometry = new THREE.CylinderGeometry(0.05, 0.05, 5, 50);
    const pillarMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const pillarPositions = [
      [2.5, 0, -1.5],
      [2.5, 0, 1.5],
      [2.5, 0, -0.5],
      [2.5, 0, 0.5],
      [1.5, 0, 1.5],
      [0.5, 0, 1.5],
      [-0.5, 0, 1.5],
      [-1.5, 0, 1.5],
      [-1.5, 0, -0.5],
      [-1.5, 0, 0.5],
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
      new THREE.Vector3(1.6, 0.5, -1.57),

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
      new THREE.Vector3(1.6, 0.5, 1.57),

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

    // Crear y agregar líneas curvas repetidas
    const Lineasazules1 = Array.from({ length: 1 }, (_, i) => {
      const curve = new THREE.CatmullRomCurve3(rectPointsa2, false);
      const curvePoints = curve.getPoints(100);

      // Convertir puntos a LineGeometry
      const positions = curvePoints.flatMap((p) => [p.x, p.y, p.z]);
      const lineGeometry = new LineGeometry();
      lineGeometry.setPositions(positions);

      // Crear material para Line2
      const lineMaterial = new LineMaterial({
        color: 0x0000ff,
        linewidth: 5, // Cambiar según el grosor deseado
        dashed: false,
      });

      lineMaterial.resolution.set(window.innerWidth, window.innerHeight); // Necesario para Line2

      // Crear línea con Line2
      const line = new Line2(lineGeometry, lineMaterial);
      line.position.y = 0.2 + i * 2; // Ajustar la posición en el eje Y para cada línea
      line.position.x = 1;
      return line;
    });

    // Agregar las líneas curvas a la escena
    Lineasazules1.forEach((line) => scene.add(line));

    // Crear y agregar líneas curvas repetidas
    const Lineasamarillas1 = Array.from({ length: 2 }, (_, i) => {
      const curve = new THREE.CatmullRomCurve3(rectPointsa2, false);
      const curvePoints = curve.getPoints(100);

      // Convertir puntos a LineGeometry
      const positions = curvePoints.flatMap((p) => [p.x, p.y, p.z]);
      const lineGeometry = new LineGeometry();
      lineGeometry.setPositions(positions);

      // Crear material para Line2
      const lineMaterial = new LineMaterial({
        color: 0xffdb58,
        linewidth: 5, // Cambiar según el grosor deseado
        dashed: false,
      });

      lineMaterial.resolution.set(window.innerWidth, window.innerHeight); // Necesario para Line2

      // Crear línea con Line2
      const line = new Line2(lineGeometry, lineMaterial);
      line.position.y = -1.3 + i * 3.2; // Ajustar la posición en el eje Y para cada línea
      return line;
    });

    // Agregar las líneas curvas a la escena
    Lineasamarillas1.forEach((line) => scene.add(line));

    // Crear líneas con esquinas curvas
    const rectPoints = [
      new THREE.Vector3(1, 0.55, -1.3),
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
      new THREE.Vector3(1.6, 0.5, 1.57),

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
      new THREE.Vector3(1.6, 0.5, -1.57),
      new THREE.Vector3(1.3, 0.525, -1),
    ];

    // Crear y agregar líneas curvas repetidas
    const curvedLines = Array.from({ length: 2 }, (_, i) => {
      const curve = new THREE.CatmullRomCurve3(rectPoints, false);
      const curvePoints = curve.getPoints(100);

      // Convertir puntos a LineGeometry
      const positions = curvePoints.flatMap((p) => [p.x, p.y, p.z]);
      const lineGeometry = new LineGeometry();
      lineGeometry.setPositions(positions);

      // Crear material para Line2
      const lineMaterial = new LineMaterial({
        color: 0x0000ff,
        linewidth: 5, // Cambiar según el grosor deseado
        dashed: false,
      });

      lineMaterial.resolution.set(window.innerWidth, window.innerHeight); // Necesario para Line2

      // Crear línea con Line2
      const line = new Line2(lineGeometry, lineMaterial);
      line.position.y = -1.5 + i * 3.2; // Ajustar la posición en el eje Y para cada línea
      line.position.x = 1;
      return line;
    });

    // Agregar las líneas curvas a la escena
    curvedLines.forEach((line) => scene.add(line));

    // Crear y agregar líneas curvas repetidas
    const curvedLinesAmarilla2 = Array.from({ length: 1 }, (_, i) => {
      const curve = new THREE.CatmullRomCurve3(rectPoints, false);
      const curvePoints = curve.getPoints(100);

      // Convertir puntos a LineGeometry
      const positions = curvePoints.flatMap((p) => [p.x, p.y, p.z]);
      const lineGeometry = new LineGeometry();
      lineGeometry.setPositions(positions);

      // Crear material para Line2
      const lineMaterial = new LineMaterial({
        color: 0xffdb58,
        linewidth: 5, // Cambiar según el grosor deseado
        dashed: false,
      });

      lineMaterial.resolution.set(window.innerWidth, window.innerHeight); // Necesario para Line2

      // Crear línea con Line2
      const line = new Line2(lineGeometry, lineMaterial);
      line.position.y = 0.4 + i * 2; // Ajustar la posición en el eje Y para cada línea
      return line;
    });

    // Agregar las líneas curvas a la escena
    curvedLinesAmarilla2.forEach((line) => scene.add(line));

    const rectPointsverdes1 = [
      new THREE.Vector3(-1.3, 0.5, 0.5),
      new THREE.Vector3(-1.6, 0.5, -0.1),
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
      new THREE.Vector3(2.6, 0.5, -0.1),

      new THREE.Vector3(2.6, 0.5, 0.25),
      new THREE.Vector3(2.6, 0.5, 0.5),
      new THREE.Vector3(2.6, 0.5, 0.75),
      new THREE.Vector3(2.6, 0.5, 1.1),

      new THREE.Vector3(2.25, 0.5, 1.1),
      new THREE.Vector3(2, 0.5, 1.1),
      new THREE.Vector3(1.75, 0.5, 1.1),
      new THREE.Vector3(1.5, 0.5, 1.1),
      new THREE.Vector3(1.25, 0.5, 1.1),
      new THREE.Vector3(1, 0.5, 1.1),
      new THREE.Vector3(0.75, 0.5, 1.1),
      new THREE.Vector3(0.5, 0.5, 1.1),
      new THREE.Vector3(0.25, 0.5, 1.1),
      new THREE.Vector3(0, 0.5, 1.1),
      new THREE.Vector3(-0.25, 0.5, 1.1),
      new THREE.Vector3(-0.5, 0.5, 1.1),
      new THREE.Vector3(-0.75, 0.5, 1.1),
      new THREE.Vector3(-1, 0.5, 1.1),
      new THREE.Vector3(-1.25, 0.5, 1.1),
      new THREE.Vector3(-1.6, 0.5, 1.1),

      new THREE.Vector3(-1.6, 0.5, 0.75),
      new THREE.Vector3(-1.6, 0.5, 0.5),
      new THREE.Vector3(-1.6, 0.5, 0.25),
      new THREE.Vector3(-1.6, 0.5, -0.1),
      new THREE.Vector3(-1, 0.5, 0.3),
    ];

    // Crear y agregar líneas curvas repetidas
    const curvedLinesverdes2 = Array.from({ length: 2 }, (_, i) => {
      const curve = new THREE.CatmullRomCurve3(rectPointsverdes1, false);
      const curvePoints = curve.getPoints(100);

      // Convertir puntos a LineGeometry
      const positions = curvePoints.flatMap((p) => [p.x, p.y, p.z]);
      const lineGeometry = new LineGeometry();
      lineGeometry.setPositions(positions);

      // Crear material para Line2
      const lineMaterial = new LineMaterial({
        color: 0x008631,
        linewidth: 5, // Cambiar según el grosor deseado
        dashed: false,
      });

      lineMaterial.resolution.set(window.innerWidth, window.innerHeight); // Necesario para Line2

      // Crear línea con Line2
      const line = new Line2(lineGeometry, lineMaterial);
      line.position.y = -1.4 + i * 3.2; // Ajustar la posición en el eje Y para cada línea
      line.position.z = -0.5; // Ajustar la posición en el eje Z para cada línea
      return line;
    });

    // Agregar las líneas curvas a la escena
    curvedLinesverdes2.forEach((line) => scene.add(line));

    const rectPointsverdes2 = [
      new THREE.Vector3(2.1, 0.5, 0.8),
      new THREE.Vector3(2.6, 0.5, 1.1),
      new THREE.Vector3(2.6, 0.5, 0.75),
      new THREE.Vector3(2.6, 0.5, 0.5),
      new THREE.Vector3(2.6, 0.5, 0.25),
      new THREE.Vector3(2.6, 0.5, -0.1),

      new THREE.Vector3(2.25, 0.5, -0.1),
      new THREE.Vector3(2, 0.5, -0.1),
      new THREE.Vector3(1.75, 0.5, -0.1),
      new THREE.Vector3(1.5, 0.5, -0.1),
      new THREE.Vector3(1.25, 0.5, -0.1),
      new THREE.Vector3(1, 0.5, -0.1),
      new THREE.Vector3(0.75, 0.5, -0.1),
      new THREE.Vector3(0.5, 0.5, -0.1),
      new THREE.Vector3(0.25, 0.5, -0.1),
      new THREE.Vector3(0, 0.5, -0.1),
      new THREE.Vector3(-0.25, 0.5, -0.1),
      new THREE.Vector3(-0.5, 0.5, -0.1),
      new THREE.Vector3(-0.75, 0.5, -0.1),
      new THREE.Vector3(-1, 0.5, -0.1),
      new THREE.Vector3(-1.25, 0.5, -0.1),
      new THREE.Vector3(-1.6, 0.5, -0.1),

      new THREE.Vector3(-1.6, 0.5, 0.25),
      new THREE.Vector3(-1.6, 0.5, 0.5),
      new THREE.Vector3(-1.6, 0.5, 0.75),
      new THREE.Vector3(-1.6, 0.5, 1.1),

      new THREE.Vector3(-1.6, 0.5, 1.1),
      new THREE.Vector3(-1.25, 0.5, 1.1),
      new THREE.Vector3(-1, 0.5, 1.1),
      new THREE.Vector3(-0.5, 0.5, 1.1),
      new THREE.Vector3(0, 0.5, 1.1),
      new THREE.Vector3(0.25, 0.5, 1.1),
      new THREE.Vector3(0.5, 0.5, 1.1),
      new THREE.Vector3(1, 0.5, 1.1),
      new THREE.Vector3(1.25, 0.5, 1.1),
      new THREE.Vector3(1.5, 0.5, 1.1),
      new THREE.Vector3(1.75, 0.5, 1.1),
      new THREE.Vector3(2, 0.5, 1.1),
      new THREE.Vector3(2.25, 0.5, 1.1),
      new THREE.Vector3(2.6, 0.5, 1.1),
      new THREE.Vector3(2.4, 0.5, 0.5),
    ];

    // Crear y agregar líneas curvas repetidas
    const curvedLinesverdes = Array.from({ length: 1 }, (_, i) => {
      const curve = new THREE.CatmullRomCurve3(rectPointsverdes2, false);
      const curvePoints = curve.getPoints(100);

      // Convertir puntos a LineGeometry
      const positions = curvePoints.flatMap((p) => [p.x, p.y, p.z]);
      const lineGeometry = new LineGeometry();
      lineGeometry.setPositions(positions);

      // Crear material para Line2
      const lineMaterial = new LineMaterial({
        color: 0x008631,
        linewidth: 5, // Cambiar según el grosor deseado
        dashed: true,
      });

      lineMaterial.resolution.set(window.innerWidth, window.innerHeight); // Necesario para Line2

      // Crear línea con Line2
      const line = new Line2(lineGeometry, lineMaterial);
      line.position.y = 0.3 + i * 2; // Ajustar la posición en el eje Y para cada línea
      line.position.x = 0; // Ajustar la posición en el eje X para cada línea
      line.position.z = -0.5; // Ajustar la posición en el eje Z para cada línea
      return line;
    });
    // Agregar las líneas curvas a la escena
    curvedLinesverdes.forEach((line) => scene.add(line));
    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Limpieza
    return () => {
      resizeObserver.disconnect();
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: width,
        height: height,
        border: "2px solid #333",
        borderRadius: "8px",
      }}
    />
  );
};

export default ThreeScene;
