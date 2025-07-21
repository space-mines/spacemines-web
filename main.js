import * as THREE from 'three';
import Asteroid from './asteroid.js';
import FlyControls from './flycontrols.js';

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight,
    0.1, 50 );
const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
const flyControls = new FlyControls(camera);
const clock = new THREE.Clock();

flyControls.movementSpeed = 5;
flyControls.rollSpeed = Math.PI / 24;

light.position.set(0, 0, 20);
scene.add(light);

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );
document.onmouseup = onMouseDown;

let asteroids = [];

for (let x = 0; x < 5; x++){
    for (let y = 0; y < 5; y++){
        for (let z = 0; z < 5; z++){
            asteroids.push(new Asteroid(x, y, z, -1));
        }
    }
}

const mineMeshes = [];
asteroids.forEach(asteroid => {
    if(asteroid.radiation !== 0) {
        mineMeshes.push(asteroid.addToScene(scene));
    }
})

camera.position.z = 30;

function animate() {

    asteroids.forEach((cube, ndx) => {
        if(cube.radiation !== 0) {
            let modifier = ndx % 3;
            const speed = 1 + modifier * .1;
            const rot = 0.01 * speed;
            cube.rotate(rot, rot, 0);
        }
    });

    let delta = clock.getDelta();
    flyControls.update(delta);

    renderer.render( scene, camera );
}

function onMouseDown(event) {
    console.log( event );
    let vector = new THREE.Vector3();

    vector.set(
        ( event.clientX / window.innerWidth ) * 2 - 1,
        -( event.clientY / window.innerHeight ) * 2 + 1,
        0.5);

    vector.unproject(camera);

    let raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    let intersects = raycaster.intersectObjects(mineMeshes);
    let selected;

    if( intersects.length > 0) {
        selected = intersects[0].object;
        console.log(selected.asteroid.radiation);
        selected.asteroid.radiation += 1;
        selected.material.color.setHex(selected.asteroid.getColor());
    }
}

