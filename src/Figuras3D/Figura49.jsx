import { useEffect, useRef } from "react";
import * as THREE from "three";
import { MeshLine, MeshLineMaterial } from "three.meshline"; // Importamos MeshLine
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


/*Color Amarillo 0xffff00 */
/*Color Naranja 0xffa420 */
/*Color Verde 0x00ff00 */
/*Color Azul 0x0000FF */
/*Color Rosa 0x0000FF */


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
        const geometry1 = new THREE.BoxGeometry(18, 5.9, 3);
        const materials1 = [
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

        const cube1 = new THREE.Mesh(geometry1, materials1);
        cube1.position.set(0, -5, 0);
        scene.add(cube1);

        /*------------------ Crear Varillas Rojas con MeshLine ---------------- */

        const createMeshLineVarillas = (
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
            lineMesh.position.y += yPosition;
            lineMesh.position.z += zOffset;
            scene.add(lineMesh);
        };

        const VarillasRojas = [
            new THREE.Vector3(0, -3, 0),
            new THREE.Vector3(0, 15, 0),
        ];
        for (let j = 0; j < 14; j++) {
            for (let i = 0; i < 2; i++) {

                createMeshLineVarillas(
                    VarillasRojas,
                    0xFF0000,
                    0,
                    -8.6 + j * 1.325,
                    -5,
                    1.15 - i * 2.25
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


        /* Estribos Naranjas  */

        const EstribosNaranjas = [
            new THREE.Vector3(-6.4, 0, -3.9),
            new THREE.Vector3(-6.7, 0, -4.45),
            new THREE.Vector3(-6.7, 0, -4.6),
            new THREE.Vector3(-4.85, 0, -4.6),
            new THREE.Vector3(10.7, 0, -4.6),
            new THREE.Vector3(10.85, 0, -4.6),

            new THREE.Vector3(10.85, 0, -4.5),
            new THREE.Vector3(10.85, 0, -3.9),
            new THREE.Vector3(10.85, 0, -2.3),
            new THREE.Vector3(10.85, 0, -2.2),

            new THREE.Vector3(10.85, 0, -2.1),
            new THREE.Vector3(10.7, 0, -2.1),
            new THREE.Vector3(4.8, 0, -2.1),
            new THREE.Vector3(0.3, 0, -2.1),
            new THREE.Vector3(-4.8, 0, -2.1),
            new THREE.Vector3(-4.9, 0, -2.1),
            new THREE.Vector3(-5.5, 0, -2.1),
            new THREE.Vector3(-6.6, 0, -2.1),
            new THREE.Vector3(-6.7, 0, -2.1),

            new THREE.Vector3(-6.7, 0.04, -2.2),
            new THREE.Vector3(-6.7, 0.06, -2.3),
            new THREE.Vector3(-6.7, 0.08, -3.9),
            new THREE.Vector3(-6.7, 0.1, -4.6),
            new THREE.Vector3(-6.5, 0.1, -4.6),
            new THREE.Vector3(-6, 0.1, -4.1),

        ];
        for (let i = 0; i < 5; i++) {
            createMeshLineEstribos(
                EstribosNaranjas,
                0xFf55a3,
                0,
                -2.065,
                8.8 + -i * 3.8,
                3.35
            );
        }

        const EstribosNaranjas2 = [

            new THREE.Vector3(11.85, 0, -3),
            new THREE.Vector3(12.15, 0, -2.2),
            new THREE.Vector3(12.15, 0, -2.1),
            new THREE.Vector3(12, 0, -2.1),
            new THREE.Vector3(4.8, 0, -2),
            new THREE.Vector3(0.3, 0, -2),
            new THREE.Vector3(-2.8, 0, -2.1),
            new THREE.Vector3(-5.225, 0, -2.1),
            new THREE.Vector3(-5.375, 0, -2.1),

            new THREE.Vector3(-5.375, 0, -2.2),
            new THREE.Vector3(-5.375, 0, -2.3),
            new THREE.Vector3(-5.375, 0, -3.9),

            new THREE.Vector3(-5.375, 0, -4.6),
            new THREE.Vector3(-5.225, 0, -4.6),
            new THREE.Vector3(9.85, 0, -4.6),
            new THREE.Vector3(10.85, 0, -4.6),
            new THREE.Vector3(11.85, 0, -4.6),
            new THREE.Vector3(12.05, 0, -4.6),

            new THREE.Vector3(12.15, 0, -4.6),
            new THREE.Vector3(12.15, 0, -4.5),
            new THREE.Vector3(12.15, 0, -3.9),
            new THREE.Vector3(12.15, 0.02, -2.25),
            new THREE.Vector3(12.15, 0.02, -2.15),
            new THREE.Vector3(11.95, 0.04, -2.15),
            new THREE.Vector3(11.50, 0.1, -2.7),

        ];
        for (let i = 0; i < 4; i++) {
            createMeshLineEstribos(
                EstribosNaranjas2,
                0xFf55a3,
                0,
                -3.375,
                6.9 + -i * 3.8,
                3.4
            );
        }
        /* Estribos Verdes  */

        const EstribosVerdes = [
            new THREE.Vector3(-6.4, 0, -3.9),
            new THREE.Vector3(-6.7, 0, -4.45),
            new THREE.Vector3(-6.7, 0, -4.6),
            new THREE.Vector3(-4.85, 0, -4.6),
            new THREE.Vector3(-3.9, 0, -4.6),
            new THREE.Vector3(-3.75, 0, -4.6),

            new THREE.Vector3(-3.75, 0, -4.5),
            new THREE.Vector3(-3.75, 0, -3.9),
            new THREE.Vector3(-3.75, 0, -2.3),
            new THREE.Vector3(-3.75, 0, -2.2),

            new THREE.Vector3(-3.75, 0, -2.1),
            new THREE.Vector3(-3.9, 0, -2.1),
            new THREE.Vector3(-4.8, 0, -2.1),
            new THREE.Vector3(-4.9, 0, -2.1),
            new THREE.Vector3(-5.5, 0, -2.1),
            new THREE.Vector3(-6.6, 0, -2.1),
            new THREE.Vector3(-6.7, 0, -2.1),

            new THREE.Vector3(-6.7, 0.04, -2.2),
            new THREE.Vector3(-6.7, 0.06, -2.3),
            new THREE.Vector3(-6.7, 0.08, -3.9),
            new THREE.Vector3(-6.7, 0.1, -4.6),
            new THREE.Vector3(-6.5, 0.1, -4.6),
            new THREE.Vector3(-6, 0.1, -4.1),

        ];

        const EstribosVerdes2 = [

            new THREE.Vector3(11.85, 0, -3),
            new THREE.Vector3(12.15, 0, -2.2),
            new THREE.Vector3(12.15, 0, -2.1),
            new THREE.Vector3(12, 0, -2.1),
            new THREE.Vector3(9.475, 0, -2.1),
            new THREE.Vector3(9.2, 0, -2.1),

            new THREE.Vector3(9.2, 0, -2.2),
            new THREE.Vector3(9.2, 0, -2.3),
            new THREE.Vector3(9.2, 0, -3.9),
            new THREE.Vector3(9.2, 0, -4.5),

            new THREE.Vector3(9.2, 0, -4.6),
            new THREE.Vector3(9.475, 0, -4.6),
            new THREE.Vector3(10.85, 0, -4.6),
            new THREE.Vector3(11.85, 0, -4.6),
            new THREE.Vector3(12.05, 0, -4.6),

            new THREE.Vector3(12.15, 0, -4.6),
            new THREE.Vector3(12.15, 0, -4.5),
            new THREE.Vector3(12.15, 0, -3.9),
            new THREE.Vector3(12.15, 0.02, -2.25),
            new THREE.Vector3(12.15, 0.02, -2.15),
            new THREE.Vector3(11.95, 0.04, -2.15),
            new THREE.Vector3(11.50, 0.1, -2.7),

        ];

        for (let j = 0; j < 2; j++) {
            for (let i = 0; i < 2; i++) {
                createMeshLineEstribos(
                    EstribosVerdes2,
                    0x00ff00,
                    0,
                    -3.325 - 14.625 * j,
                    9 + -i * 3.8,
                    3.35
                );
            }
        }

        for (let j = 0; j < 2; j++) {
            for (let i = 0; i < 1; i++) {
                createMeshLineEstribos(
                    EstribosVerdes,
                    0x00ff00,
                    0,
                    -2.035 + 14.625 * j,
                    7.1 + -i * 3.8,
                    3.4
                );
            }
        }

        /* Estribos Azules  */

        const EstribosAzules = [
            new THREE.Vector3(-6.4, 0, -3.9),
            new THREE.Vector3(-6.7, 0, -4.45),
            new THREE.Vector3(-6.7, 0, -4.6),
            new THREE.Vector3(-4.85, 0, -4.6),
            new THREE.Vector3(-2.5, 0, -4.6),

            new THREE.Vector3(-2.45, 0, -4.5),
            new THREE.Vector3(-2.45, 0, -3.9),
            new THREE.Vector3(-2.45, 0, -2.3),
            new THREE.Vector3(-2.45, 0, -2.2),

            new THREE.Vector3(-2.55, 0, -2.1),
            new THREE.Vector3(-4.8, 0, -2.1),
            new THREE.Vector3(-4.9, 0, -2.1),
            new THREE.Vector3(-5.5, 0, -2.1),
            new THREE.Vector3(-6.6, 0, -2.1),
            new THREE.Vector3(-6.7, 0, -2.1),

            new THREE.Vector3(-6.7, 0.04, -2.2),
            new THREE.Vector3(-6.7, 0.06, -2.3),
            new THREE.Vector3(-6.7, 0.08, -3.9),
            new THREE.Vector3(-6.7, 0.1, -4.6),
            new THREE.Vector3(-6.5, 0.1, -4.6),
            new THREE.Vector3(-6, 0.1, -4.1),

        ];

        for (let j = 0; j < 2; j++) {
            for (let i = 0; i < 3; i++) {
                createMeshLineEstribos(
                    EstribosAzules,
                    0x0000FF,
                    0,
                    -2.065 + 13.3 * j,
                    3.3 + -i * 3.8,
                    3.35
                );
            }
        }

        const EstribosAzules2 = [

            new THREE.Vector3(11.85, 0, -3),
            new THREE.Vector3(12.15, 0, -2.2),
            new THREE.Vector3(12.15, 0, -2.1),
            new THREE.Vector3(12, 0, -2.1),
            new THREE.Vector3(8.075, 0, -2.1),
            new THREE.Vector3(7.9, 0, -2.1),

            new THREE.Vector3(7.9, 0, -2.2),
            new THREE.Vector3(7.9, 0, -2.3),
            new THREE.Vector3(7.9, 0, -3.9),
            new THREE.Vector3(7.9, 0, -4.5),

            new THREE.Vector3(7.9, 0, -4.6),
            new THREE.Vector3(8.075, 0, -4.6),
            new THREE.Vector3(10.85, 0, -4.6),
            new THREE.Vector3(11.85, 0, -4.6),
            new THREE.Vector3(12.05, 0, -4.6),

            new THREE.Vector3(12.15, 0, -4.6),
            new THREE.Vector3(12.15, 0, -4.5),
            new THREE.Vector3(12.15, 0, -3.9),
            new THREE.Vector3(12.15, 0.02, -2.25),
            new THREE.Vector3(12.15, 0.02, -2.15),
            new THREE.Vector3(11.95, 0.04, -2.15),
            new THREE.Vector3(11.50, 0.1, -2.7),

        ];

        for (let j = 0; j < 2; j++) {
            for (let i = 0; i < 3; i++) {
                createMeshLineEstribos(
                    EstribosAzules2,
                    0x0000FF,
                    0,
                    -16.65 + 13.3 * j,
                    1.4 + -i * 3.8,
                    3.4
                );
            }
        }

        /* GRAPAS AMARILLAS */

        const EstribosAmarillas = [

            new THREE.Vector3(11.7, 0, -4.05),
            new THREE.Vector3(11.95, 0, -4.6),
            new THREE.Vector3(12.125, 0, -4.55),
            new THREE.Vector3(12.125, 0, -4.5),
            new THREE.Vector3(12.125, 0, -3.9),
            new THREE.Vector3(12.125, 0, -2.3),
            new THREE.Vector3(12.125, 0, -2.2),
            new THREE.Vector3(11.95, 0, -2.15),
            new THREE.Vector3(11.7, 0, -2.65),

        ];
        for (let j = 0; j < 10; j++) {
            for (let i = 0; i < 9; i++) {
                if (j === 1 || j === 3 || j === 5 || j === 7 || j == 8) {
                    continue;
                }
                else if (i > -1 && i < 9) {
                    if (j > 0 && j < 8) {
                        createMeshLineEstribos(
                            EstribosAmarillas,
                            0xffff00,
                            0,
                            -16.65 + 1.325 * j,
                            8.95 + -i * 1.9,
                            3.4
                        );

                    } else if (j == 0) {
                        if (i > -1 && i < 3) {
                            createMeshLineEstribos(
                                EstribosAmarillas,
                                0xffff00,
                                0,
                                -16.65 + 1.325 * j,
                                8.95 + -i * 1.9,
                                3.4
                            );

                        } else {
                            createMeshLineEstribos(
                                EstribosAmarillas,
                                0xffff00,
                                0,
                                -16.65 + 1.325 * j,
                                9.14 + -i * 1.9,
                                3.4
                            );
                        }
                    }else {
                        createMeshLineEstribos(
                            EstribosAmarillas,
                            0xffff00,
                            0,
                            -16.65 + 1.325 * j,
                            9.14 + -i * 1.9,
                            3.4
                        );
                    }
                }
                else {
                    createMeshLineEstribos(
                        EstribosAmarillas,
                        0xffff00,
                        0,
                        -16.65 + 1.325 * j,
                        19.25 + -i * 1.9,
                        3.4
                    );
                }
            }
        }

        const EstribosAmarillas2 = [

            new THREE.Vector3(12.6, 0, -4.05),
            new THREE.Vector3(12.25, 0, -4.6),
            new THREE.Vector3(12.125, 0, -4.55),
            new THREE.Vector3(12.125, 0, -4.5),
            new THREE.Vector3(12.125, 0, -3.9),
            new THREE.Vector3(12.125, 0, -2.3),
            new THREE.Vector3(12.125, 0, -2.2),
            new THREE.Vector3(12.25, 0, -2.15),
            new THREE.Vector3(12.6, 0, -2.65),

        ];
        for (let j = 0; j < 10; j++) {
            for (let i = 0; i < 9; i++) {
                if (j === 1 || j === 2 || j === 4 || j === 6 || j == 8) {
                    continue;
                }
                else if (i > -1 && i < 9) {
                    if (j > 1 && j < 9) {
                        createMeshLineEstribos(
                            EstribosAmarillas2,
                            0xffff00,
                            0,
                            -19.525 + 1.325 * j,
                            8.95 + -i * 1.9,
                            3.4
                        );

                    } else if (j == 9) {
                        if (i > -1 && i < 3) {
                            createMeshLineEstribos(
                                EstribosAmarillas2,
                                0xffff00,
                                0,
                                -19.525 + 1.325 * j,
                                8.95 + -i * 1.9,
                                3.4
                            );

                        } else {
                            createMeshLineEstribos(
                                EstribosAmarillas2,
                                0xffff00,
                                0,
                                -19.525 + 1.325 * j,
                                9.14 + -i * 1.9,
                                3.4
                            );
                        }
                    } else {
                        createMeshLineEstribos(
                            EstribosAmarillas2,
                            0xffff00,
                            0,
                            -19.525 + 1.325 * j,
                            9.14 + -i * 1.9,
                            3.4
                        );
                    }
                }
                else {
                    createMeshLineEstribos(
                        EstribosAmarillas2,
                        0xffff00,
                        0,
                        -19.525 + 1.325 * j,
                        9.14 + -i * 1.9,
                        3.4
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
