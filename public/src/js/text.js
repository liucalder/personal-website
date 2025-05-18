import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

export default class Text3D {
  constructor(scene, options = {}) {
    this.scene = scene

    this.text = options.text || '3D Text'
    this.position = options.position || new THREE.Vector3(0, 0, 0)
    this.color = options.color || 0xffffff
    this.fontUrl = options.fontUrl || 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json'

    this.createText()
  }

  createText() {
    const loader = new FontLoader()
    loader.load(this.fontUrl, font => {
      const geometry = new TextGeometry(this.text, {
        font: font,
        size: 0.5,
        height: 0.1,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 4
      })

      const material = new THREE.MeshStandardMaterial({ color: this.color })
      this.textMesh = new THREE.Mesh(geometry, material)

      this.textMesh.position.copy(this.position)

      this.scene.add(this.textMesh)
    })
  }
}