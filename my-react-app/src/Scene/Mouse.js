import * as THREE from 'three'

class Mouse {
  constructor(renderer, cameraController) {
    this.renderer = renderer
    this.cameraController = cameraController

    this.isDragging = false
    this.previousMouseX = 0
    this.previousMouseY = 0

    this.mouseSensitivity = 0.0015
    this.touchSensitivity = 0.0065

    this.pointerDown =
      this.pointerDown.bind(this)

    this.pointerMove =
      this.pointerMove.bind(this)

    this.pointerUp =
      this.pointerUp.bind(this)

    this.renderer.domElement.addEventListener(
      'pointerdown',
      this.pointerDown
    )

    window.addEventListener(
      'pointermove',
      this.pointerMove
    )

    window.addEventListener(
      'pointerup',
      this.pointerUp
    )
  }

  pointerDown(event) {
    this.isDragging = true

    this.previousMouseX = event.clientX
    this.previousMouseY = event.clientY
  }

  pointerUp() {
    this.isDragging = false
  }

  pointerMove(event) {
    if (!this.isDragging) {
      return
    }

    const movementX =
      event.clientX - this.previousMouseX

    const movementY =
      event.clientY - this.previousMouseY

    this.previousMouseX = event.clientX
    this.previousMouseY = event.clientY

    const sensitivity =
      event.pointerType === 'touch'
        ? this.touchSensitivity
        : this.mouseSensitivity

    this.cameraController.yaw -=
      (-movementX) * sensitivity

    this.cameraController.pitch -=
      (-movementY) * sensitivity

    this.cameraController.pitch = Math.max(
      -Math.PI / 2 + 0.05,
      Math.min(
        Math.PI / 2 - 0.05,
        this.cameraController.pitch
      )
    )
  }
}

export default Mouse