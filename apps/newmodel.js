// Creamos escena
const scene = new THREE.Scene();

// Cámara
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 10;

// Render
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luces
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

const point = new THREE.PointLight(0xffffff, 1);
point.position.set(2, 3, 2);
scene.add(point);

// ----- CREAR 6 CUBOS -----
const cubos = [];

function crearCubo(scaleX, scaleY, scaleZ, posX) {
    const geo = new THREE.BoxGeometry(scaleX, scaleY, scaleZ);
    const mat = new THREE.MeshStandardMaterial({ color: 0xF4FF00 });
    const cubo = new THREE.Mesh(geo, mat);
    cubo.position.x = posX;
    scene.add(cubo);
    cubos.push(cubo);
}

// 6 cubos con diferentes escalas
crearCubo(1, 1, 1, -4);
crearCubo(2, 1, 1, -2);
crearCubo(1, 2, 1,  0);
crearCubo(1, 1, 2,  2);
crearCubo(1.5, 1, 0.5, 4);
crearCubo(2, 2, 0.5, 6);

let rotar = true;

// UI: cambio de color
document.getElementById("cuboColor").addEventListener("change", (e) => {
    cubos.forEach(cubo => cubo.material.color.set(e.target.value));
});

// UI: luz
document.getElementById("pointLight").addEventListener("input", (e) => {
    point.intensity = parseFloat(e.target.value);
});

// UI: rotación on/off
document.getElementById("rotate").addEventListener("click", () => {
    rotar = !rotar;
});

// Animación
function animate() {
    requestAnimationFrame(animate);

    if (rotar) {
        scene.rotation.y += 0.01;

        cubos.forEach((cubo, i) => {
            cubo.rotation.x += 0.01 + i * 0.005;
            cubo.rotation.y += 0.02 + i * 0.01;
        });
    }

    renderer.render(scene, camera);
}
animate();

// Ajuste en resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});