
import * as THREE from 'https://unpkg.com/three@0.153.0/build/three.module.js'
import Materials from './materials.js'
import Particles from './particles.js'
import Debug from './debug.js'
import Lights from './lights.js'
import Renderer from './renderer.js'

// Base
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

// materials and particles
const materials = new Materials()
const particles = new Particles(materials.parameters.materialColor)
scene.add(particles.particles)

// Debug
new Debug(materials, particles)

// Meshes
const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    materials.material
)
mesh2.position.y = -4
mesh2.position.x = -2


const sectionMeshes = [mesh2]

// Lights
const lights = new Lights()
scene.add(lights.directionalLight)

// Camera and Renderer 
const renderer = new Renderer(canvas)
scene.add(renderer.cameraGroup)

// To render the scene:
renderer.render(scene)

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

    // Adjusting camera and camera group
    renderer.camera.position.y = -scrollY / window.innerHeight * 4
    renderer.cameraGroup.position.x += (cursor.x * 0.5 - renderer.cameraGroup.position.x) * 0.1
    renderer.cameraGroup.position.y += (-cursor.y * 0.5 - renderer.cameraGroup.position.y) * 0.1

    // Rotating section meshes
    for (const mesh of sectionMeshes) {
        mesh.rotation.x = elapsedTime * 0.1
        mesh.rotation.y = elapsedTime * 0.12
    }

    // Rendering
    renderer.render(scene)

    window.requestAnimationFrame(tick)
}
tick()
