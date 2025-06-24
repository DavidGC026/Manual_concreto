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
    const geometry = new THREE.BoxGeometry(15, 6, 6);
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
    cube.position.set(-0.75, 0, 0);
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
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 3; i++) {
        if (j === 1 && i === 1) {
          continue;
        } else if (j === 2 && i === 1) {
          continue;
        } else {
          createCylinderVarillas(
            VarillasRojas,
            0xff0000,
            0.15,
            -2 + j * 2.7,
            0,
            -i * 2 + 2
          );
        }
      }
    }

    /*------------------ Crear Varillas Azules con MeshLine ----------------*/

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
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 2; i++) {
        createCylinderVarillas(
          VarillasAzules,
          0x0000ff,
          0.115,
          -j * 2.2 - 4.5,
          0,
          -i * 4.1 + 2.05
        );
      }
    }

    /* Varilllas Morados */

    const EstribosMorados = [
      new THREE.Vector3(-1.2, 0.175, 1.7),
      new THREE.Vector3(-2, 0.175, 2.2),
      new THREE.Vector3(-2.2, 0.175, 2.2),
      new THREE.Vector3(-2.2, 0.15, 2),
      new THREE.Vector3(-2.2, 0.125, 1),
      new THREE.Vector3(-2.2, 0.1, 0),
      new THREE.Vector3(-2.2, 0.075, -1),
      new THREE.Vector3(-2.2, 0.05, -2),
      new THREE.Vector3(-2.2, 0.025, -2.2),
      new THREE.Vector3(-2.1, 0, -2.2),
      new THREE.Vector3(-1, 0, -2.2),
      new THREE.Vector3(0, 0, -2.2),
      new THREE.Vector3(3, 0, -2.2),
      new THREE.Vector3(4, 0, -2.2),
      new THREE.Vector3(5, 0, -2.2),
      new THREE.Vector3(6, 0, -2.2),
      new THREE.Vector3(6.1, 0, -2.2),
      new THREE.Vector3(6.3, 0, -2.2),
      new THREE.Vector3(6.3, 0, -2),
      new THREE.Vector3(6.3, 0, 1),
      new THREE.Vector3(6.3, 0, 2),
      new THREE.Vector3(6.3, 0, 2.1),
      new THREE.Vector3(6.1, 0, 2.2),
      new THREE.Vector3(6, 0, 2.2),
      new THREE.Vector3(-1, 0, 2.2),
      new THREE.Vector3(-2, 0, 2.2),
      new THREE.Vector3(-2.05, 0, 2.2),
      new THREE.Vector3(-2.1, 0, 2.2),
      new THREE.Vector3(-2.2, 0, 2.1),
      new THREE.Vector3(-2.2, 0, 1.9),
      new THREE.Vector3(-1.5, 0, 1.2),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas2(EstribosMorados, 0xda8ee7, 0, 0, 3.5 + -i * 5, 0);
    }

    const EstribosMorados2 = [
      new THREE.Vector3(5.5, 0, -1.7),
      new THREE.Vector3(6.05, 0, -2.2),
      new THREE.Vector3(6.3, 0, -2.2),
      new THREE.Vector3(6.3, 0, -2),
      new THREE.Vector3(6.3, 0, 1),
      new THREE.Vector3(6.3, 0, 2),
      new THREE.Vector3(6.3, 0, 2.1),

      new THREE.Vector3(6.1, 0, 2.2),
      new THREE.Vector3(6, 0, 2.2),
      new THREE.Vector3(-1, 0, 2.2),
      new THREE.Vector3(-2, 0, 2.2),
      new THREE.Vector3(-2.05, 0, 2.2),
      new THREE.Vector3(-2.1, 0, 2.2),
      new THREE.Vector3(-2.2, 0, 2.1),

      new THREE.Vector3(-2.2, 0, 2),
      new THREE.Vector3(-2.2, 0, 1),
      new THREE.Vector3(-2.2, 0, 0),
      new THREE.Vector3(-2.2, 0, -1),
      new THREE.Vector3(-2.2, 0.025, -2),
      new THREE.Vector3(-2.2, 0.05, -2.2),

      new THREE.Vector3(-2.1, 0.05, -2.2),
      new THREE.Vector3(-1, 0.05, -2.2),
      new THREE.Vector3(0, 0.05, -2.2),
      new THREE.Vector3(3, 0.075, -2.2),
      new THREE.Vector3(4, 0.1, -2.2),
      new THREE.Vector3(5, 0.125, -2.2),
      new THREE.Vector3(6, 0.15, -2.2),
      new THREE.Vector3(6.1, 0.175, -2.2),
      new THREE.Vector3(6.3, 0.175, -2.2),
      new THREE.Vector3(6.3, 0.175, -1.95),
      new THREE.Vector3(5.8, 0.175, -1.45),
    ];

    for (let i = 0; i < 1; i++) {
      createMeshLineVarillas2(EstribosMorados2, 0xda8ee7, 0, 0, 0.95 + -i * 5, 0);
    }

    const EstribosAmarillos = [
      new THREE.Vector3(-7, 0, -1.35),
      new THREE.Vector3(-6, 0, -1.35),
      new THREE.Vector3(-4.5, 0, -1.35),
      new THREE.Vector3(-4, 0, -1.35),
      new THREE.Vector3(-3.5, 0, -1.35),
      new THREE.Vector3(-3.1, 0, -1.35),
      new THREE.Vector3(-3, 0, -1.35),
      new THREE.Vector3(0, 0, -2.3),
      new THREE.Vector3(0.1, 0, -2.3),
      new THREE.Vector3(0.25, 0, -2.3),
      new THREE.Vector3(3, 0, -2.3),
      new THREE.Vector3(4, 0, -2.3),
      new THREE.Vector3(5, 0, -2.3),
      new THREE.Vector3(6, 0, -2.3),
      new THREE.Vector3(6.2, 0, -2.3),
      new THREE.Vector3(6.3, 0, -2.3),
      new THREE.Vector3(6.3, 0, -2.4),
      new THREE.Vector3(6.3, 0, -3.5),
    ];
    for (let i = 0; i < 3; i++) {
      createMeshLineVarillas2(
        EstribosAmarillos,
        0xffff00,
        0,
        -1,
        3.3 + -i * 2.5,
        3.6
      );
    }

    const EstribosAmarillos2 = [
      new THREE.Vector3(-7, 0, -3.25),
      new THREE.Vector3(-6, 0, -3.25),
      new THREE.Vector3(-4.5, 0, -3.25),
      new THREE.Vector3(-4, 0, -3.25),
      new THREE.Vector3(-3.5, 0, -3.25),
      new THREE.Vector3(-3.1, 0, -3.25),
      new THREE.Vector3(-3, 0, -3.25),
      new THREE.Vector3(0, 0, -2.3),
      new THREE.Vector3(0.1, 0, -2.3),
      new THREE.Vector3(0.25, 0, -2.3),
      new THREE.Vector3(3, 0, -2.3),
      new THREE.Vector3(4, 0, -2.3),
      new THREE.Vector3(5, 0, -2.3),
      new THREE.Vector3(6, 0, -2.3),
      new THREE.Vector3(6.2, 0, -2.3),
      new THREE.Vector3(6.3, 0, -2.3),
      new THREE.Vector3(6.3, 0, -2.2),
      new THREE.Vector3(6.3, 0, -1.2),
    ];
    for (let i = 0; i < 3; i++) {
      createMeshLineVarillas2(
        EstribosAmarillos2,
        0xffff00,
        0,
        -1,
        3.3 + -i * 2.5,
        1
      );
    }

    /* Grapas Verdes Claro*/
    const GrapasVerdesClaro = [
      new THREE.Vector3(-7, 0, -1.5),
      new THREE.Vector3(-6.525, 0, -2.2),
      new THREE.Vector3(-6.225, 0, -2.2),
      new THREE.Vector3(-6.225, 0, -2.1),
      new THREE.Vector3(-6.225, 0, 2.1),
      new THREE.Vector3(-6.225, 0, 2.2),
      new THREE.Vector3(-6.525, 0, 2.2),
      new THREE.Vector3(-7, 0, 1.5),
    ];
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 3; i++) {
        createMeshLineVarillas2(
          GrapasVerdesClaro,
          0x00913f,
          0,
          9.8 - j * 2.7,
          3.7 + -i * 2.5,
          0
        );
      }
    }

    /* Grapas Verdes Oscuro*/
    const GrapasVerdesOscuro = [
      new THREE.Vector3(-7, 0, -1.5),
      new THREE.Vector3(-6.525, 0, -2.2),
      new THREE.Vector3(-6.225, 0, -2.2),
      new THREE.Vector3(-6.225, 0, -2.1),
      new THREE.Vector3(-6.225, 0, 2.1),
      new THREE.Vector3(-6.225, 0, 2.2),
      new THREE.Vector3(-6.525, 0, 2.2),
      new THREE.Vector3(-7, 0, 1.5),
    ];
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 3; i++) {
        createMeshLineVarillas2(
          GrapasVerdesOscuro,
          0x98ff98,
          0,
          1.9 - j * 2.2,
          3.475 + -i * 2.5,
          0
        );
      }
    }

    /* Grapas Verdes Oscuro */
    const GrapasVerdesClaro2 = [
      new THREE.Vector3(-4, 0, -2.6),
      new THREE.Vector3(-4.7, 0, -3.125),
      new THREE.Vector3(-4.7, 0, -3.35),
      new THREE.Vector3(-4.6, 0, -3.35),
      new THREE.Vector3(-3.2, 0, -3.35),
      new THREE.Vector3(-2.7, 0, -3.35),
      new THREE.Vector3(-2.2, 0, -3.35),
      new THREE.Vector3(-2.2, 0, -3.35),
      new THREE.Vector3(-2.2, 0, -3.35),
      new THREE.Vector3(1.2, 0, -3.35),
      new THREE.Vector3(1.7, 0, -3.35),
      new THREE.Vector3(2.2, 0, -3.35),
      new THREE.Vector3(2.7, 0, -3.35),
      new THREE.Vector3(3.2, 0, -3.35),
      new THREE.Vector3(3.8, 0, -3.35),
      new THREE.Vector3(3.8, 0, -3.125),
      new THREE.Vector3(3, 0, -2.6),
    ];
    for (let j = 0; j < 1; j++) {
      for (let i = 0; i < 3; i++) {
        createMeshLineVarillas2(
          GrapasVerdesClaro2,
          0x98ff98,
          0,
          2.5 - j * 2.2,
          3.9 + -i * 2.5,
          3.15
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
