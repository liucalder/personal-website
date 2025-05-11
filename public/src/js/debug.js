// src/js/debug.js
import GUI from 'https://unpkg.com/lil-gui@0.17.0/dist/lil-gui.esm.min.js'

export default class Debug {
    constructor(materials, particles) {
        this.materials = materials
        this.particles = particles

        this.gui = new GUI()
        this.gui.domElement.style.display = 'none'
        this.parameters = {
            materialColor: this.materials.parameters.materialColor
        }

        this.gui
            .addColor(this.parameters, 'materialColor')
            .onChange(() => {
                this.updateMaterialColor()
            })

        this.createToggleButton()
    }

    updateMaterialColor() {
        this.materials.updateColor(this.parameters.materialColor)
        this.particles.updateColor(this.parameters.materialColor)
    }

    createToggleButton() {
        const guiButton = document.createElement('button')
        guiButton.innerText = 'Toggle GUI'
        guiButton.style.position = 'fixed'
        guiButton.style.top = '10px'
        guiButton.style.left = '10px'
        guiButton.style.zIndex = '1000'
        document.body.appendChild(guiButton)

        guiButton.addEventListener('click', () => {
            this.toggleGUI()
        })
    }

    toggleGUI() {
        this.gui.domElement.style.display =
            this.gui.domElement.style.display === 'none' ? 'block' : 'none'
    }
}
