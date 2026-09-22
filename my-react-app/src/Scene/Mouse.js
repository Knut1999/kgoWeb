class Mouse {
  constructor(renderer, cameraController) {
    this.renderer = renderer
    this.cameraController = cameraController

    this.isDragging = false
    this.activePointerId = null
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

    this.pointerCancel =
      this.pointerCancel.bind(this)

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

    window.addEventListener(
      'pointercancel',
      this.pointerCancel
    )
  }

  pointerDown(event) {
    if (this.activePointerId !== null) {
      return
    }

    this.isDragging = true
    this.activePointerId = event.pointerId

    this.previousMouseX = event.clientX
    this.previousMouseY = event.clientY
  }

  pointerUp(event) {
    if (event.pointerId !== this.activePointerId) {
      return
    }

    this.isDragging = false
    this.activePointerId = null
  }

  pointerCancel(event) {
    this.pointerUp(event)
  }

  pointerMove(event) {
    if (
      !this.isDragging ||
      event.pointerId !== this.activePointerId
    ) {
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

  disable() {
    this.mouseSensitivity = 0
    this.touchSensitivity = 0
  }  
  enable() {
    this.mouseSensitivity = 0.0015
    this.touchSensitivity = 0.0065
  }
}

export default Mouse