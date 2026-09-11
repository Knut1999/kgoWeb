import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import GameScene from './GameScene'
import CameraController from './CameraController'
import Light from './Light'
import Keys from './Keys'
import Mouse from './Mouse'
import Arrows from './Arrows'
import JoyStick from './JoyStick'
import Room from './Room'

function Scene() {
  const containerRef = useRef(null)

  useEffect(function () {
    const container = containerRef.current

    // SCENE
    const gs = new GameScene(container)

    // KAMERA
    const cameraController = new CameraController()

    // LYS
    const light = new Light()

    gs.scene.add(light.ambientLight)
    gs.scene.add(light.moonLight)
    gs.scene.add(light.warmLight)

    // INPUT

    const keys = new Keys()

    // MUS / KAMERA

    const mouseObject = new Mouse(
      gs.renderer,
      cameraController
    )

    // ARROW-INTERAKSJON

    const arrows = new Arrows(
      gs.scene,
      gs.renderer,
      gs.camera
    )

    // MOBIL JOYSTICK

    const joystick = new JoyStick()

    // BLENDER-MODELL OG PILER
    const room = new Room(gs.scene) 
    room.load()

    // --------------------------------------------------
    // ANIMASJON
    // --------------------------------------------------

    const clock = new THREE.Clock()

    const arrowStartY = {
      arrow: null,
      arrow2: null
    }

    function animate() {
      arrows.animate()
      const delta = Math.min(
        clock.getDelta(),
        0.05
      )

      // Hastighet
      let speed = 2.5

      if (
        keys.keys['ShiftLeft'] ||
        keys.keys['ShiftRight']
      ) {
        speed = 5
      }

      // Retning
      const direction = new THREE.Vector3()

      if (joystick.joystickActive) {
        direction.x = joystick.joystickX
        direction.z = joystick.joystickY
      } else {
        if (keys.keys['KeyW']) {
          direction.z -= 1
        }

        if (keys.keys['KeyS']) {
          direction.z += 1
        }

        if (keys.keys['KeyA']) {
          direction.x -= 1
        }

        if (keys.keys['KeyD']) {
          direction.x += 1
        }
      }

      // Bevegelse
      if (direction.length() > 0) {
        direction.normalize()

        const movement =
          new THREE.Vector3()

        movement.x =
          direction.x *
            Math.cos(cameraController.yaw) +
          direction.z *
            Math.sin(cameraController.yaw)

        movement.z =
          -direction.x *
            Math.sin(cameraController.yaw) +
          direction.z *
            Math.cos(cameraController.yaw)

        gs.camera.position.addScaledVector(
          movement,
          speed * delta
        )
      }

      // Kameraets rotasjon
      gs.camera.rotation.order = 'YXZ'

      gs.camera.rotation.y =
        cameraController.yaw

      gs.camera.rotation.x =
        cameraController.pitch

      // Rendering
      gs.renderer.render(
        gs.scene,
        gs.camera
      )
    }

    gs.renderer.setAnimationLoop(animate)

    // RESIZE

    window.addEventListener('resize', () => {
      gs.resize()
    })

    // CLEANUP

  // CLEANUP

  return function () {
    gs.renderer.setAnimationLoop(null)

    if (gs.renderer.domElement.parentNode) {
      gs.renderer.domElement.parentNode.removeChild(
        gs.renderer.domElement
      )
    }

    gs.renderer.dispose()

    delete window.getCameraPosition
  }
  }, [])

  return <div ref={containerRef} />
}

export default Scene
