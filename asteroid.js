import * as THREE from "three";

const BLACK = 0x000000;
const GRAY = 0x606060;
const BLUE = 0x0000FF;
const GREEN = 0x0000FF;
const YELLOW = 0xFFFF00;
const ORANGE = 0xFFA500;
const RED = 0xFF0000;
const BOMB = 0xAA00AA;
const MARKED = 0xFFFFFF;

class Asteroid {

    constructor(x, y, z, radiation) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.radiation = radiation;
    }

    getColor() {
        switch (this.radiation) {
            case -2:
                return MARKED;
            case -1:
                return GRAY;
            case 0:
                return BLACK;
            case 1:
                return BLUE;
            case 2:
                return GREEN;
            case 3:
                return YELLOW;
            case 4:
                return ORANGE;
            case 5:
                return RED;
            default:
                return BOMB;
        }
    }

    addToScene(scene) {
        const material = new THREE.MeshLambertMaterial({color: this.getColor()});
        const geometry = new THREE.IcosahedronGeometry(1);
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(this.x, this.y, this.z);
        scene.add(this.mesh);
    }

    rotate(x, y, z) {
        this.mesh.rotation.x += x;
        this.mesh.rotation.y += y;
        this.mesh.rotation.z += z;
    }
}

export default Asteroid;
