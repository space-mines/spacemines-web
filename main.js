import * as THREE from 'three';

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight,
    0.1, 50 );
const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);

light.position.set(0, 0, 20);
scene.add(light);

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

function create(geometry, color, x, y, z) {
    const material = new THREE.MeshLambertMaterial({color});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;

    return cube;
}

const geometry = new THREE.IcosahedronGeometry( 1 );
const cubes = [
    create(geometry, 0x44aa88,  0, 0, 0),
    create(geometry, 0x8844aa, -5, -5, -5),
    create(geometry, 0xaa8844,  5, 5, 5),
];

camera.position.z = 30;

function animate() {

    cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        const rot = 0.01 * speed;
        cube.rotation.x += rot;
        cube.rotation.y += rot;
    });

    renderer.render( scene, camera );
}

