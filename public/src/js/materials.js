
import * as THREE from 'https://unpkg.com/three@0.153.0/build/three.module.js'

export default class Materials {
    constructor() {
        this.textureLoader = new THREE.TextureLoader()
        this.gradientTexture = this.textureLoader.load('/textures/gradients/3.jpg')
        this.gradientTexture.magFilter = THREE.NearestFilter

        this.parameters = {
            materialColor: '#ff8080'
        }

        this.material = new THREE.MeshToonMaterial({
            color: this.parameters.materialColor,
            gradientMap: this.gradientTexture
        })
    }

    updateColor(color) {
        this.material.color.set(color)
    }
}
