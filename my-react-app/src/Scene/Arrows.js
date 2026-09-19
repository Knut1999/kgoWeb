import * as THREE from 'three'

class Arrows {
  constructor(scene, renderer, camera, letter) {
    this.scene = scene
    this.renderer = renderer
    this.camera = camera
    this.letter = letter

    this.arrow = null
    this.arrow2 = null
    this.arrowHitbox = null
    this.arrow2Hitbox = null
    this.hoveredArrow = null

    this.arrowStartY = null
    this.arrow2StartY = null

    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()

    this.updateArrowHover =
      this.updateArrowHover.bind(this)

    this.arrowClick =
      this.arrowClick.bind(this)

    window.addEventListener(
      'pointermove',
      this.updateArrowHover
    )

    this.renderer.domElement.addEventListener(
      'click',
      this.arrowClick
    )

    this.createArrows()
  }

  createArrows() {
    // --------------------------------------------------
    // PIL
    // --------------------------------------------------

    const shape = new THREE.Shape()

    shape.moveTo(0, 0.1)
    shape.lineTo(0.1, -0.1)
    shape.lineTo(0, -0.05)
    shape.lineTo(-0.1, -0.1)
    shape.closePath()

    this.arrow = new THREE.Mesh(
      new THREE.ShapeGeometry(shape),
      new THREE.MeshBasicMaterial({
        color: 0xffffff
      })
    )

    this.arrow.rotation.x = -Math.PI / 2
    this.arrow.rotation.z = -Math.PI / 2
    this.arrow.rotation.y = Math.PI / 2

    this.arrow.position.set(
      this.camera.position.x - 1.3,
      this.camera.position.y - 0.3,
      this.camera.position.z
    )

    this.scene.add(this.arrow)

    // STØRRE HITBOX PIL
    this.arrowHitbox = new THREE.Mesh(
      new THREE.PlaneGeometry(0.8, 0.8),
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0
      })
    )

    this.arrowHitbox.position.copy(
      this.arrow.position
    )

    this.arrowHitbox.rotation.copy(
      this.arrow.rotation
    )

    this.scene.add(this.arrowHitbox)

    // --------------------------------------------------
    // PIL2
    // --------------------------------------------------

    this.arrow2 = new THREE.Group()

    const shaftGeometry =
      new THREE.CylinderGeometry(
        0.035,
        0.035,
        0.35,
        8
      )

    const arrowMaterial =
      new THREE.MeshBasicMaterial({
        color: 0xffffff
      })

    const shaft = new THREE.Mesh(
      shaftGeometry,
      arrowMaterial
    )

    shaft.position.y = -0.05

    const headGeometry =
      new THREE.ConeGeometry(
        0.1,
        0.2,
        8
      )

    const head = new THREE.Mesh(
      headGeometry,
      arrowMaterial
    )

    head.position.y = 0.2

    this.arrow2.add(shaft)
    this.arrow2.add(head)

    this.arrow2.position.set(
      -5.307496631573862,
      3,
      3.2300192537684715
    )

    this.arrow2.rotation.x = Math.PI
    this.arrow2.rotation.y = 0
    this.arrow2.rotation.z = 0

    this.scene.add(this.arrow2)

    // STØRRE HITBOX PIL2
    this.arrow2Hitbox = new THREE.Mesh(
      new THREE.PlaneGeometry(0.8, 0.8),
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0
      })
    )

    this.arrow2Hitbox.position.copy(
      this.arrow2.position
    )

    this.arrow2Hitbox.rotation.copy(
      this.arrow2.rotation
    )

    this.scene.add(this.arrow2Hitbox)
  }

  updateArrowHover(event) {
    this.mouse.x =
      (event.clientX / window.innerWidth) * 2 - 1

    this.mouse.y =
      -(event.clientY / window.innerHeight) * 2 + 1

    this.raycaster.setFromCamera(
      this.mouse,
      this.camera
    )

    this.hoveredArrow = null

    const hitboxes = []

    if (this.arrowHitbox) {
      hitboxes.push(this.arrowHitbox)
    }

    if (this.arrow2Hitbox) {
      hitboxes.push(this.arrow2Hitbox)
    }

    const intersects =
      this.raycaster.intersectObjects(
        hitboxes
      )

    if (intersects.length === 0) {
      return
    }

    if (
      intersects[0].object ===
      this.arrowHitbox
    ) {
      this.hoveredArrow = this.arrow
      return
    }

    if (
      intersects[0].object ===
      this.arrow2Hitbox
    ) {
      this.hoveredArrow = this.arrow2
    }
  }

  arrowClick(event) {
    this.mouse.x =
      (event.clientX / window.innerWidth) * 2 - 1

    this.mouse.y =
      -(event.clientY / window.innerHeight) * 2 + 1

    this.raycaster.setFromCamera(
      this.mouse,
      this.camera
    )

    const hitboxes = []

    if (this.arrowHitbox) {
      hitboxes.push(this.arrowHitbox)
    }

    if (this.arrow2Hitbox) {
      hitboxes.push(this.arrow2Hitbox)
    }

    const intersects =
      this.raycaster.intersectObjects(
        hitboxes
      )

    if (intersects.length === 0) {
      return
    }

    if (
      intersects[0].object ===
      this.arrowHitbox
    ) {
      window.location.href = '/Skrivebord'
    }    
    //LETTER
    if (intersects[0].object === this.arrow2Hitbox) {
      this.letter.show()
    }
  }

  animate() {
    const time = Date.now() * 0.004

    if (this.arrow) {
      if (this.arrowStartY === null) {
        this.arrowStartY =
          this.arrow.position.y
      }

      this.arrow.position.y =
        this.arrowStartY +
        Math.sin(time) * 0.02

      this.arrow.scale.setScalar(
        this.hoveredArrow === this.arrow
          ? 1.2
          : 1
      )
    }

    if (this.arrow2) {
      if (this.arrow2StartY === null) {
        this.arrow2StartY =
          this.arrow2.position.y
      }

      this.arrow2.position.y =
        this.arrow2StartY +
        Math.sin(time) * 0.03

      this.arrow2.scale.setScalar(
        this.hoveredArrow === this.arrow2
          ? 1.2
          : 1
      )
    }
  }
}


export default Arrows