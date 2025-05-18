import * as THREE from 'https://unpkg.com/three@0.153.0/build/three.module.js'
import Materials from './materials.js'
import Particles from './particles.js'
import Debug from './debug.js'
import Lights from './lights.js'
import Renderer from './renderer.js'
import Text3D from './text.js'

// Base
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

// Materials and particles
const materials = new Materials()
const particles = new Particles(materials.parameters.materialColor)
scene.add(particles.particles)

// Debug GUI
new Debug(materials, particles)

// Some Meshes
const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    materials.material
)
mesh2.position.set(-2, -4, 0)

const sectionMeshes = [mesh2]

// Lights
const lights = new Lights()
scene.add(lights.directionalLight)

// Renderer and Camera
const renderer = new Renderer(canvas)
scene.add(renderer.cameraGroup)
const camera = renderer.camera

// 3D Text
if (document.body.classList.contains('homepage')) {
    const text3D = new Text3D(scene, {
        text: 'Pong Game',
        position: new THREE.Vector3(-2, 0.5, 0),
        color: '#ff8080'
    })
}
// const raycaster = new THREE.Raycaster()

// const rayOrigin = new THREE.Vector3(0, 0, 6)  // Same as camera position
// const textPosition = new THREE.Vector3(-2, 0.5, 0)

// const rayDirection = new THREE.Vector3().subVectors(textPosition, rayOrigin).normalize()

// raycaster.set(rayOrigin, rayDirection)

// const intersects = raycaster.intersectObject(text3D.textMesh)
// if (intersects.length > 0) {    
//     console.log('Ray intersects with 3D text!')
// }

// // Scroll and cursor tracking
// let scrollY = 0
// window.addEventListener('scroll', () => {
//     scrollY = window.scrollY
// })

const cursor = { x: 0, y: 0 }
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / window.innerWidth - 0.5
    cursor.y = event.clientY / window.innerHeight - 0.5
})


// Animation loop
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Camera movement based on scroll and cursor
    renderer.camera.position.y = -scrollY / window.innerHeight * 4
    renderer.cameraGroup.position.x += (cursor.x * 0.5 - renderer.cameraGroup.position.x) * 0.1
    renderer.cameraGroup.position.y += (-cursor.y * 0.5 - renderer.cameraGroup.position.y) * 0.1

    // Rotate meshes
    for (const mesh of sectionMeshes) {
        mesh.rotation.x = elapsedTime * 0.1
        mesh.rotation.y = elapsedTime * 0.12
    }

    // Render scene
    renderer.render(scene)

    window.requestAnimationFrame(tick)
}

tick()
