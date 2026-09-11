import * as THREE from 'three'

class GameScene {
  constructor(container) {
    // CONTAINER
    this.container = container
    // SCENE
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x080b18)
    // KAMERA
    let fov = 70
    if ('ontouchstart' in window) {
      fov = 99
    }
    this.camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    )
    this.camera.position.set(-7, 3, -1.7)
    // RENDERER
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    })
    // SKYGGER
    this.renderer.shadowMap.enabled = true
    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    )
    this.renderer.setSize(
      window.innerWidth,
      window.innerHeight
    )
    this.container.appendChild(
      this.renderer.domElement
    )
    this.renderer.domElement.style.position = 'fixed'
    this.renderer.domElement.style.top = '0'
    this.renderer.domElement.style.left = '0'
    this.renderer.domElement.style.cursor = 'crosshair'
    this.renderer.domElement.style.touchAction = 'none'
  }

  // START ANIMATION
  start() {
    this.renderer.setAnimationLoop(() => {
      this.update()
    })
  }

  // RENDER SCENE
  update() {
    this.renderer.render(
      this.scene,
      this.camera
    )
  }

  // HANDLE WINDOW RESIZE
  resize() {
    this.camera.aspect =
      window.innerWidth / window.innerHeight

    this.camera.updateProjectionMatrix()

    this.renderer.setSize(
      window.innerWidth,
      window.innerHeight
    )
  }
  getCameraPosition() {
    return {
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z
    }
  }

}

export default GameScene