import * as THREE from 'https://unpkg.com/three@0.153.0/build/three.module.js'

export default class Renderer {
    constructor(canvas) {
        this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100)
        this.camera.position.z = 6
        this.cameraGroup = new THREE.Group()
        this.cameraGroup.add(this.camera)

        this.renderer = new THREE.WebGLRenderer({ alpha: true, canvas })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    render(scene) {
        this.renderer.render(scene, this.camera)
    }
}