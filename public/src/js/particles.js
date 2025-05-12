
import * as THREE from 'https://unpkg.com/three@0.153.0/build/three.module.js'

export default class Particles {
    constructor(materialColor) {
        this.particlesCount = 1000
        this.positions = new Float32Array(this.particlesCount * 3)
        this.pageHeight = document.body.scrollHeight

        for (let i = 0; i < this.particlesCount; i++) {
            this.positions[i * 3 + 0] = (Math.random() - 0.5) * 10
            this.positions[i * 3 + 1] = (Math.random() - 0.5) * this.pageHeight / 100
            this.positions[i * 3 + 2] = (Math.random() - 0.5) * 10
        }

        this.particlesGeometry = new THREE.BufferGeometry()
        this.particlesGeometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))

        this.particlesMaterial = new THREE.PointsMaterial({
            color: materialColor,
            sizeAttenuation: true,
            size: 0.03
        })

        this.particles = new THREE.Points(this.particlesGeometry, this.particlesMaterial)
    }

    updateColor(color) {
        this.particlesMaterial.color.set(color)
    }
}
