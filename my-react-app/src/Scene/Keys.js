class Keys {
  constructor() {
    this.keys = {}

    this.keyDown =
      this.keyDown.bind(this)

    this.keyUp =
      this.keyUp.bind(this)

    window.addEventListener(
      'keydown',
      this.keyDown
    )

    window.addEventListener(
      'keyup',
      this.keyUp
    )
  }

  keyDown(event) {
    this.keys[event.code] = true
  }

  keyUp(event) {
    this.keys[event.code] = false
  }
}

export default Keys