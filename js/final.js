import * as THREE from '../js/jsm/three.module.js';
import { ARButton } from '../js/jsm/webxr/ARButton.js';
import { GLTFLoader } from '../js/jsm/loaders/GLTFLoader.js';

let camera, scene, renderer;
let controller;

function init() {
    // patrón threejs / WebXR
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        20
    );

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);

    document.body.appendChild(
        ARButton.createButton(renderer, {
            requiredFeatures: ['hit-test']
        })
    );

    
    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    scene.add(light);

    controller = renderer.xr.getController(0);
    controller.addEventListener('select', onSelect);
    scene.add(controller);

    window.addEventListener('resize', onWindowResize);
}


function onSelect() {
    // geometría con valores válidos
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);

    // material corregido
    const material = new THREE.MeshStandardMaterial({
        color: 0xF27F5D
    });

    const cube = new THREE.Mesh(geometry, material);

    cube.position.setFromMatrixPosition(controller.matrixWorld);

    
    scene.add(cube);
}

function animate() {
    renderer.setAnimationLoop(render);
}

function render() {
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
animate();
