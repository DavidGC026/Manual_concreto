import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeScene = () => {
    const mountRef = useRef(null);
    const scene = useRef(null);
    const renderer = useRef(null);
    const camera = useRef(null);
    const controls = useRef(null);
    const animationFrameId = useRef(null);
    const resources = useRef({
        geometries: [],
        materials: [],
        textures: []
    });

    // Función para crear materiales optimizados
    const createMaterial = (color, opacity = 0.5) => {
        const material = new THREE.MeshPhysicalMaterial({
            color,
            opacity,
            transparent: opacity < 1,
            metalness: 0.2,
            roughness: 0.4,
            side: THREE.DoubleSide
        });
        resources.current.materials.push(material);
        return material;
    };

    // Función factory para crear cubos
    const createCube = (size, materialsConfig, position) => {
        const geometry = new THREE.BoxGeometry(...size);
        const materials = materialsConfig.map(config =>
            createMaterial(config.color || 0xffffff, config.opacity)
        );
        const cube = new THREE.Mesh(geometry, materials);
        cube.position.set(...position);
        scene.current.add(cube);

        resources.current.geometries.push(geometry);
        return cube;
    };

    // Función para crear tubos curvados
    const createTube = (points, color, radius = 0.1) => {
        const curve = new THREE.CatmullRomCurve3(points);
        const geometry = new THREE.TubeGeometry(curve, 128, radius, 12, false);
        const material = createMaterial(color, 1);
        const mesh = new THREE.Mesh(geometry, material);

        resources.current.geometries.push(geometry);
        return mesh;
    };

    // Limpieza de recursos
    const cleanupResources = () => {
        // Limpiar geometrías, materiales y texturas
        resources.current.geometries.forEach(g => g.dispose());
        resources.current.materials.forEach(m => m.dispose());
        resources.current.textures.forEach(t => t.dispose());
        resources.current = { geometries: [], materials: [], textures: [] };

        // Limpiar controles y renderer
        if (controls.current) {
            controls.current.dispose();
            controls.current = null;
        }

        if (renderer.current) {
            renderer.current.dispose();
            renderer.current = null;
        }

        // Cancelar animación
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
    };

    useEffect(() => {
        // Limpiar cualquier contenido previo en el contenedor
        while (mountRef.current.firstChild) {
            mountRef.current.removeChild(mountRef.current.firstChild);
        }

        // Inicializar nueva escena
        scene.current = new THREE.Scene();
        renderer.current = new THREE.WebGLRenderer({
            antialias: true,
            powerPreference: "high-performance"
        });

        // Configuración del renderer
        renderer.current.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.current.domElement);

        // Configuración del fondo
        const createGradientTexture = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            [canvas.width, canvas.height] = [window.innerWidth, window.innerHeight];

            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, "#ADD8E6");
            gradient.addColorStop(1, "#FFFFFF");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const texture = new THREE.CanvasTexture(canvas);
            resources.current.textures.push(texture);
            return texture;
        };
        scene.current.background = createGradientTexture();

        // Configuración de cámara
        camera.current = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.current.position.set(25, 35, 35);
        camera.current.lookAt(0, 0, 0);

        // Configuración de controles
        controls.current = new OrbitControls(camera.current, renderer.current.domElement);
        controls.current.enableDamping = true;
        controls.current.dampingFactor = 0.05;
        controls.current.maxDistance = 150;

        // Sistema de iluminación
        const lightConfigs = [
            { position: [10, 10, 10], intensity: 0.8 },
            { position: [-10, -10, -10], intensity: 0.8 },
            { position: [-10, 10, 10], intensity: 0.6 },
            { position: [10, -10, -10], intensity: 0.6 }
        ];

        lightConfigs.forEach(({ position, intensity }) => {
            const light = new THREE.DirectionalLight(0xffffff, intensity);
            light.position.set(...position);
            scene.current.add(light);
        });
        scene.current.add(new THREE.AmbientLight(0xffffff, 0.4));

        // Configuración de cubos
        const cubeConfigurations = [
            {
                size: [7, 7, 3],
                position: [-1.925, -0.75, 20.15],
                materials: [
                    { color: 0x919191 }, { color: 0x222222 }, { opacity: 0 },
                    { color: 0x222222 }, { color: 0x333333 }, { color: 0x222222 }
                ]
            },
            {
                size: [7, 1, 3],
                position: [-1.925, 3.25, 20.15],
                materials: [
                    { color: 0x919191 }, { color: 0x222222 }, { color: 0xf2f2f2 },
                    { opacity: 0 }, { color: 0x333333 }, { opacity: 0 }
                ]
            },
            {
                size: [7, 1, 27],
                position: [-1.925, 3.25, 5.15],
                materials: [
                    { color: 0x919191 }, { color: 0x222222 }, { color: 0xf2f2f2 },
                    { color: 0x222222 }, { opacity: 0 }, { opacity: 0 }
                ]
            },
            {
                size: [3.25, 4, 27],
                position: [-0.05, 0.75, 5.15],
                materials: [
                    { color: 0x919191 }, { color: 0x222222 }, { opacity: 0 },
                    { color: 0x222222 }, { opacity: 0 }, { opacity: 0 }
                ]
            },
            {
                size: [7, 7, 5],
                position: [-1.925, -0.75, -10.85],
                materials: [
                    { color: 0x919191 }, { color: 0x222222 }, { opacity: 0 },
                    { color: 0x222222 }, { color: 0x333333 }, { color: 0x222222 }
                ]
            },
            {
                size: [7, 1, 5],
                position: [-1.925, 3.25, -10.85],
                materials: [
                    { color: 0x919191 }, { color: 0x222222 }, { color: 0xf2f2f2 },
                    { opacity: 0 }, { opacity: 0 }, { opacity: 0 }
                ]
            },
            {
                size: [7, 1, 22],
                position: [-1.925, 3.25, -24.35],
                materials: [
                    { color: 0x919191 }, { color: 0x222222 }, { color: 0xf2f2f2 },
                    { color: 0x222222 }, { opacity: 0 }, { color: 0x222222 }
                ]
            },
            {
                size: [3.25, 4, 22],
                position: [-0.05, 0.75, -24.35],
                materials: [
                    { color: 0x919191 }, { color: 0x222222 }, { opacity: 0 },
                    { color: 0x222222 }, { opacity: 0 }, { color: 0x222222 }
                ]
            }
        ];

        // Crear todos los cubos
        cubeConfigurations.forEach(config => {
            createCube(config.size, config.materials, config.position);
        });

        // Varillas moradas optimizadas con TubeGeometry
        const purpleRodPoints = [
            new THREE.Vector3(4.5, -4.25, 0),
            new THREE.Vector3(4.5, -3.5, 0),
            new THREE.Vector3(4.5, -3, 0),
            new THREE.Vector3(4.5, -2.75, -0.5),
            new THREE.Vector3(4.5, -2.75, -1),
            new THREE.Vector3(4.5, -2.75, -56.1),
        ];

        // Crear varillas moradas
        for (let i = 0; i < 2; i++) {
            const offset = new THREE.Vector3(-i * 2.2 - 3.45, 6, 20.75);
            const points = purpleRodPoints.map(p => p.clone().add(offset));
            scene.current.add(createTube(points, 0xb20256, 0.1));
        }

        // Varillas moradas optimizadas con TubeGeometry
        const purpleRodPoints2 = [
            new THREE.Vector3(4.5, -1.25, -0),
            new THREE.Vector3(4.5, -1.75, -0),
            new THREE.Vector3(4.5, -2, -0),
            new THREE.Vector3(4.5, -2.25, -0),
            new THREE.Vector3(4.5, -2.75, -0),
            new THREE.Vector3(4.5, -2.75, -0.5),
            new THREE.Vector3(4.5, -2.75, -1),
            new THREE.Vector3(4.5, -2.75, -25.5),
            new THREE.Vector3(4.5, -2.75, -26),
            new THREE.Vector3(4.5, -2.75, -56.1),
        ];

        // Crear varillas moradas
        for (let i = 0; i < 2; i++) {
            const offset = new THREE.Vector3(-i * 2.15 - 3.45, 2, 20.75);
            const points = purpleRodPoints2.map(p => p.clone().add(offset));
            scene.current.add(createTube(points, 0xb20256, 0.1));
        }

        // Varillas rojas optimizadas con TubeGeometry
        const redRodPoints = [
            new THREE.Vector3(4.5, -4.25, -1.25),
            new THREE.Vector3(4.5, -3.75, -1.25),
            new THREE.Vector3(4.5, -3.25, -1.25),
            new THREE.Vector3(4.5, -2.75, -1.25),
            new THREE.Vector3(4.5, -2.75, -1.5),
            new THREE.Vector3(4.5, -2.75, -2),
            new THREE.Vector3(4.5, -2.75, -14),
        ];

        // Crear varillas amarillas
        for (let i = 0; i < 2; i++) {
            const offset = new THREE.Vector3(-i * 0.7 - 4.2, 6, 20.75);
            const points = redRodPoints.map(p => p.clone().add(offset));
            scene.current.add(createTube(points, 0xff0000, 0.1));
        }

        // Varillas azules optimizadas con TubeGeometry
        const redRodPoints2 = [
            new THREE.Vector3(4.5, -2.75, -0.75),
            new THREE.Vector3(4.5, -2.75, -1.5),
            new THREE.Vector3(4.5, -2.75, -2),
            new THREE.Vector3(4.5, -2.75, -21.5),
        ];

        // Crear varillas amarillas
        for (let i = 0; i < 2; i++) {
            const offset = new THREE.Vector3(-i * 0.7 - 4.2, 6, 0);
            const points = redRodPoints2.map(p => p.clone().add(offset));
            scene.current.add(createTube(points, 0xff0000, 0.1));
        }

        // Varillas amarillas optimizadas con TubeGeometry
        const yellowRodPoints = [
            new THREE.Vector3(4.5, -1.25, -1.25),
            new THREE.Vector3(4.5, -1.75, -1.25),
            new THREE.Vector3(4.5, -2.25, -1.25),
            new THREE.Vector3(4.5, -2.75, -1.25),
            new THREE.Vector3(4.5, -2.75, -1.5),
            new THREE.Vector3(4.5, -2.75, -2),
            new THREE.Vector3(4.5, -2.75, -12),
        ];

        // Crear varillas amarillas
        for (let i = 0; i < 2; i++) {
            const offset = new THREE.Vector3(-i * 0.7 - 4.2, 2, 20.75);
            const points = yellowRodPoints.map(p => p.clone().add(offset));
            scene.current.add(createTube(points, 0xffff00, 0.1));
        }

        // Varillas amarillas optimizadas con TubeGeometry
        const yellowRodPoints2 = [
            new THREE.Vector3(4.5, -2.75, -1),
            new THREE.Vector3(4.5, -2.75, -16),
        ];

        // Crear varillas amarillas
        for (let i = 0; i < 2; i++) {
            const offset = new THREE.Vector3(-i * 0.7 - 4.2, 2, -2.5);
            const points = yellowRodPoints2.map(p => p.clone().add(offset));
            scene.current.add(createTube(points, 0xffff00, 0.1));
        }

        // Varillas verdes optimizadas con TubeGeometry
        const greenRodPoints = [
            new THREE.Vector3(-1, 0.8, 0),
            new THREE.Vector3(-1.4, 0.3, 0),

            new THREE.Vector3(-1.35, 0, 0),
            new THREE.Vector3(-1.3, 0, 0),
            new THREE.Vector3(1.2, 0, 0),
            new THREE.Vector3(1.25, 0, 0),

            new THREE.Vector3(1.25, 1, 0),
            new THREE.Vector3(1.25, 2, 0),
            new THREE.Vector3(1.25, 3.35, 0),

            new THREE.Vector3(1.25, 4.35, 0),
            new THREE.Vector3(1.2, 4.35, 0),
            new THREE.Vector3(-1, 4.35, 0),
            new THREE.Vector3(-1.1, 4.35, 0),
            new THREE.Vector3(-1.2, 4.35, 0),
            new THREE.Vector3(-1.3, 4.35, 0),
            new THREE.Vector3(-1.35, 4.35, 0),

            new THREE.Vector3(-1.35, 4, 0.0),
            new THREE.Vector3(-1.35, 3, 0.05),
            new THREE.Vector3(-1.35, 2, 0.1),
            new THREE.Vector3(-1.35, 1, 0.15),
            new THREE.Vector3(-1.35, 0, 0.25),

            new THREE.Vector3(-1.3, 0, 0.25),
            new THREE.Vector3(-1.2, 0, 0.25),
            new THREE.Vector3(-1, 0, 0.25),
            new THREE.Vector3(-0.6, 0.6, 0.25),
        ];

        // Varillas verdes optimizadas con TubeGeometry
        const greenRodPoints2 = [
            new THREE.Vector3(0.6, 3.55, 0.25),
            new THREE.Vector3(1.25, 4.1, 0.25),
            new THREE.Vector3(1.25, 4.25, 0.25),

            new THREE.Vector3(1.25, 4.35, 0.25),
            new THREE.Vector3(1.2, 4.35, 0.25),
            new THREE.Vector3(-1, 4.35, 0.25),
            new THREE.Vector3(-1.1, 4.35, 0.25),
            new THREE.Vector3(-1.2, 4.35, 0.25),
            new THREE.Vector3(-1.3, 4.35, 0.25),
            new THREE.Vector3(-1.35, 4.35, 0.15),

            new THREE.Vector3(-1.35, 4, 0.1),
            new THREE.Vector3(-1.35, 3, 0.05),
            new THREE.Vector3(-1.35, 2, 0),
            new THREE.Vector3(-1.35, 1, 0),
            new THREE.Vector3(-1.35, 0, 0),

            new THREE.Vector3(-1.35, 0, 0),
            new THREE.Vector3(-1.3, 0, 0),
            new THREE.Vector3(1.2, 0, 0),
            new THREE.Vector3(1.25, 0, 0),

            new THREE.Vector3(1.25, 1, 0),
            new THREE.Vector3(1.25, 2, 0),
            new THREE.Vector3(1.25, 3, 0),
            new THREE.Vector3(1.25, 4, 0),
            new THREE.Vector3(1.25, 4.35, 0),

            new THREE.Vector3(1.15, 4.35, 0),
            new THREE.Vector3(1.05, 4.35, 0),
            new THREE.Vector3(1, 4.35, 0),
            new THREE.Vector3(0.4, 3.75, 0),
        ];

        // Crear varillas verdes
        for (let i = 0; i < 4; i++) {
            const offset = new THREE.Vector3(0, -0.95, 18 - i * 2);
            const points = greenRodPoints.map(p => p.clone().add(offset));
            scene.current.add(createTube(points, 0x00ff00, 0.1));
        }

        // Crear varillas verdes
        for (let i = 0; i < 4; i++) {
            const offset = new THREE.Vector3(0, -0.95, 17 - i * 2);
            const points = greenRodPoints2.map(p => p.clone().add(offset));
            scene.current.add(createTube(points, 0x00ff00, 0.1));
        }

        // Crear varillas verdes
        for (let i = 0; i < 3; i++) {
            const offset = new THREE.Vector3(0, -0.95, 9.35 - i * 3.5);
            const points = greenRodPoints.map(p => p.clone().add(offset));
            scene.current.add(createTube(points, 0x00ff00, 0.1));
        }
        for (let i = 0; i < 3; i++) {
            const offset = new THREE.Vector3(0, -0.95, 7.55 - i * 3.5);
            const points = greenRodPoints2.map(p => p.clone().add(offset));
            scene.current.add(createTube(points, 0x00ff00, 0.1));
        }

        /* Modificar Varillas */

        // Crear varillas verdes
        for (let i = 0; i < 4; i++) {
            const offset = new THREE.Vector3(0, -0.95, -1 - i * 2);
            const points = greenRodPoints.map(p => p.clone().add(offset));
            scene.current.add(createTube(points, 0x00ff00, 0.1));
        }

        // Crear varillas verdes
        for (let i = 0; i < 4; i++) {
            const offset = new THREE.Vector3(0, -0.95, -2 - i * 2);
            const points = greenRodPoints2.map(p => p.clone().add(offset));
            scene.current.add(createTube(points, 0x00ff00, 0.1));
        }

        // Crear varillas verdes
        for (let i = 0; i < 4; i++) {
            const offset = new THREE.Vector3(0, -0.95, -15 - i * 2);
            const points = greenRodPoints.map(p => p.clone().add(offset));
            scene.current.add(createTube(points, 0x00ff00, 0.1));
        }

        // Crear varillas verdes
        for (let i = 0; i < 4; i++) {
            const offset = new THREE.Vector3(0, -0.95, -14 - i * 2);
            const points = greenRodPoints2.map(p => p.clone().add(offset));
            scene.current.add(createTube(points, 0x00ff00, 0.1));
        }

        // Crear varillas verdes
        for (let i = 0; i < 4; i++) {
            const offset = new THREE.Vector3(0, -0.95, -24 - i * 3.5);
            const points = greenRodPoints.map(p => p.clone().add(offset));
            scene.current.add(createTube(points, 0x00ff00, 0.1));
        }
        for (let i = 0; i < 4; i++) {
            const offset = new THREE.Vector3(0, -0.95, -22.25 - i * 3.5);
            const points = greenRodPoints2.map(p => p.clone().add(offset));
            scene.current.add(createTube(points, 0x00ff00, 0.1));
        }

        // Varillas azul optimizadas con TubeGeometry
        const blueRodPoints = [

            new THREE.Vector3(2, 0.65, 0),
            new THREE.Vector3(1.55, 0.05, 0),
            new THREE.Vector3(1.5, 0.05, 0),

            new THREE.Vector3(1.25, 0.05, 0),
            new THREE.Vector3(1.25, 1, 0),
            new THREE.Vector3(1.25, 2, 0),
            new THREE.Vector3(1.25, 3, 0),
            new THREE.Vector3(1.25, 4, 0),
            new THREE.Vector3(1.25, 4.35, 0),

            new THREE.Vector3(1.5, 4.35, 0),
            new THREE.Vector3(1.55, 4.35, 0),
            new THREE.Vector3(2, 3.95, 0),

        ];

        // Crear varillas azul
        for (let i = 0; i < 6; i++) {
            const offset = new THREE.Vector3(-1.1, -0.95, 17.8 - i * 1);
            const points = blueRodPoints.map(p => p.clone().add(offset));
            scene.current.add(createTube(points, 0x0000ff, 0.1));
        }

        // Crear varillas azul
        for (let i = 0; i < 3; i++) {
            const offset = new THREE.Vector3(-1.1, -0.95, -3.55 - i * 2);
            const points = blueRodPoints.map(p => p.clone().add(offset));
            scene.current.add(createTube(points, 0x0000ff, 0.1));
        }

        // Crear varillas azul
        for (let i = 0; i < 2; i++) {
            const offset = new THREE.Vector3(-1.1, -0.95, -4.8 - i * 2);
            const points = blueRodPoints.map(p => p.clone().add(offset));
            scene.current.add(createTube(points, 0x0000ff, 0.1));
        }

        // Crear varillas azul
        for (let i = 0; i < 6; i++) {
            const offset = new THREE.Vector3(-1.1, -0.95, -14.25 - i * 1);
            const points = blueRodPoints.map(p => p.clone().add(offset));
            scene.current.add(createTube(points, 0x0000ff, 0.1));
        }

        // Varillas azul optimizadas con TubeGeometry
        const blueRodPoints2 = [

            new THREE.Vector3(0.5, 0.65, 0),
            new THREE.Vector3(0.95, 0.05, 0),
            new THREE.Vector3(1, 0.05, 0),

            new THREE.Vector3(1.25, 0.05, 0),
            new THREE.Vector3(1.25, 1, 0),
            new THREE.Vector3(1.25, 2, 0),
            new THREE.Vector3(1.25, 3, 0),
            new THREE.Vector3(1.25, 4, 0),
            new THREE.Vector3(1.25, 4.35, 0),

            new THREE.Vector3(1, 4.35, 0),
            new THREE.Vector3(0.95, 4.35, 0),
            new THREE.Vector3(0.5, 3.95, 0),

        ];

        // Crear varillas azul
        for (let i = 0; i < 6; i++) {
            const offset = new THREE.Vector3(-1.525, -0.95, 17.8 - i * 1);
            const points = blueRodPoints2.map(p => p.clone().add(offset));
            scene.current.add(createTube(points, 0x0000ff, 0.1));
        }

        // Crear varillas azul
        for (let i = 0; i < 3; i++) {
            const offset = new THREE.Vector3(-1.525, -0.95, -3.55 - i * 2);
            const points = blueRodPoints2.map(p => p.clone().add(offset));
            scene.current.add(createTube(points, 0x0000ff, 0.1));
        }

        // Crear varillas azul
        for (let i = 0; i < 2; i++) {
            const offset = new THREE.Vector3(-1.525, -0.95, -4.8 - i * 2);
            const points = blueRodPoints2.map(p => p.clone().add(offset));
            scene.current.add(createTube(points, 0x0000ff, 0.1));
        }

        // Crear varillas azul
        for (let i = 0; i < 6; i++) {
            const offset = new THREE.Vector3(-1.525, -0.95, -14.25 - i * 1);
            const points = blueRodPoints2.map(p => p.clone().add(offset));
            scene.current.add(createTube(points, 0x0000ff, 0.1));
        }

        // Animación
        const animate = () => {
            animationFrameId.current = requestAnimationFrame(animate);
            controls.current.update();
            renderer.current.render(scene.current, camera.current);
        };

        animate();

        // Limpieza al desmontar
        return () => {
            cleanupResources();
            if (mountRef.current && renderer.current?.domElement) {
                mountRef.current.removeChild(renderer.current.domElement);
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