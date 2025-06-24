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
    const geometry = new THREE.BoxGeometry(9, 6, 3);
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
    cube.position.set(-1.5, 0, 0);
    scene.add(cube);

    const geometry2 = new THREE.BoxGeometry(3, 6, 9);
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
        opacity: 0,
        transparent: true,
      }),
    ];

    const cube2 = new THREE.Mesh(geometry2, materials2);
    cube2.position.set(4.5, 0, 6);
    scene.add(cube2);

    const geometry3 = new THREE.BoxGeometry(3, 6, 3);
    const materials3 = [
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
    cube3.position.set(4.5, 0, 0);
    scene.add(cube3);

    /*------------------ Crear Varillas Azules con MeshLine ----------------*/
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

    const VarillasAzules = [
      new THREE.Vector3(0, -3, 0),
      new THREE.Vector3(0, 5, 0),
    ];
    for (let j = 0; j < 6; j++) {
      for (let i = 0; i < 2; i++) {
        createCylinderVarillas(
          VarillasAzules,
          0x00ff00,
          0.1,
          -5 + j * 2.125,
          0,
          1 - i * 2.125
        );
      }
    }

    const VarillasAzules2 = [
      new THREE.Vector3(0, -3, 0),
      new THREE.Vector3(0, 5, 0),
    ];
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 4; i++) {
        createCylinderVarillas(
          VarillasAzules2,
          0x00ff00,
          0.1,
          3.5 + j * 2.125,
          0,
          9.5 - i * 2.125
        );
      }
    }

    /*------------------ Crear Grapas con MeshLine ----------------*/

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

    /* Grapas Rosa*/
    const GrapasRosas = [
      new THREE.Vector3(-4.6, 0, -4.25),
      new THREE.Vector3(-4.1, 0, -4.75),
      new THREE.Vector3(-3.9, 0, -4.75),
      new THREE.Vector3(-3.9, 0, -4.3),
      new THREE.Vector3(-3.9, 0, -2.3),
      new THREE.Vector3(-3.9, 0, -2.2),
      new THREE.Vector3(-3.9, 0, 2.2),
      new THREE.Vector3(-3.9, 0, 2.3),
      new THREE.Vector3(-3.9, 0, 5.3),
      new THREE.Vector3(-3.9, 0, 6.9),
    ];
    for (let i = 0; i < 4; i++) {
      createMeshLineVarillas3(
        GrapasRosas,
        0xff66cc,
        0,
        9.7,
        4 + -i * 1.9,
        3.5
      );
    }

    /* Grapas Azul*/
    const GrapaAzul = [
      new THREE.Vector3(-4.3, 0, -1.65),
      new THREE.Vector3(-3.8, 0, -2.15),
      new THREE.Vector3(-3.8, 0, -2.35),
      new THREE.Vector3(-3.85, 0, -2.35),
      new THREE.Vector3(-3.9, 0, -2.35),
      new THREE.Vector3(-4.95, 0, -2.35),
      new THREE.Vector3(-5.95, 0, -2.35),
      new THREE.Vector3(-6, 0, -2.35),
      new THREE.Vector3(-6.25, 0, -2.35),
      new THREE.Vector3(-6.25, 0, -2.2),
      new THREE.Vector3(-6.25, 0.15, 9.3),
    ];
    for (let i = 0; i < 4; i++) {
      createMeshLineVarillas3(GrapaAzul, 0x009dcf, 0, 9.6, 3.9 + -i * 1.9, 1.1);
    }

    /* Grapas AzulCielo*/
    const GrapaAzulCielo = [
      new THREE.Vector3(-15, 0, -2.35),
      new THREE.Vector3(-4.1, 0, -2.35),
      new THREE.Vector3(-4, 0, -2.35),
      new THREE.Vector3(-3.9, 0, -2.35),
      new THREE.Vector3(-3.9, 0, -2.1),
      new THREE.Vector3(-4.4, 0, -1.6),
    ];
    for (let i = 0; i < 4; i++) {
      createMeshLineVarillas3(
        GrapaAzulCielo,
        0xd2f7ff,
        0,
        9.7,
        3.8 + -i * 1.9,
        1.1
      );
    }

    /* Grapas Amarilla*/
    const GrapaAmarilla = [
      new THREE.Vector3(-15, 0.1, -2.35),
      new THREE.Vector3(-5, 0, -2.35),
      new THREE.Vector3(-4, 0, -2.35),
      new THREE.Vector3(-3.9, 0, -2.35),
      new THREE.Vector3(-3.9, 0, -2.45),
      new THREE.Vector3(-3.9, 0, -3.2),
      new THREE.Vector3(-3.9, 0, -4.75),
      new THREE.Vector3(-4.1, 0, -4.7),
      new THREE.Vector3(-4.6, 0, -4.2),
    ];
    for (let i = 0; i < 4; i++) {
      createMeshLineVarillas3(
        GrapaAmarilla,
        0xffff00,
        0,
        9.7,
        3.7 + -i * 1.9,
        3.5
      );
    }

    /* Estribos Rojos*/
    const EstribosRojos = [
      new THREE.Vector3(-8.1, 0, -1.6),
      new THREE.Vector3(-8.6, 0, -2.1),
      new THREE.Vector3(-8.6, 0, -2.3),
      new THREE.Vector3(-8.5, 0, -2.3),
      new THREE.Vector3(-7.5, 0, -2.3),
      new THREE.Vector3(-6.5, 0, -2.3),
      new THREE.Vector3(-6.2, 0, -2.3),

      new THREE.Vector3(-6.2, 0, -2.2),
      new THREE.Vector3(-6.2, 0, -2.1),
      new THREE.Vector3(-6.2, 0.01, 0),
      new THREE.Vector3(-6.2, 0.02, 0.1),

      new THREE.Vector3(-6.3, 0.03, 0.1),
      new THREE.Vector3(-6.8, 0.04, 0.1),
      new THREE.Vector3(-7.5, 0.05, 0.1),
      new THREE.Vector3(-8, 0.1, 0.1),
      new THREE.Vector3(-8.5, 0.11, 0.1),

      new THREE.Vector3(-8.6, 0.12, 0.1),
      new THREE.Vector3(-8.6, 0.13, 0),
      new THREE.Vector3(-8.6, 0.14, -2.1),
      new THREE.Vector3(-8.6, 0.15, -2.2),
      new THREE.Vector3(-8.6, 0.15, -2.3),
      new THREE.Vector3(-8.4, 0.15, -2.3),
      new THREE.Vector3(-7.9, 0, -1.8),
    ];
    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas3(
        EstribosRojos,
        0xff0000,
        0,
        7.75,
        3.95 + -i * 3.8,
        1.05
      );
    }

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas3(
        EstribosRojos,
        0xff0000,
        0,
        12,
        4.1 + -i * 3.8,
        5.3
      );
    }

    const EstribosRojos2 = [
      new THREE.Vector3(-6.7, 0, -0.6),
      new THREE.Vector3(-6.275, 0, -0.1),
      new THREE.Vector3(-6.275, 0, 0.1),
      new THREE.Vector3(-6.8, 0, 0.1),
      new THREE.Vector3(-7.5, 0, 0.1),
      new THREE.Vector3(-8, 0, 0.1),
      new THREE.Vector3(-8.5, 0, 0.1),

      new THREE.Vector3(-8.6, 0, 0.1),
      new THREE.Vector3(-8.6, 0, 0),
      new THREE.Vector3(-8.6, 0, -2.1),
      new THREE.Vector3(-8.6, 0, -2.2),
      new THREE.Vector3(-8.6, 0, -2.3),
      new THREE.Vector3(-8.4, 0, -2.3),

      new THREE.Vector3(-8.6, 0, -2.3),
      new THREE.Vector3(-8.5, 0, -2.3),
      new THREE.Vector3(-7.5, 0, -2.3),
      new THREE.Vector3(-6.5, 0.025, -2.3),
      new THREE.Vector3(-6.2, 0.05, -2.3),

      new THREE.Vector3(-6.275, 0.075, -2.2),
      new THREE.Vector3(-6.275, 0.1, -2.1),
      new THREE.Vector3(-6.275, 0.125, 0),
      new THREE.Vector3(-6.275, 0.15, 0.1),
      new THREE.Vector3(-6.475, 0.15, 0.1),
      new THREE.Vector3(-6.975, 0.15, -0.5),
    ];
    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas3(
        EstribosRojos2,
        0xff0000,
        0,
        7.75,
        2.05 + -i * 3.8,
        1.05
      );
    }

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas3(
        EstribosRojos2,
        0xff0000,
        0,
        12,
        2.2 + -i * 3.8,
        5.3
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
