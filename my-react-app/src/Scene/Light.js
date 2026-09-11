import * as THREE from 'three'

class Light {
  constructor() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 2)

    this.moonLight = new THREE.DirectionalLight(
      0x9bbcff,
      3
    )

    this.moonLight.position.set(-5, 10, 8)

    this.warmLight = new THREE.PointLight(
      0xff8a45,
      100,
      20
    )

    this.warmLight.position.set(2, 3, 3)
  }
}

export default Light