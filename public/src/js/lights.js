import * as THREE from 'https://unpkg.com/three@0.153.0/build/three.module.js'

export default class Lights {
    constructor() {
        // Ambient light for baseline illumination
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light, moderate intensity

        // Directional light for focused illumination
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        this.directionalLight.position.set(2, 2, 5); // Positioned to light the text at (0, 0, -5)
        this.directionalLight.target.position.set(0, 0, -5); // Point at the text
    }
}