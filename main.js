import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight,
    0.1, 5 );
const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
const renderer = new THREE.WebGLRenderer();

light.position.set(-1, 2, 10);
scene.add(light);

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

function create(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
}

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const cube1 = create(geometry, 0x44aa88, -1);
const cube2 = create(geometry, 0x44aa88, 1);

scene.add( cube1 );

camera.position.z = 5;

function animate() {

    cube1.rotation.x += 0.01;
    cube1.rotation.y += 0.01;

    cube2.rotation.x += 0.01;
    cube2.rotation.y += 0.01;

    renderer.render( scene, camera );
}

