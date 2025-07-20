import * as THREE from 'three';

const BLACK = 0x000000;
const GRAY = 0x606060;
const BLUE = 0x0000FF;
const GREEN = 0x0000FF;
const YELLOW = 0xFFFF00;
const ORANGE = 0xFFA500;
const RED = 0xFF0000;
const BOMB = 0xAA00AA;
const MARKED =0xFFFFFF;

class Asteroid {

    constructor(x, y, z, radiation) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.radiation = radiation;
    }

    getColor() {
        switch (this.radiation) {
            case -2: return MARKED;
            case -1: return GRAY;
            case 0: return BLACK;
            case 1: return BLUE;
            case 2: return GREEN;
            case 3: return YELLOW;
            case 4: return ORANGE;
            case 5: return RED;
            default: return BOMB;
        }
    }

    addToScene(scene) {
        const material = new THREE.MeshLambertMaterial({color: this.getColor()});
        const geometry = new THREE.IcosahedronGeometry( 1 );
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(this.x, this.y, this.z);
        scene.add(this.mesh);
    }

    setRotation(x, y, z) {
        this.mesh.rotation.x += x;
        this.mesh.rotation.y += y;
        this.mesh.rotation.z += z;
    }
}

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
            cube.setRotation(rot, rot, 0);
        }
    });

    renderer.render( scene, camera );
}

