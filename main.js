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
const cubes = [
    create(geometry, 0x44aa88,  0),
    create(geometry, 0x8844aa, -2),
    create(geometry, 0xaa8844,  2),
];

scene.add( cubes );

camera.position.z = 5;

function animate() {

    cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        const rot = 0.01 * speed;
        cube.rotation.x += rot;
        cube.rotation.y += rot;
    });

    renderer.render( scene, camera );
}

