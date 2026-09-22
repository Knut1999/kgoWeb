class Joystick {
  constructor() {
    this.joystickActive = false
    this.joystickX = 0
    this.joystickY = 0

    this.joystick = document.createElement('div')
    this.joystickKnob = document.createElement('div')

    this.joystick.style.position = 'fixed'
    this.joystick.style.left = '30px'
    this.joystick.style.bottom = '30px'
    this.joystick.style.width = '120px'
    this.joystick.style.height = '120px'
    this.joystick.style.borderRadius = '50%'
    this.joystick.style.background =
      'rgba(255, 255, 255, 0.15)'
    this.joystick.style.border =
      '2px solid rgba(255, 255, 255, 0.3)'
    this.joystick.style.touchAction = 'none'
    this.joystick.style.display = 'none'
    this.joystick.style.zIndex = '10'

    this.joystickKnob.style.position = 'absolute'
    this.joystickKnob.style.left = '35px'
    this.joystickKnob.style.top = '35px'
    this.joystickKnob.style.width = '50px'
    this.joystickKnob.style.height = '50px'
    this.joystickKnob.style.borderRadius = '50%'
    this.joystickKnob.style.background =
      'rgba(255, 255, 255, 0.5)'

    this.joystick.appendChild(this.joystickKnob)
    document.body.appendChild(this.joystick)

    if ('ontouchstart' in window) {
      this.joystick.style.display = 'block'
    }

    this.joystickStart =
      this.joystickStart.bind(this)

    this.joystickMove =
      this.joystickMove.bind(this)

    this.joystickEnd =
      this.joystickEnd.bind(this)

    this.joystick.addEventListener(
      'touchstart',
      this.joystickStart
    )

    this.joystick.addEventListener(
      'touchmove',
      this.joystickMove
    )

    this.joystick.addEventListener(
      'touchend',
      this.joystickEnd
    )
  }

  joystickStart(event) {
    
    this.joystickActive = true
    this.joystickMove(event)
  }

  joystickMove(event) {
    if (!this.joystickActive) {
      return
    }

    const touch = event.touches[0]
    const rect =
      this.joystick.getBoundingClientRect()

    const centerX =
      rect.left + rect.width / 2

    const centerY =
      rect.top + rect.height / 2

    let x = touch.clientX - centerX
    let y = touch.clientY - centerY

    const radius = 35

    const distance = Math.sqrt(
      x * x + y * y
    )

    if (distance > radius) {
      x = x / distance * radius
      y = y / distance * radius
    }

    this.joystickX = x / radius
    this.joystickY = y / radius

    this.joystickKnob.style.transform =
      `translate(${x}px, ${y}px)`
  }

  joystickEnd() {
    this.joystickActive = false
    this.joystickX = 0
    this.joystickY = 0

    this.joystickKnob.style.transform =
      'translate(0px, 0px)'
  }
}

export default Joystick