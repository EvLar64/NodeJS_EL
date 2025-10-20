import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';
/* import { FontLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/geometries/TextGeometry.js'; */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.set(-3, 0, 50);

const textureLoader = new THREE.TextureLoader();

const tex1 = textureLoader.load('images/chowder.png');
const tex2 = textureLoader.load('images/carpet.png');
const tex3 = textureLoader.load('images/cup.jpg');
const tex4 = textureLoader.load('images/portland.jpg');
const tex5 = textureLoader.load('images/harvey.png');

const chowder = new THREE.MeshBasicMaterial({ map: tex1 });
const carpet = new THREE.MeshBasicMaterial({ map: tex2 });
const cup = new THREE.MeshBasicMaterial({ map: tex3 });
const portland = new THREE.MeshBasicMaterial({ map: tex4 });
const harvey = new THREE.MeshBasicMaterial({ map: tex5 });

const cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'pink' });
const cube = new THREE.Mesh(cubeGeometry, carpet);
cube.position.set(-15, 0, -15);
cube.rotation.set(2, 0.5, 0);
scene.add(cube);

const icoGeometry = new THREE.IcosahedronGeometry(10);
const icoMaterial = new THREE.MeshPhongMaterial({ color: 'red' });
const icoMesh = new THREE.Mesh(icoGeometry, chowder);
icoMesh.position.set(15, 0, -15);
scene.add(icoMesh);

const coneGeometry = new THREE.ConeGeometry(5, 20, 32);
const coneMaterial = new THREE.MeshBasicMaterial({ color: 'blue' });
const cone = new THREE.Mesh(coneGeometry, cup);
cone.position.set(-45, 0, -15);
cone.rotation.set(2, 0.5, 0);
scene.add(cone);

const torusGeometry = new THREE.TorusGeometry(10, 5, 12, 80);
const torusMaterial = new THREE.MeshBasicMaterial({ color: 'green' });
const torus = new THREE.Mesh(torusGeometry, portland);
torus.position.set(45, 0, -15);
torus.rotation.set(2, 0.5, 0);
scene.add(torus);

const sphereGeometry = new THREE.SphereGeometry(10,32,32);
const sphere = new THREE.Mesh(sphereGeometry, harvey);
sphere.position.set(0, -45, -15);
scene.add(sphere);


scene.add(cube);
const cubeEdges = new THREE.EdgesGeometry(cubeGeometry);
const cubeLine = new THREE.LineSegments(
    cubeEdges,
    new THREE.LineBasicMaterial({ color: 0x000000 })
);
cube.add(cubeLine);

scene.add(icoMesh);
const icoEdges = new THREE.EdgesGeometry(icoGeometry);
const icoLine = new THREE.LineSegments(
    icoEdges,
    new THREE.LineBasicMaterial({ color: 0x000000 })
);
icoMesh.add(icoLine);

scene.add(cone);
const coneEdges = new THREE.EdgesGeometry(coneGeometry);
const coneLine = new THREE.LineSegments(
    coneEdges,
    new THREE.LineBasicMaterial({ color: 0x000000 })
);
cone.add(coneLine);

const torusEdges = new THREE.EdgesGeometry(torusGeometry);
const torusLine = new THREE.LineSegments(
    torusEdges,
    new THREE.LineBasicMaterial({ color: 0x000000 })
);
torus.add(torusLine);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, -10, 10);
const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(25, -15, -400); 
scene.add(pointLight);
scene.add(ambientLight);

/* const fontOne = new FontLoader();
fontOne.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    const textGeometry = new TextGeometry('SUCCESS!', {
        font: font,
        size: 10,
        height: 4,
        curveSegments: 10,
        bevelEnabled: false
    });

    const textMaterial = new THREE.MeshPhongMaterial({ color: 0xf8f8f8 });
    const threedtextmesh = new THREE.Mesh(textGeometry, textMaterial);
    threedtextmesh.position.set(0,50,0);
    scene.add(threedtextmesh);
}); */

let sphereDir = 1;
const sphereSpeed = 2;
const sphereLimit = 30;

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    icoMesh.rotation.z -= 0.02;
    icoMesh.rotation.y -= 0.02;

    cone.rotation.x += 0.03;
    cone.rotation.y += 0.03;

    torus.rotation.x -= 0.04;
    torus.rotation.y -= 0.04;

    sphere.rotation.y += 0.015;
    
    renderer.render(scene, camera);
}
animate();

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper)

const controls = new OrbitControls(camera, renderer.domElement)

const backgroundTexture = new THREE.TextureLoader().load('images/videostore.jpeg')
scene.background = backgroundTexture;
