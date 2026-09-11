import * as THREE from 'three'

class Arrows {
  constructor(scene, renderer, camera) {
    this.scene = scene
    this.renderer = renderer
    this.camera = camera

    this.arrow = null
    this.arrow2 = null
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

    const arrows = []

    if (this.arrow) {
      arrows.push(this.arrow)
    }

    if (this.arrow2) {
      arrows.push(this.arrow2)
    }

    if (arrows.length === 0) {
      return
    }

    const intersects =
      this.raycaster.intersectObjects(
        arrows,
        true
      )

    if (intersects.length === 0) {
      return
    }

    let object = intersects[0].object

    while (object) {
      if (object === this.arrow) {
        this.hoveredArrow = this.arrow
        return
      }

      if (object === this.arrow2) {
        this.hoveredArrow = this.arrow2
        return
      }

      object = object.parent
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

    if (!this.arrow) {
      return
    }

    const intersects =
      this.raycaster.intersectObject(
        this.arrow
      )

    if (intersects.length > 0) {
      window.location.href = '/Skrivebord'
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