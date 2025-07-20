import * as THREE from "three";
import {Quaternion} from "three";

class FlyControls {
    constructor(object, domElement) {
        this.object = object;
        this.domElement = domElement;
        this.domElement = (domElement !== undefined) ? domElement : document;
        if (domElement) this.domElement.setAttribute('tabindex', -1);

        // API

        this.movementSpeed = 1.0;
        this.rollSpeed = 0.005;

        this.dragToLook = false;
        this.autoForward = false;

        // disable default target object behavior

        // internals

        this.tmpQuaternion = new Quaternion();

        this.moveState = {
            up: 0,
            down: 0,
            left: 0,
            right: 0,
            forward: 0,
            back: 0,
            pitchUp: 0,
            pitchDown: 0,
            yawLeft: 0,
            yawRight: 0,
            rollLeft: 0,
            rollRight: 0
        };
        this.moveVector = {x: 0, y: 0, z: 0};
        this.rotationVector = {x: 0, y: 0, z: 0};
        this.domElement.addEventListener('contextmenu', function (event) {
            event.preventDefault();
        }, false);

        this.domElement.addEventListener('keydown', this.bind(this, this.keydown), false);
        this.domElement.addEventListener('keyup', this.bind(this, this.keyup), false);

        this.updateMovementVector();
        this.updateRotationVector();
    }

    bind(scope, fn) {

        return function () {

            fn.apply(scope, arguments);

        };

    }

    keydown(event) {

        if (event.altKey) {
            return;
        }

        switch (event.keyCode) {

            case event.shiftKey: /* shift */
                this.movementSpeedMultiplier = .1;
                break;

            case 87: /*W*/
                this.moveState.forward = 1;
                break;
            case 83: /*S*/
                this.moveState.back = 1;
                break;

            case 65: /*A*/
                this.moveState.left = 1;
                break;
            case 68: /*D*/
                this.moveState.right = 1;
                break;

            case 82: /*R*/
                this.moveState.up = 1;
                break;
            case 70: /*F*/
                this.moveState.down = 1;
                break;

            case 38: /*up*/
                this.moveState.pitchUp = 1;
                break;
            case 40: /*down*/
                this.moveState.pitchDown = 1;
                break;

            case 37: /*left*/
                this.moveState.yawLeft = 1;
                break;
            case 39: /*right*/
                this.moveState.yawRight = 1;
                break;

            case 81: /*Q*/
                this.moveState.rollLeft = 1;
                break;
            case 69: /*E*/
                this.moveState.rollRight = 1;
                break;

        }

        this.updateMovementVector();
        this.updateRotationVector();
    }

    keyup(event) {

        switch (event.keyCode) {

            case 16: /* shift */
                this.movementSpeedMultiplier = 1;
                break;

            case 87: /*W*/
                this.moveState.forward = 0;
                break;
            case 83: /*S*/
                this.moveState.back = 0;
                break;

            case 65: /*A*/
                this.moveState.left = 0;
                break;
            case 68: /*D*/
                this.moveState.right = 0;
                break;

            case 82: /*R*/
                this.moveState.up = 0;
                break;
            case 70: /*F*/
                this.moveState.down = 0;
                break;

            case 38: /*up*/
                this.moveState.pitchUp = 0;
                break;
            case 40: /*down*/
                this.moveState.pitchDown = 0;
                break;

            case 37: /*left*/
                this.moveState.yawLeft = 0;
                break;
            case 39: /*right*/
                this.moveState.yawRight = 0;
                break;

            case 81: /*Q*/
                this.moveState.rollLeft = 0;
                break;
            case 69: /*E*/
                this.moveState.rollRight = 0;
                break;

        }

        this.updateMovementVector();
        this.updateRotationVector();
    }

    update(delta) {
        let moveMult = delta * this.movementSpeed;
        let rotMult = delta * this.rollSpeed;

        this.object.translateX(this.moveVector.x * moveMult);
        this.object.translateY(this.moveVector.y * moveMult);
        this.object.translateZ(this.moveVector.z * moveMult);

        this.tmpQuaternion.set(this.rotationVector.x * rotMult, this.rotationVector.y * rotMult, this.rotationVector.z * rotMult, 1).normalize();
        this.object.quaternion.multiply(this.tmpQuaternion);

        // expose the rotation vector for convenience
        this.object.rotation.setFromQuaternion(this.object.quaternion, this.object.rotation.order);
    }

    updateMovementVector() {

        let forward = (this.moveState.forward || (this.autoForward && !this.moveState.back)) ? 1 : 0;

        this.moveVector.x = (-this.moveState.left + this.moveState.right);
        this.moveVector.y = (-this.moveState.down + this.moveState.up);
        this.moveVector.z = (-forward + this.moveState.back);

        //console.log( 'move:', [ this.moveVector.x, this.moveVector.y, this.moveVector.z ] );

    }

    updateRotationVector() {

        this.rotationVector.x = (-this.moveState.pitchDown + this.moveState.pitchUp);
        this.rotationVector.y = (-this.moveState.yawRight + this.moveState.yawLeft);
        this.rotationVector.z = (-this.moveState.rollRight + this.moveState.rollLeft);

        console.log('rotate:', [this.rotationVector.x, this.rotationVector.y, this.rotationVector.z]);

    }
}

export default FlyControls;

