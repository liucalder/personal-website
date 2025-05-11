// src/js/index.js
import * as THREE from 'https://unpkg.com/three@0.153.0/build/three.module.js'
import Materials from './materials.js'
import Particles from './particles.js'
import Debug from './debug.js'

// Base
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

// Materials and Particles
const materials = new Materials()
const particles = new Particles(materials.parameters.materialColor)
scene.add(particles.particles)

// Debug GUI
new Debug(materials, particles)

// Meshes
const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    materials.material
)
mesh2.position.y = -4
mesh2.position.x = -2
scene.add(mesh2)

const sectionMeshes = [mesh2]

// Lighting
const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.position.set(1, 1, 0)
scene.add(directionalLight)

// Camera and Renderer
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 6
const cameraGroup = new THREE.Group()
cameraGroup.add(camera)
scene.add(cameraGroup)

const renderer = new THREE.WebGLRenderer({ alpha: true, canvas })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Resize Handler
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
})

// Animation Loop
let scrollY = 0
window.addEventListener('scroll', () => {
    scrollY = window.scrollY
})

const cursor = { x: 0, y: 0 }
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / window.innerWidth - 0.5
    cursor.y = event.clientY / window.innerHeight - 0.5
})

const clock = new THREE.Clock()
const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    camera.position.y = -scrollY / window.innerHeight * 4
    cameraGroup.position.x += (cursor.x * 0.5 - cameraGroup.position.x) * 0.1
    cameraGroup.position.y += (-cursor.y * 0.5 - cameraGroup.position.y) * 0.1

    for (const mesh of sectionMeshes) {
        mesh.rotation.x = elapsedTime * 0.1
        mesh.rotation.y = elapsedTime * 0.12
    }

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
