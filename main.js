import * as THREE from 'three';
import Asteroid from './asteroid.js';

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

const asteroids = [
    new Asteroid(0, 0, 0, -1),
    new Asteroid(1, 0, 5, 0),
    new Asteroid(1, 1, 1, 1),
    new Asteroid(2, 2, 2, 2),
    new Asteroid(3, 3, 3, 3),
    new Asteroid(4, 4, 4, 4),
    new Asteroid(5, 5, 5, 5),
    new Asteroid(6, 6, 6, 6),
]
asteroids.forEach(asteroid => {
    if(asteroid.radiation !== 0) {
        asteroid.addToScene(scene);
    }
})

camera.position.z = 30;

function animate() {

    asteroids.forEach((cube, ndx) => {
        if(cube.radiation !== 0) {
            const speed = 1 + ndx * .1;
            const rot = 0.01 * speed;
            cube.rotate(rot, rot, 0);
        }
    });

    renderer.render( scene, camera );
}

