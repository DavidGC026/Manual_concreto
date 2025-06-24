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
    const geometry = new THREE.BoxGeometry(10, 6, 3);
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
    cube.position.set(-2, 0, 0);
    scene.add(cube);

    const geometry2 = new THREE.BoxGeometry(3, 6, 10);
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
    cube2.position.set(4.5, 0, 6.5);
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
      new THREE.Vector3(0, -3, 0),
      new THREE.Vector3(0, 5, 0),
    ];
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 2; i++) {
        createCylinderVarillas(
          VarillasRojas,
          0xff0000,
          0.15,
          3.5 + j * 2,
          0,
          1 - i * 2.125
        );
      }
    }

    const VarillasRojas3 = [
      new THREE.Vector3(0, -3, 0),
      new THREE.Vector3(0, 5, 0),
    ];
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 2; i++) {
        createCylinderVarillas(
          VarillasRojas3,
          0xff0000,
          0.15,
          -1.7 + j * 2.2,
          0,
          1 - i * 2.125
        );
      }
    }

    const VarillasRojas2 = [
      new THREE.Vector3(0, -3, 0),
      new THREE.Vector3(0, 5, 0),
    ];
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 2; i++) {
        createCylinderVarillas(
          VarillasRojas2,
          0xff0000,
          0.15,
          3.5 + j * 2.125,
          0,
          6.2 - i * 2.2
        );
      }
    }

    /*------------------ Crear Varillas Azules con MeshLine ----------------*/

    const VarillasAzules = [
      new THREE.Vector3(0, -3, 0),
      new THREE.Vector3(0, 5, 0),
    ];
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 2; i++) {
        createCylinderVarillas(
          VarillasAzules,
          0x0000ff,
          0.115,
          -6.15 + j * 2,
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
      for (let i = 0; i < 2; i++) {
        createCylinderVarillas(
          VarillasAzules2,
          0x0000ff,
          0.115,
          3.5 + j * 2.125,
          0,
          10.65 - i * 2
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

    /* Grapas Naranjas*/
    const GrapasNaranjas = [
      new THREE.Vector3(-5.2, 0, -4),
      new THREE.Vector3(-4.5, 0, -4),
      new THREE.Vector3(-4.5, 0, -3.9),
      new THREE.Vector3(-4.5, 0, -2.3),
      new THREE.Vector3(-4.5, 0, -2.2),
      new THREE.Vector3(-4.5, 0, 0.2),
      new THREE.Vector3(-4.5, 0, 0.3),
      new THREE.Vector3(-4.5, 0, 2.2),
      new THREE.Vector3(-4.5, 0, 2.3),
      new THREE.Vector3(-3.9, 0, 4.9),
      new THREE.Vector3(-3.9, 0, 5),
      new THREE.Vector3(-3.9, 0, 5.1),
      new THREE.Vector3(-3.9, 0, 7.75),
    ];
    for (let i = 0; i < 4; i++) {
      createMeshLineVarillas3(
        GrapasNaranjas,
        0xffa420,
        0,
        9.7,
        4.2 + -i * 1.9,
        3.5
      );
    }

    const GrapasNaranjas2 = [
      new THREE.Vector3(-16, 0, -2.4),
      new THREE.Vector3(-14, 0, -2.4),
      new THREE.Vector3(-13.5, 0, -2.4),
      new THREE.Vector3(-13, 0, -2.4),
      new THREE.Vector3(-11, 0, -1.8),
      new THREE.Vector3(-10.5, 0, -1.8),
      new THREE.Vector3(-10, 0, -1.8),
      new THREE.Vector3(-9, 0, -1.8),
      new THREE.Vector3(-7, 0, -1.8),
      new THREE.Vector3(-5, 0, -1.8),
      new THREE.Vector3(-4.35, 0, -1.8),
      new THREE.Vector3(-4.25, 0, -1.8),
      new THREE.Vector3(-4.25, 0, -1.7),
      new THREE.Vector3(-4.25, 0, -1.2),
    ];
    for (let i = 0; i < 4; i++) {
      createMeshLineVarillas3(
        GrapasNaranjas2,
        0xffa420,
        0,
        9.7,
        4.1 + -i * 1.9,
        1.1
      );
    }

    /* Grapas Verdes*/
    const GrapaVerdes = [
      new THREE.Vector3(-5, 0, -1.4),
      new THREE.Vector3(-5.1, 0, -1.4),
      new THREE.Vector3(-5.2, 0, -1.4),
      new THREE.Vector3(-5.7, 0, -1.4),
      new THREE.Vector3(-5.7, 0, -0.9),
      new THREE.Vector3(-5.7, 0, 0),
      new THREE.Vector3(-5.7, 0, 2.2),
      new THREE.Vector3(-5.7, 0, 2.3),
      new THREE.Vector3(-5.7, 0, 3.2),
      new THREE.Vector3(-5.7, 0, 3.3),
      new THREE.Vector3(-5.7, 0, 4.3),
      new THREE.Vector3(-5.7, 0, 5.4),
      new THREE.Vector3(-5.7, 0, 5.3),
      new THREE.Vector3(-5.7, 0, 5.3),
      new THREE.Vector3(-6.3, 0, 7),
      new THREE.Vector3(-6.3, 0, 7.7),
      new THREE.Vector3(-6.3, 0, 7.8),
      new THREE.Vector3(-6.3, 0, 10),
    ];
    for (let i = 0; i < 4; i++) {
      createMeshLineVarillas3(GrapaVerdes, 0x00ff00, 0, 9.6, 4.0 + -i * 1.9, 1.1);
    }

    const GrapaVerdes2 = [
      new THREE.Vector3(-16, 0, -2.3),
      new THREE.Vector3(-13.5, 0, -2.3),
      new THREE.Vector3(-13, 0, -2.3),
      new THREE.Vector3(-11, 0, -2.9),
      new THREE.Vector3(-10.5, 0, -2.9),
      new THREE.Vector3(-5.3, 0, -2.9),
      new THREE.Vector3(-4.8, 0, -2.9),
      new THREE.Vector3(-4.8, 0, -3.2),
      new THREE.Vector3(-4.8, 0, -3.6),
    ];
    for (let i = 0; i < 4; i++) {
      createMeshLineVarillas3(
        GrapaVerdes2,
        0x00ff00,
        0,
        9.7,
        3.85 + -i * 1.9,
        3.5
      );
    }

    /* Estribos Amarillos*/
    const EstribosAmarillos = [
      new THREE.Vector3(-13.3, 0, -1.4),
      new THREE.Vector3(-13.7, 0, -1.9),
      new THREE.Vector3(-13.7, 0, -2.35),
      new THREE.Vector3(-13.4, 0, -2.35),
      new THREE.Vector3(-13.3, 0, -2.35),
      new THREE.Vector3(-10.5, 0, -2.35),
      new THREE.Vector3(-7.5, 0, -2.35),
      new THREE.Vector3(-6.5, 0, -2.35),
      new THREE.Vector3(-6.3, 0, -2.35),

      new THREE.Vector3(-6.1, 0, -2.35),
      new THREE.Vector3(-6.1, 0, -2.1),
      new THREE.Vector3(-6.1, 0.01, 0),
      new THREE.Vector3(-6.1, 0.02, 0.1),

      new THREE.Vector3(-6.3, 0.03, 0.1),
      new THREE.Vector3(-6.8, 0.04, 0.1),
      new THREE.Vector3(-7.5, 0.05, 0.1),
      new THREE.Vector3(-8, 0.1, 0.1),
      new THREE.Vector3(-8.5, 0.11, 0.1),
      new THREE.Vector3(-13.6, 0.12, 0.1),
      new THREE.Vector3(-13.7, 0.12, 0.1),

      new THREE.Vector3(-13.7, 0.13, 0),
      new THREE.Vector3(-13.7, 0.14, -2.1),
      new THREE.Vector3(-13.7, 0.15, -2.2),
      new THREE.Vector3(-13.7, 0.15, -2.3),
      new THREE.Vector3(-13.5, 0.15, -2.3),
      new THREE.Vector3(-12.9, 0, -1.9),
    ];
    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas3(
        EstribosAmarillos,
        0xffff00,
        0,
        11.8,
        4.6 + -i * 3.8,
        1.05
      );
    }

    const EstribosAmarillos2 = [
      new THREE.Vector3(-6.7, 0, -0.8),
      new THREE.Vector3(-6.2, 0, -0.1),
      new THREE.Vector3(-6.2, 0, 0),
      new THREE.Vector3(-6.3, 0, 0.1),
      new THREE.Vector3(-6.8, 0, 0.1),
      new THREE.Vector3(-7.5, 0, 0.1),
      new THREE.Vector3(-8, 0, 0.1),
      new THREE.Vector3(-12.9, 0, 0.1),
      new THREE.Vector3(-13.6, 0, 0.1),

      new THREE.Vector3(-13.7, 0.01, 0.1),
      new THREE.Vector3(-13.7, 0.02, 0),
      new THREE.Vector3(-13.7, 0.03, -2.1),
      new THREE.Vector3(-13.7, 0.04, -2.2),

      new THREE.Vector3(-13.7, 0.07, -2.3),
      new THREE.Vector3(-13.6, 0.08, -2.3),
      new THREE.Vector3(-12.9, 0.08, -2.3),
      new THREE.Vector3(-7.5, 0.09, -2.3),
      new THREE.Vector3(-6.5, 0.1, -2.3),
      new THREE.Vector3(-6.2, 0.11, -2.3),

      new THREE.Vector3(-6.2, 0.12, -2.2),
      new THREE.Vector3(-6.2, 0.13, -2.1),
      new THREE.Vector3(-6.2, 0.14, 0),
      new THREE.Vector3(-6.2, 0.15, 0.1),
      new THREE.Vector3(-6.3, 0.15, 0.2),
      new THREE.Vector3(-7.1, 0.15, -0.4),
    ];
    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas3(
        EstribosAmarillos2,
        0xffff00,
        0,
        11.8,
        2.6 + -i * 3.8,
        1.05
      );
    }

    /* Estribos Rosas*/
    const EstribosRosas = [
      new THREE.Vector3(-8.2, 0, -1.4),
      new THREE.Vector3(-8.6, 0, -1.9),
      new THREE.Vector3(-8.6, 0, -2.35),
      new THREE.Vector3(-7.9, 0, -2.35),
      new THREE.Vector3(-7.5, 0, -2.35),
      new THREE.Vector3(-6.5, 0, -2.35),
      new THREE.Vector3(-6.3, 0, -2.35),

      new THREE.Vector3(-6.1, 0, -2.35),
      new THREE.Vector3(-6.1, 0, -2.1),
      new THREE.Vector3(-6.1, 0.01, 5),
      new THREE.Vector3(-6.1, 0.02, 5.1),

      new THREE.Vector3(-6.3, 0.03, 5.2),
      new THREE.Vector3(-6.8, 0.04, 5.2),
      new THREE.Vector3(-7.5, 0.05, 5.2),
      new THREE.Vector3(-8, 0.1, 5.2),
      new THREE.Vector3(-8.1, 0.11, 5.2),
      new THREE.Vector3(-8.6, 0.12, 5.2),

      new THREE.Vector3(-8.6, 0.13, 5.1),
      new THREE.Vector3(-8.6, 0.14, -2.1),
      new THREE.Vector3(-8.6, 0.15, -2.2),
      new THREE.Vector3(-8.6, 0.15, -2.3),
      new THREE.Vector3(-8.4, 0.15, -2.3),
      new THREE.Vector3(-7.8, 0, -1.9),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas3(
        EstribosRosas,
        0xff66cc,
        0,
        11.9,
        4.4 + -i * 3.8,
        1.1
      );
    }

    const EstribosRosas2 = [
      new THREE.Vector3(-6.7, 0, 4.4),
      new THREE.Vector3(-6.2, 0, 5.1),
      new THREE.Vector3(-6.2, 0, 5.2),
      new THREE.Vector3(-6.3, 0, 5.3),
      new THREE.Vector3(-6.8, 0, 5.3),
      new THREE.Vector3(-7.5, 0, 5.3),
      new THREE.Vector3(-7.7, 0, 5.3),
      new THREE.Vector3(-7.9, 0, 5.3),
      new THREE.Vector3(-8, 0, 5.3),

      new THREE.Vector3(-8.7, 0.01, 5.3),
      new THREE.Vector3(-8.7, 0.02, 5.2),
      new THREE.Vector3(-8.7, 0.03, -2.1),
      new THREE.Vector3(-8.7, 0.04, -2.2),
      new THREE.Vector3(-8.7, 0.05, -2.3),

      new THREE.Vector3(-8.7, 0.07, -2.3),
      new THREE.Vector3(-8, 0.08, -2.3),
      new THREE.Vector3(-7.7, 0.08, -2.3),
      new THREE.Vector3(-7.5, 0.09, -2.3),
      new THREE.Vector3(-6.5, 0.1, -2.3),
      new THREE.Vector3(-6.2, 0.11, -2.3),

      new THREE.Vector3(-6.2, 0.12, -2.2),
      new THREE.Vector3(-6.2, 0.13, -2.1),
      new THREE.Vector3(-6.2, 0.14, 5.2),
      new THREE.Vector3(-6.2, 0.15, 5.3),
      new THREE.Vector3(-6.3, 0.15, 5.4),
      new THREE.Vector3(-7.1, 0.15, 4.6),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas3(
        EstribosRosas2,
        0xff66cc,
        0,
        11.9,
        2.4 + -i * 3.8,
        1.1
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
