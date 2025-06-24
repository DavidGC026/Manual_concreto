import { useEffect, useRef } from "react";
import * as THREE from "three";
import { MeshLine, MeshLineMaterial } from "three.meshline"; // Importamos MeshLine
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


/*Color Amarillo 0xffff00 */

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
        camera.position.set(20.5, 30.5, 30.5);
        camera.lookAt(-120.5, -120.5, 120.5);

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
        const geometry1 = new THREE.BoxGeometry(11.75, 4.1, 3.125);
        const materials1 = [
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

        const cube1 = new THREE.Mesh(geometry1, materials1);
        cube1.position.set(-9.625, 0, 0.075);
        scene.add(cube1);

        // Crear un cubo con materiales transparentes
        const geometry2 = new THREE.BoxGeometry(11.75, 4.1, 3.125);
        const materials2 = [
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

        const cube2 = new THREE.Mesh(geometry2, materials2);
        cube2.position.set(5.125, 0, 0.075);
        scene.add(cube2);

        // Crear un cubo con materiales transparentes
        const geometry3 = new THREE.BoxGeometry(3, 4.1, 3.125);
        const materials3 = [
            new THREE.MeshLambertMaterial({
                color: 0x919191,
                opacity: 0,
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
        cube3.position.set(-2.25, 0, 0.075);
        scene.add(cube3);

        // Crear un cubo con materiales transparentes
        const geometry4 = new THREE.BoxGeometry(3, 4.1, 12.525);
        const materials4 = [
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

        const cube4 = new THREE.Mesh(geometry4, materials4);
        cube4.position.set(-2.25, 0, 7.9);
        scene.add(cube4);

        /*------------------ Crear Varillas Rojas con MeshLine ---------------- */

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
            new THREE.Vector3(0, -2.4, 0),
            new THREE.Vector3(0, 3.75, 0),
        ];
        for (let j = 0; j < 5; j++) {
            for (let i = 0; i < 2; i++) {

                createCylinderVarillas(
                    VarillasRojas,
                    0x0000FF,
                    0.075,
                    -14.9 + j * 2.25,
                    0.35,
                    1.275 - i * 2.325
                );

            }
        }
        for (let j = 0; j < 5; j++) {
            for (let i = 0; i < 2; i++) {

                createCylinderVarillas(
                    VarillasRojas,
                    0x0000FF,
                    0.075,
                    1.5 + j * 2.25,
                    0.35,
                    1.275 - i * 2.325
                );

            }
        }
        for (let j = 0; j < 2; j++) {
            for (let i = 0; i < 5; i++) {

                createCylinderVarillas(
                    VarillasRojas,
                    0x0000FF,
                    0.075,
                    -3.425 + j * 2.3,
                    0.35,
                    13.6 - i * 2.5
                );

            }
        }

        for (let j = 0; j < 2; j++) {
            for (let i = 0; i < 2; i++) {
                createCylinderVarillas(
                    VarillasRojas,
                    0xff0000,
                    0.115,
                    -3.375 + j * 2.225,
                    0.35,
                    1.25 - i * 2.25
                );
            }
        }

        /*------------------ Crear Estribos con MeshLine ---------------- */

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
                lineWidth: 0.075,
                sizeAttenuation: 1,
            });

            // Crear malla de la línea y agregarla a la escena
            const lineMesh = new THREE.Mesh(meshLine, meshLineMaterial);
            lineMesh.position.x += xPosition;
            lineMesh.position.y += yPosition;
            lineMesh.position.z += zOffset;
            scene.add(lineMesh);
        };

        /* Grapas Naranjas */

        const GrapasNaranjas = [

            new THREE.Vector3(-5, 0, 2),
            new THREE.Vector3(-4.65, 0, 2.6),
            new THREE.Vector3(-4.65, 0, 2.7),
            new THREE.Vector3(-4.7, 0, 2.7),
            new THREE.Vector3(-4.85, 0, 2.7),
            new THREE.Vector3(-6.7, 0, 2.7),
            new THREE.Vector3(-6.9, 0, 2.7),
            new THREE.Vector3(-7.0, 0, 2.7),

            new THREE.Vector3(-7.15, 0, 2.7),
            new THREE.Vector3(-7.15, 0, 2.2),
            new THREE.Vector3(-7.15, 0, 0.3),
            new THREE.Vector3(-7.15, 0, 0.2),
            new THREE.Vector3(-7.15, 0, -2.2),
            new THREE.Vector3(-7.15, 0, -2.3),
            new THREE.Vector3(-7.15, 0, -3.9),
            new THREE.Vector3(-7.15, 0, -4.4),
            new THREE.Vector3(-7.15, 0, -4.45),
            new THREE.Vector3(-7.15, 0, -4.5),

            new THREE.Vector3(-7.1, 0, -4.6),
            new THREE.Vector3(-6.9, 0, -4.6),
            new THREE.Vector3(-6.7, 0, -4.6),
            new THREE.Vector3(-4.85, 0, -4.6),

            new THREE.Vector3(-4.65, 0, -4.6),
            new THREE.Vector3(-4.65, 0, -3.9),
            new THREE.Vector3(-4.65, 0, -2.3),
            new THREE.Vector3(-4.65, 0, -2.2),
            new THREE.Vector3(-4.65, 0, 0.2),
            new THREE.Vector3(-4.65, 0.02, 0.3),
            new THREE.Vector3(-4.65, 0.04, 2.2),
            new THREE.Vector3(-4.65, 0.06, 2.3),
            new THREE.Vector3(-4.65, 0.08, 2.7),
            new THREE.Vector3(-4.85, 0.1, 2.7),
            new THREE.Vector3(-5.3, 0.1, 2.2),
        ];
        for (let i = 0; i < 2; i++) {
            createMeshLineEstribos(
                GrapasNaranjas,
                0xffa420,
                0,
                3.625,
                3.15 + -i * 4.1,
                3.5
            );
        }

        const GrapasNaranjas2 = [

            new THREE.Vector3(-6.8, 0.1, -3.8),
            new THREE.Vector3(-7.2, 0.1, -4.4),
            new THREE.Vector3(-7.2, 0.08, -4.6),
            new THREE.Vector3(-7.1, 0.06, -4.6),
            new THREE.Vector3(-6.9, 0.04, -4.6),
            new THREE.Vector3(-6.7, 0.02, -4.6),
            new THREE.Vector3(-4.85, 0, -4.6),

            new THREE.Vector3(-4.65, 0, -4.6),
            new THREE.Vector3(-4.65, 0, -3.9),
            new THREE.Vector3(-4.65, 0, -2.3),
            new THREE.Vector3(-4.65, 0, -2.2),
            new THREE.Vector3(-4.65, 0, 0.2),
            new THREE.Vector3(-4.65, 0, 0.3),
            new THREE.Vector3(-4.65, 0, 2.2),
            new THREE.Vector3(-4.65, 0, 2.3),
            new THREE.Vector3(-4.65, 0, 2.7),

            new THREE.Vector3(-4.7, 0, 2.7),
            new THREE.Vector3(-4.85, 0, 2.7),
            new THREE.Vector3(-6.7, 0, 2.7),
            new THREE.Vector3(-6.9, 0, 2.7),
            new THREE.Vector3(-7.0, 0, 2.7),

            new THREE.Vector3(-7.15, 0, 2.7),
            new THREE.Vector3(-7.15, 0, 2.2),
            new THREE.Vector3(-7.15, 0, 0.3),
            new THREE.Vector3(-7.15, 0, 0.2),
            new THREE.Vector3(-7.15, 0, -2.2),
            new THREE.Vector3(-7.15, 0, -2.3),
            new THREE.Vector3(-7.15, 0, -3.9),
            new THREE.Vector3(-7.15, 0, -4.4),
            new THREE.Vector3(-7.15, 0, -4.45),
            new THREE.Vector3(-7.15, 0, -4.5),
            new THREE.Vector3(-7.15, 0, -4.6),
            new THREE.Vector3(-6.95, 0, -4.6),
            new THREE.Vector3(-6.5, 0, -4.0),
        ];
        for (let i = 0; i < 1; i++) {
            createMeshLineEstribos(
                GrapasNaranjas2,
                0xffa420,
                0,
                3.625,
                1.1 + -i * 2.8,
                3.5
            );
        }

        /* Estribos Verdes */

        const EstribosVerdes = [
            new THREE.Vector3(-6.4, 0, -3.85),
            new THREE.Vector3(-6.7, 0, -4.4),
            new THREE.Vector3(-6.7, 0, -4.55),
            new THREE.Vector3(-4.85, 0, -4.55),
            new THREE.Vector3(9.85, 0, -4.55),

            new THREE.Vector3(9.925, 0, -4.55),
            new THREE.Vector3(9.925, 0, -3.9),
            new THREE.Vector3(9.925, 0, -2.2),
            new THREE.Vector3(9.925, 0, -2.1),

            new THREE.Vector3(9.925, 0, -2.05),
            new THREE.Vector3(9.85, 0, -2),
            new THREE.Vector3(4.8, 0, -2),
            new THREE.Vector3(0.3, 0, -2),
            new THREE.Vector3(-4.8, 0, -2),
            new THREE.Vector3(-4.9, 0, -2),
            new THREE.Vector3(-5.5, 0, -2),
            new THREE.Vector3(-6.6, 0, -2),
            new THREE.Vector3(-6.7, 0, -2),

            new THREE.Vector3(-6.7, 0.04, -2.05),
            new THREE.Vector3(-6.7, 0.06, -2.1),
            new THREE.Vector3(-6.7, 0.08, -3.9),
            new THREE.Vector3(-6.7, 0.1, -4.55),
            new THREE.Vector3(-6.5, 0.1, -4.55),
            new THREE.Vector3(-6, 0.1, -4.05),

        ];
        for (let i = 0; i < 2; i++) {
            createMeshLineEstribos(
                EstribosVerdes,
                0x00ff00,
                0,
                -3.8,
                3.3 + -i * 4.1,
                3.4
            );
        }

        const EstribosVerdes2 = [

            new THREE.Vector3(9.65, 0, -2.6),
            new THREE.Vector3(9.925, 0, -2.1),
            new THREE.Vector3(9.925, 0, -2),
            new THREE.Vector3(9, 0, -2),
            new THREE.Vector3(4.8, 0, -2),
            new THREE.Vector3(0.3, 0, -2),
            new THREE.Vector3(-2.8, 0, -2),
            new THREE.Vector3(-4.8, 0, -2),
            new THREE.Vector3(-4.9, 0, -2),
            new THREE.Vector3(-5.5, 0, -2),
            new THREE.Vector3(-6.6, 0, -2),
            new THREE.Vector3(-6.7, 0, -2),

            new THREE.Vector3(-6.7, 0, -2.2),
            new THREE.Vector3(-6.7, 0, -2.3),
            new THREE.Vector3(-6.7, 0, -3.9),

            new THREE.Vector3(-6.7, 0, -4.6),
            new THREE.Vector3(-6.6, 0, -4.6),
            new THREE.Vector3(-5, 0, -4.6),
            new THREE.Vector3(-4.85, 0, -4.6),
            new THREE.Vector3(9.75, 0, -4.6),
            new THREE.Vector3(9.825, 0, -4.6),

            new THREE.Vector3(9.925, 0, -4.6),
            new THREE.Vector3(9.925, 0, -4.5),
            new THREE.Vector3(9.925, 0, -3.9),
            new THREE.Vector3(9.925, 0.02, -2.15),
            new THREE.Vector3(9.925, 0.02, -2.05),
            new THREE.Vector3(9.625, 0.04, -2.05),
            new THREE.Vector3(9.275, 0.1, -2.55),

        ];
        for (let i = 0; i < 1; i++) {
            createMeshLineEstribos(
                EstribosVerdes2,
                0x00ff00,
                0,
                -3.8,
                1.3 + -i * 2.6,
                3.4
            );
        }

        /* Varilla horizontal Rosa */

        const VarillaRosa = [
            new THREE.Vector3(-19.15, 0, -4.6),
            new THREE.Vector3(-16.6, 0, -4.6),
            new THREE.Vector3(-16.5, 0, -4.6),
            new THREE.Vector3(-13.5, 0, -4.2),
            new THREE.Vector3(-13.4, 0, -4.2),
            new THREE.Vector3(-9, 0, -4.2),
            new THREE.Vector3(-4.9, 0, -4.2),
            new THREE.Vector3(-4.8, 0, -4.2),
            new THREE.Vector3(-1.35, 0, -4.2),
            new THREE.Vector3(-1.30, 0, -4.2),
            new THREE.Vector3(-1.25, 0, -4.2),
            new THREE.Vector3(1.25, 0, -4.2),
            new THREE.Vector3(1.5, 0, -4.2),
            new THREE.Vector3(1.6, 0, -4.2),
            new THREE.Vector3(4, 0, -4.6),
            new THREE.Vector3(4.1, 0, -4.6),
            new THREE.Vector3(5.25, 0, -4.6),
            new THREE.Vector3(5.3, 0, -4.6),
            new THREE.Vector3(6.85, 0, -4.6),

        ];
        for (let i = 0; i < 3; i++) {
            createMeshLineEstribos(
                VarillaRosa,
                0xff66cc,
                0,
                3.9,
                2.85 + -i * 2.1,
                3.4
            );
        }

        const VarillaRosa2 = [
            new THREE.Vector3(-19.15, 0, -4.1),
            new THREE.Vector3(-16.6, 0, -4.1),
            new THREE.Vector3(-16.5, 0, -4.1),
            new THREE.Vector3(-13.5, 0, -4.5),
            new THREE.Vector3(-13.4, 0, -4.5),
            new THREE.Vector3(-9, 0, -4.5),
            new THREE.Vector3(-4.9, 0, -4.5),
            new THREE.Vector3(-4.8, 0, -4.5),
            new THREE.Vector3(-1.35, 0, -4.5),
            new THREE.Vector3(-1.30, 0, -4.5),
            new THREE.Vector3(-1.25, 0, -4.5),
            new THREE.Vector3(1.25, 0, -4.5),
            new THREE.Vector3(1.5, 0, -4.5),
            new THREE.Vector3(1.6, 0, -4.5),
            new THREE.Vector3(4, 0, -4.1),
            new THREE.Vector3(4.1, 0, -4.1),
            new THREE.Vector3(5.25, 0, -4.1),
            new THREE.Vector3(5.3, 0, -4.1),
            new THREE.Vector3(6.85, 0, -4.1),

        ];
        for (let i = 0; i < 3; i++) {
            createMeshLineEstribos(
                VarillaRosa2,
                0xff66cc,
                0,
                3.9,
                2.85 + -i * 2.1,
                5.35
            );
        }

        /* Grapas Azul Claro*/

        const GrapasAzulClaro = [

            new THREE.Vector3(-5.75, 0, -3.35),
            new THREE.Vector3(-5.20, 0, -3.35),

            new THREE.Vector3(-5.15, 0, -3.3),
            new THREE.Vector3(-5.15, 0, -2.3),
            new THREE.Vector3(-5.15, 0, -2.2),
            new THREE.Vector3(-5.15, 0, 0.2),
            new THREE.Vector3(-5.15, 0, 0.3),
            new THREE.Vector3(-5.15, 0, 1.8),
            new THREE.Vector3(-5.15, 0, 1.9),
            new THREE.Vector3(-4.65, 0, 4.7),
            new THREE.Vector3(-4.65, 0, 4.8),
            new THREE.Vector3(-4.65, 0, 5),
            new THREE.Vector3(-4.65, 0, 5.1),
            new THREE.Vector3(-4.65, 0, 7.75),
            new THREE.Vector3(-4.65, 0, 8.75),
            new THREE.Vector3(-4.65, 0, 9),
            new THREE.Vector3(-4.65, 0, 10.5),
        ];
        for (let i = 0; i < 3; i++) {
            createMeshLineEstribos(
                GrapasAzulClaro,
                0xd2f7ff,
                0,
                3.625,
                3 + -i * 2.1,
                3.5
            );
        }

        const GrapasAzulClaro2 = [

            new THREE.Vector3(-3.45, 0, -3.35),
            new THREE.Vector3(-4.0, 0, -3.35),

            new THREE.Vector3(-4.05, 0, -3.3),
            new THREE.Vector3(-4.05, 0, -2.3),
            new THREE.Vector3(-4.05, 0, -2.2),
            new THREE.Vector3(-4.05, 0, 0.2),
            new THREE.Vector3(-4.05, 0, 0.3),
            new THREE.Vector3(-4.05, 0, 1.8),
            new THREE.Vector3(-4.05, 0, 1.9),
            new THREE.Vector3(-4.65, 0, 4.7),
            new THREE.Vector3(-4.65, 0, 4.8),
            new THREE.Vector3(-4.65, 0, 5),
            new THREE.Vector3(-4.65, 0, 5.1),
            new THREE.Vector3(-4.65, 0, 7.75),
            new THREE.Vector3(-4.65, 0, 8.75),
            new THREE.Vector3(-4.65, 0, 9),
            new THREE.Vector3(-4.65, 0, 10.5),
        ];
        for (let i = 0; i < 3; i++) {
            createMeshLineEstribos(
                GrapasAzulClaro2,
                0xd2f7ff,
                0,
                1.125,
                3 + -i * 2.1,
                3.5
            );
        }

        /* GRAPAS AMARILLAS */

        const EstribosAmarillas = [

            new THREE.Vector3(11.5, 0, -4.05),
            new THREE.Vector3(11.95, 0, -4.6),
            new THREE.Vector3(12.125, 0, -4.575),
            new THREE.Vector3(12.125, 0, -4.5),
            new THREE.Vector3(12.125, 0, -3.9),
            new THREE.Vector3(12.125, 0, -2.3),
            new THREE.Vector3(12.125, 0, -2.2),
            new THREE.Vector3(12.125, 0, -2.125),
            new THREE.Vector3(11.95, 0, -2.05),
            new THREE.Vector3(11.5, 0, -2.6),

        ];
        for (let j = 0; j < 5; j++) {
            for (let i = 0; i < 3; i++) {
                if (j === 2) {
                    continue;
                }
                else if (i == 1  && j < 3) {
                    createMeshLineEstribos(
                        EstribosAmarillas,
                        0xffff00,
                        0,
                        -10.525 + 2.25 * j,
                        3.55 + -i * 2.1,
                        3.45
                    );
                }
                else if (i == 2  && j < 3) {
                    createMeshLineEstribos(
                        EstribosAmarillas,
                        0xffff00,
                        0,
                        -10.525 + 2.25 * j,
                        3.5 + -i * 2.1,
                        3.45
                    );
                }
                else if (j > 2 && j < 5) {
                    createMeshLineEstribos(
                        EstribosAmarillas,
                        0xffff00,
                        0,
                        -10.525 + 2.25 * j,
                        3.1 + -i * 2.1,
                        3.45
                    );
                }
                else {
                    createMeshLineEstribos(
                        EstribosAmarillas,
                        0xffff00,
                        0,
                        -10.525 + 2.25 * j,
                        3.4 + -i * 2.1,
                        3.45
                    );
                }
            }

        }


        const EstribosAmarillas2 = [

            new THREE.Vector3(12.8, 0, -4.05),
            new THREE.Vector3(12.275, 0, -4.6),
            new THREE.Vector3(12.1275, 0, -4.55),
            new THREE.Vector3(12.1275, 0, -4.5),
            new THREE.Vector3(12.1275, 0, -3.9),
            new THREE.Vector3(12.1275, 0, -2.3),
            new THREE.Vector3(12.1275, 0, -2.125),
            new THREE.Vector3(12.275, 0, -2.05),
            new THREE.Vector3(12.8, 0, -2.6),

        ];
        for (let j = 0; j < 5; j++) {
            for (let i = 0; i < 3; i++) {
                if (j === 2) {
                    continue;
                }
                else if (i == 1  && j > 2) {
                    createMeshLineEstribos(
                        EstribosAmarillas2,
                        0xffff00,
                        0,
                        -27.15 + 2.25 * j,
                        3.55 + -i * 2.1,
                        3.45
                    );
                }
                else if (i == 2  && j > 2) {
                    createMeshLineEstribos(
                        EstribosAmarillas2,
                        0xffff00,
                        0,
                        -27.15 + 2.25 * j,
                        3.5 + -i * 2.1,
                        3.45
                    );
                }
                else if (j > -1 && j < 3) {
                    createMeshLineEstribos(
                        EstribosAmarillas2,
                        0xffff00,
                        0,
                        -27.15 + 2.25 * j,
                        3.05 + -i * 2.1,
                        3.45
                    );
                }
                else {
                    createMeshLineEstribos(
                        EstribosAmarillas2,
                        0xffff00,
                        0,
                        -27.15 + 2.25 * j,
                        3.4 + -i * 2.1,
                        3.45
                    );
                }
            }

        }


        const EstribosAmarillas3 = [

            new THREE.Vector3(-4.05, 0, 12.8),
            new THREE.Vector3(-4.6, 0, 12.275),
            new THREE.Vector3(-4.55, 0, 12.125),
            new THREE.Vector3(-4.5, 0, 12.125),
            new THREE.Vector3(-3.9, 0, 12.125),
            new THREE.Vector3(-2.3, 0, 12.125),
            new THREE.Vector3(-2.2, 0, 12.125),
            new THREE.Vector3(-2.15, 0, 12.275),
            new THREE.Vector3(-2.65, 0, 12.8),

        ];
        for (let j = 0; j < 5; j++) {
            for (let i = 0; i < 3; i++) {
                if (j === 1) {
                    continue;
                }
                else if (j === 0) {
                    createMeshLineEstribos(
                        EstribosAmarillas3,
                        0xffff00,
                        0,
                        1.1,
                        3.3 + -i * 2.1,
                        -8.625 + 2.5 * j
                    );
                }
                else {
                    createMeshLineEstribos(
                        EstribosAmarillas3,
                        0xffff00,
                        0,
                        1.1,
                        3.2 + -i * 2.1,
                        -8.625 + 2.5 * j
                    );
                }
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
