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
    camera.position.set(30.5, 30.5, 40.5);
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
    const geometry = new THREE.BoxGeometry(30, 16, 8);
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
      new THREE.Vector3(0, -8, 0),
      new THREE.Vector3(0, 14, 0),
    ];
    for (let j = 0; j < 6; j++) {
      for (let i = 0; i < 3; i++) {
        if (j === 1 && i === 1) {
          continue;
        } else if (j === 2 && i === 1) {
          continue;
        } else if (j === 3 && i === 1) {
          continue;
        } else if (j === 4 && i === 1) {
          continue;
        } else {
          createCylinderVarillas(
            VarillasRojas,
            0xff0000,
            0.25,
            -4.25 + j * 3.5,
            0,
            -i * 3 + 3
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
        lineWidth: 0.25,
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
      new THREE.Vector3(0, -8, 0),
      new THREE.Vector3(0, 14, 0),
    ];
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 2; i++) {
        createCylinderVarillas(
          VarillasAzules,
          0x0000ff,
          0.2,
          -j * 3.5 - 8,
          0,
          -i * 6 + 3
        );
      }
    }

    /* Varilllas Morados */

    const EstribosMorados = [
      new THREE.Vector3(-1, 0.25, 2.7),
      new THREE.Vector3(-2, 0.25, 3.3),
      new THREE.Vector3(-2.2, 0.25, 3.3),
      new THREE.Vector3(-2.2, 0.225, 2),
      new THREE.Vector3(-2.2, 0.2, 1),
      new THREE.Vector3(-2.2, 0.175, 0),
      new THREE.Vector3(-2.2, 0.15, -2),
      new THREE.Vector3(-2.2, 0.125, -3),
      new THREE.Vector3(-2.2, 0.1, -3.25),
      new THREE.Vector3(-2.1, 0.075, -3.25),
      new THREE.Vector3(-1, 0.05, -3.25),
      new THREE.Vector3(0, 0.025, -3.25),
      new THREE.Vector3(3, 0, -3.25),
      new THREE.Vector3(4, 0, -3.25),
      new THREE.Vector3(5, 0, -3.25),
      new THREE.Vector3(8.8, 0, -3.25),
      new THREE.Vector3(8.9, 0, -3.25),
      new THREE.Vector3(9, 0, -3.25),
      new THREE.Vector3(9, 0, -3),
      new THREE.Vector3(9, 0, 3),
      new THREE.Vector3(9, 0, 3.1),
      new THREE.Vector3(9, 0, 3.2),
      new THREE.Vector3(8.9, 0, 3.25),
      new THREE.Vector3(7, 0, 3.25),
      new THREE.Vector3(6.1, 0, 3.25),
      new THREE.Vector3(6, 0, 3.25),
      new THREE.Vector3(-1, 0, 3.25),
      new THREE.Vector3(-1.9, 0, 3.25),
      new THREE.Vector3(-1.95, 0, 3.25),
      new THREE.Vector3(-2, 0, 3.25),
      new THREE.Vector3(-2.1, 0, 3.1),
      new THREE.Vector3(-2.2, 0, 3),
      new THREE.Vector3(-1.2, 0, 1.9),
    ];

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas2(
        EstribosMorados,
        0xda8ee7,
        0,
        4.6,
        9 + -i * 15,
        0
      );
    }

    for (let i = 0; i < 1; i++) {
      createMeshLineVarillas2(
        EstribosMorados,
        0x0000ff,
        0,
        -2.4,
        2.1 + -i * 5,
        0
      );
    }
    const EstribosMorados2 = [
      new THREE.Vector3(7, 0, -2.5),
      new THREE.Vector3(8.8, 0, -3.3),
      new THREE.Vector3(8.9, 0, -3.3),
      new THREE.Vector3(9, 0, -3.3),
      new THREE.Vector3(9, 0, -3),
      new THREE.Vector3(9, 0, 3),
      new THREE.Vector3(9, 0, 3.1),
      new THREE.Vector3(9, 0, 3.2),

      new THREE.Vector3(9, 0, 3.3),
      new THREE.Vector3(7, 0, 3.3),
      new THREE.Vector3(6.1, 0, 3.3),
      new THREE.Vector3(6, 0, 3.3),
      new THREE.Vector3(-1, 0, 3.3),
      new THREE.Vector3(-2, 0, 3.3),
      new THREE.Vector3(-2.1, 0, 3.3),

      new THREE.Vector3(-2.2, 0.02, 3.2),
      new THREE.Vector3(-2.2, 0.04, 2),
      new THREE.Vector3(-2.2, 0.06, 1),
      new THREE.Vector3(-2.2, 0.08, 0),
      new THREE.Vector3(-2.2, 0.1, -2),
      new THREE.Vector3(-2.3, 0.12, -3),
      new THREE.Vector3(-2.2, 0.14, -3.3),

      new THREE.Vector3(-2.1, 0.16, -3.3),
      new THREE.Vector3(-2, 0.16, -3.3),
      new THREE.Vector3(-1, 0.18, -3.3),
      new THREE.Vector3(0, 0.2, -3.3),
      new THREE.Vector3(3, 0.2, -3.3),
      new THREE.Vector3(4, 0.2, -3.3),
      new THREE.Vector3(5, 0.2, -3.3),
      new THREE.Vector3(8.8, 0.2, -3.3),
      new THREE.Vector3(8.9, 0.2, -3.3),
      new THREE.Vector3(9, 0.2, -3),
      new THREE.Vector3(9, 0.2, -2.8),
      new THREE.Vector3(7.6, 0.2, -1.2),
    ];

    for (let i = 0; i < 1; i++) {
      createMeshLineVarillas2(
        EstribosMorados2,
        0xda8ee7,
        0,
        4.6,
        1.5 + -i * 5,
        0
      );
    }

    for (let i = 0; i < 2; i++) {
      createMeshLineVarillas2(
        EstribosMorados2,
        0x0000ff,
        0,
        -2.4,
        9.6 + -i * 15,
        0
      );
    }

    /* Varilllas Amarillas */
    const EstribosAmarillos = [
      new THREE.Vector3(-12, 0, -0),
      new THREE.Vector3(-7.1, 0, -0),
      new THREE.Vector3(-7, 0, -0),
      new THREE.Vector3(-2.1, 0, -1.5),
      new THREE.Vector3(-2, 0, -1.5),
      new THREE.Vector3(0, 0, -1.5),
      new THREE.Vector3(0.1, 0, -1.5),
      new THREE.Vector3(0.25, 0, -1.5),
      new THREE.Vector3(3, 0, -1.5),
      new THREE.Vector3(4, 0, -1.5),
      new THREE.Vector3(5, 0, -1.5),
      new THREE.Vector3(6, 0, -1.5),
      new THREE.Vector3(6.2, 0, -1.5),
      new THREE.Vector3(13.5, 0, -1.5),
      new THREE.Vector3(13.5, 0, -1.9),
      new THREE.Vector3(13.5, 0, -3.5),
    ];
    for (let i = 0; i < 3; i++) {
      createMeshLineVarillas2(
        EstribosAmarillos,
        0xffff00,
        0,
        -1,
        10.25 + -i * 7.5,
        3.6
      );
    }

    const EstribosAmarillos2 = [
      new THREE.Vector3(-12, 0, -4.5),
      new THREE.Vector3(-7.1, 0, -4.5),
      new THREE.Vector3(-7, 0, -4.5),
      new THREE.Vector3(-2.1, 0, -3),
      new THREE.Vector3(-2, 0, -3),
      new THREE.Vector3(0, 0, -3),
      new THREE.Vector3(0.1, 0, -3),
      new THREE.Vector3(0.25, 0, -3),
      new THREE.Vector3(3, 0, -3),
      new THREE.Vector3(4, 0, -3),
      new THREE.Vector3(5, 0, -3),
      new THREE.Vector3(6, 0, -3),
      new THREE.Vector3(6.2, 0, -3),
      new THREE.Vector3(13.5, 0, -3),
      new THREE.Vector3(13.5, 0, -2.9),
      new THREE.Vector3(13.5, 0, -1.2),
    ];
    for (let i = 0; i < 3; i++) {
      createMeshLineVarillas2(
        EstribosAmarillos2,
        0xffff00,
        0,
        -1,
        10.25 + -i * 7.5,
        1
      );
    }

    /* Grapas Verdes */
    const GrapasVerdesClaro = [
      new THREE.Vector3(-7.25, 0, -2.5),
      new THREE.Vector3(-6.5, 0, -3.3),
      new THREE.Vector3(-6.2, 0, -3.3),
      new THREE.Vector3(-6.2, 0, -2.2),
      new THREE.Vector3(-6.2, 0, 2.2),
      new THREE.Vector3(-6.2, 0, 3.3),
      new THREE.Vector3(-6.5, 0, 3.3),
      new THREE.Vector3(-7.25, 0, 2.5),
    ];
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 3; i++) {
        createMeshLineVarillas2(
          GrapasVerdesClaro,
          0x00913F,
          0,
          16.25 - j * 10.5,
          10.7 + -i * 7.5,
          0
        );
      }
    }

    /* Grapas Verdes Oscuro */
    const GrapasVerdesOscuro = [
      new THREE.Vector3(-7.25, 0, -2.5),
      new THREE.Vector3(-6.5, 0, -3.3),
      new THREE.Vector3(-6.2, 0, -3.3),
      new THREE.Vector3(-6.2, 0, -2.2),
      new THREE.Vector3(-6.2, 0, 2.2),
      new THREE.Vector3(-6.2, 0, 3.3),
      new THREE.Vector3(-6.5, 0, 3.3),
      new THREE.Vector3(-7.25, 0, 2.5),
    ];
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 3; i++) {
        createMeshLineVarillas2(
          GrapasVerdesOscuro,
          0x4A9700,
          0,
          -1.5 - j * 3.5,
          10.7 + -i * 7.5,
          0
        );
      }
    }

    /* Grapas Verdes Oscuro */
    const GrapasVerdesClaro2 = [
      new THREE.Vector3(-6.85, 0, -2.2),
      new THREE.Vector3(-7.8, 0, -3.3),
      new THREE.Vector3(-7.7, 0, -3.3),
      new THREE.Vector3(-7.2, 0, -3.3),
      new THREE.Vector3(-6.7, 0, -3.3),
      new THREE.Vector3(-6.2, 0, -3.3),
      new THREE.Vector3(-6.2, 0, -3.3),
      new THREE.Vector3(-6.2, 0, -3.3),
      new THREE.Vector3(6.2, 0, -3.3),
      new THREE.Vector3(7.2, 0, -3.3),
      new THREE.Vector3(7.7, 0, -3.3),
      new THREE.Vector3(8.2, 0, -3.3),
      new THREE.Vector3(8.7, 0, -3.3),
      new THREE.Vector3(9.2, 0, -3.3),
      new THREE.Vector3(9.7, 0, -3.3),
      new THREE.Vector3(10.2, 0, -3.3),
      new THREE.Vector3(10.7, 0, -3.3),
      new THREE.Vector3(9.75, 0, -2.2),
    ];
    for (let j = 0; j < 1; j++) {
      for (let i = 0; i < 3; i++) {
        createMeshLineVarillas2(
          GrapasVerdesClaro2,
          0x98ff98,
          0,
          3 - j * 3.5,
          11 + -i * 7.5,
          3
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
