import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

class Room {
  constructor(scene) {
    this.scene = scene
    this.loader = new GLTFLoader()
  }

  load() {
    this.loader.load(
      '/lofi_room.glb',

      (gltf) => {
        const room = gltf.scene

        this.scene.add(room)

        const box =
          new THREE.Box3().setFromObject(room)

        const size =
          box.getSize(new THREE.Vector3())

        const center =
          box.getCenter(new THREE.Vector3())

        room.position.x -= center.x
        room.position.y -= box.min.y
        room.position.z -= center.z

        const maxSize = Math.max(
          size.x,
          size.y,
          size.z
        )

        const roomScale = 10 / maxSize

        room.scale.setScalar(roomScale)

        room.updateMatrixWorld(true)

        console.log('LO-FI ROOM LOADED')
      },

      undefined,

      (error) => {
        console.error(
          'Kunne ikke laste Blender-modellen:',
          error
        )
      }
    )
  }
}

export default Room