import * as THREE from 'https://unpkg.com/three@0.153.0/build/three.module.js'

export default class Lights {
    constructor() {
        // Lighting
        this.directionalLight = new THREE.DirectionalLight('#ffffff', 3)
        this.directionalLight.position.set(1, 1, 0)
    }
}