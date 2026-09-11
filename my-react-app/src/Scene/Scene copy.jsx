import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import GameScene from './GameScene'

function Scene() {
  const containerRef = useRef(null)

  useEffect(function () {
    const container = containerRef.current

    // --------------------------------------------------
    // SCENE
    // --------------------------------------------------

    const gs = new GameScene(container)


    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x080b18)

    // --------------------------------------------------
    // KAMERA
    // --------------------------------------------------

    let fov = 70

    if ('ontouchstart' in window) {
      fov = 99
    }

    const camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    )

    camera.position.set(-7, 3, -1.7)

    let yaw = Math.PI / 2
    let pitch = 0

    // --------------------------------------------------
    // RENDERER
    // --------------------------------------------------

    const renderer = new THREE.WebGLRenderer({
      antialias: true
    })

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    )

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    )

    renderer.shadowMap.enabled = true

    container.appendChild(renderer.domElement)

    renderer.domElement.style.position = 'fixed'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    renderer.domElement.style.cursor = 'crosshair'
    renderer.domElement.style.touchAction = 'none'

    // --------------------------------------------------
    // LYS
    // --------------------------------------------------

    const ambientLight = new THREE.AmbientLight(
      0xffffff,
      2
    )

    scene.add(ambientLight)

    const moonLight = new THREE.DirectionalLight(
      0x9bbcff,
      3
    )

    moonLight.position.set(-5, 10, 8)
    scene.add(moonLight)

    const warmLight = new THREE.PointLight(
      0xff8a45,
      100,
      20
    )

    warmLight.position.set(2, 3, 3)
    scene.add(warmLight)

    // --------------------------------------------------
    // INPUT
    // --------------------------------------------------

    const keys = {}

    function keyDown(event) {
      keys[event.code] = true
    }

    function keyUp(event) {
      keys[event.code] = false
    }

    window.addEventListener('keydown', keyDown)
    window.addEventListener('keyup', keyUp)

    // --------------------------------------------------
    // MUS / KAMERA
    // --------------------------------------------------

    let isDragging = false
    let previousMouseX = 0
    let previousMouseY = 0

    const mouseSensitivity = 0.0007
    const touchSensitivity = 0.0035

    function pointerDown(event) {
      if (
        event.target === joystick ||
        joystick.contains(event.target)
      ) {
        return
      }

      isDragging = true
      previousMouseX = event.clientX
      previousMouseY = event.clientY
    }

    function pointerUp() {
      isDragging = false
    }

    function pointerMove(event) {
      if (!isDragging) {
        return
      }

      const movementX =
        event.clientX - previousMouseX

      const movementY =
        event.clientY - previousMouseY

      previousMouseX = event.clientX
      previousMouseY = event.clientY

      const sensitivity =
        event.pointerType === 'touch'
          ? touchSensitivity
          : mouseSensitivity

      yaw -= (-movementX) * sensitivity
      pitch -= (-movementY) * sensitivity

      pitch = Math.max(
        -Math.PI / 2 + 0.05,
        Math.min(Math.PI / 2 - 0.05, pitch)
      )
    }

    renderer.domElement.addEventListener(
      'pointerdown',
      pointerDown
    )

    window.addEventListener(
      'pointermove',
      pointerMove
    )

    window.addEventListener(
      'pointerup',
      pointerUp
    )

    // --------------------------------------------------
    // PILE-INTERAKSJON
    // --------------------------------------------------

    let arrow = null
    let arrow2 = null
    let hoveredArrow = null

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    function updateArrowHover(event) {
      mouse.x =
        (event.clientX / window.innerWidth) * 2 - 1

      mouse.y =
        -(event.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(mouse, camera)

      hoveredArrow = null

      const arrows = []

      if (arrow) {
        arrows.push(arrow)
      }

      if (arrow2) {
        arrows.push(arrow2)
      }

      if (arrows.length === 0) {
        return
      }

      const intersects =
        raycaster.intersectObjects(arrows, true)

      if (intersects.length === 0) {
        return
      }

      let object = intersects[0].object

      while (object) {
        if (object === arrow) {
          hoveredArrow = arrow
          return
        }

        if (object === arrow2) {
          hoveredArrow = arrow2
          return
        }

        object = object.parent
      }
    }

    function arrowClick(event) {
      mouse.x =
        (event.clientX / window.innerWidth) * 2 - 1

      mouse.y =
        -(event.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(mouse, camera)

      if (!arrow) {
        return
      }

      const intersects =
        raycaster.intersectObject(arrow)

      if (intersects.length > 0) {
        window.location.href = '/Skrivebord'
      }
    }

    window.addEventListener(
      'pointermove',
      updateArrowHover
    )

    renderer.domElement.addEventListener(
      'click',
      arrowClick
    )

    // --------------------------------------------------
    // MOBIL JOYSTICK
    // --------------------------------------------------

    let joystickActive = false
    let joystickX = 0
    let joystickY = 0

    const joystick = document.createElement('div')
    const joystickKnob = document.createElement('div')

    joystick.style.position = 'fixed'
    joystick.style.left = '30px'
    joystick.style.bottom = '30px'
    joystick.style.width = '120px'
    joystick.style.height = '120px'
    joystick.style.borderRadius = '50%'
    joystick.style.background =
      'rgba(255, 255, 255, 0.15)'
    joystick.style.border =
      '2px solid rgba(255, 255, 255, 0.3)'
    joystick.style.touchAction = 'none'
    joystick.style.display = 'none'
    joystick.style.zIndex = '10'

    joystickKnob.style.position = 'absolute'
    joystickKnob.style.left = '35px'
    joystickKnob.style.top = '35px'
    joystickKnob.style.width = '50px'
    joystickKnob.style.height = '50px'
    joystickKnob.style.borderRadius = '50%'
    joystickKnob.style.background =
      'rgba(255, 255, 255, 0.5)'

    joystick.appendChild(joystickKnob)
    document.body.appendChild(joystick)

    if ('ontouchstart' in window) {
      joystick.style.display = 'block'
    }

    function joystickStart(event) {
      joystickActive = true
      joystickMove(event)
    }

    function joystickMove(event) {
      if (!joystickActive) {
        return
      }

      const touch = event.touches[0]
      const rect = joystick.getBoundingClientRect()

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

      joystickX = x / radius
      joystickY = y / radius

      joystickKnob.style.transform =
        `translate(${x}px, ${y}px)`
    }

    function joystickEnd() {
      joystickActive = false
      joystickX = 0
      joystickY = 0

      joystickKnob.style.transform =
        'translate(0px, 0px)'
    }

    joystick.addEventListener(
      'touchstart',
      joystickStart
    )

    joystick.addEventListener(
      'touchmove',
      joystickMove
    )

    joystick.addEventListener(
      'touchend',
      joystickEnd
    )

    // --------------------------------------------------
    // BLENDER-MODELL OG PILER
    // --------------------------------------------------

    const loader = new GLTFLoader()

    loader.load(
      '/lofi_room.glb',

      function (gltf) {
        const room = gltf.scene
        scene.add(room)

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

        // --------------------------------------------------
        // PIL
        // --------------------------------------------------

        const shape = new THREE.Shape()

        shape.moveTo(0, 0.1)
        shape.lineTo(0.1, -0.1)
        shape.lineTo(0, -0.05)
        shape.lineTo(-0.1, -0.1)
        shape.closePath()

        arrow = new THREE.Mesh(
          new THREE.ShapeGeometry(shape),
          new THREE.MeshBasicMaterial({
            color: 0xffffff
          })
        )

        arrow.rotation.x = -Math.PI / 2
        arrow.rotation.z = -Math.PI / 2
        arrow.rotation.y = Math.PI / 2

        arrow.position.set(
          camera.position.x - 1.3,
          camera.position.y - 0.3,
          camera.position.z
        )

        scene.add(arrow)

        // --------------------------------------------------
        // PIL2
        // --------------------------------------------------

        arrow2 = new THREE.Group()

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

        arrow2.add(shaft)
        arrow2.add(head)

        arrow2.position.set(
          -5.307496631573862,
          3,
          3.2300192537684715
        )

        arrow2.rotation.x = Math.PI
        arrow2.rotation.y = 0
        arrow2.rotation.z = 0

        scene.add(arrow2)

        console.log('LO-FI ROOM LOADED')
      },

      undefined,

      function (error) {
        console.error(
          'Kunne ikke laste Blender-modellen:',
          error
        )
      }
    )

    // --------------------------------------------------
    // KAMERAPOSISJON
    // --------------------------------------------------

    function getCameraPosition() {
      return {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z
      }
    }

    window.getCameraPosition =
      getCameraPosition

    // --------------------------------------------------
    // ANIMASJON
    // --------------------------------------------------

    const clock = new THREE.Clock()

    const arrowStartY = {
      arrow: null,
      arrow2: null
    }

    function animate() {
      const delta = Math.min(
        clock.getDelta(),
        0.05
      )

      // Hastighet
      let speed = 2.5

      if (
        keys['ShiftLeft'] ||
        keys['ShiftRight']
      ) {
        speed = 5
      }

      // Retning
      const direction = new THREE.Vector3()

      if (joystickActive) {
        direction.x = joystickX
        direction.z = joystickY
      } else {
        if (keys['KeyW']) {
          direction.z -= 1
        }

        if (keys['KeyS']) {
          direction.z += 1
        }

        if (keys['KeyA']) {
          direction.x -= 1
        }

        if (keys['KeyD']) {
          direction.x += 1
        }
      }

      // Bevegelse
      if (direction.length() > 0) {
        direction.normalize()

        const movement =
          new THREE.Vector3()

        movement.x =
          direction.x * Math.cos(yaw) +
          direction.z * Math.sin(yaw)

        movement.z =
          -direction.x * Math.sin(yaw) +
          direction.z * Math.cos(yaw)

        camera.position.addScaledVector(
          movement,
          speed * delta
        )
      }

      // Kameraets rotasjon
      camera.rotation.order = 'YXZ'
      camera.rotation.y = yaw
      camera.rotation.x = pitch

      // Flytende piler
      const time = Date.now() * 0.004

      if (arrow) {
        if (arrowStartY.arrow === null) {
          arrowStartY.arrow =
            arrow.position.y
        }

        arrow.position.y =
          arrowStartY.arrow +
          Math.sin(time) * 0.02
      }

      if (arrow2) {
        if (arrowStartY.arrow2 === null) {
          arrowStartY.arrow2 =
            arrow2.position.y
        }

        arrow2.position.y =
          arrowStartY.arrow2 +
          Math.sin(time) * 0.03
      }

      // Hover-størrelse
      if (arrow) {
        arrow.scale.setScalar(
          hoveredArrow === arrow ? 1.2 : 1
        )
      }

      if (arrow2) {
        arrow2.scale.setScalar(
          hoveredArrow === arrow2 ? 1.2 : 1
        )
      }

      renderer.render(scene, camera)
    }

    renderer.setAnimationLoop(animate)

    // --------------------------------------------------
    // RESIZE
    // --------------------------------------------------

    function handleResize() {
      camera.aspect =
        window.innerWidth /
        window.innerHeight

      camera.updateProjectionMatrix()

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      )
    }

    window.addEventListener(
      'resize',
      handleResize
    )

    // --------------------------------------------------
    // CLEANUP
    // --------------------------------------------------

    return function () {
      window.removeEventListener(
        'keydown',
        keyDown
      )

      window.removeEventListener(
        'keyup',
        keyUp
      )

      window.removeEventListener(
        'pointermove',
        pointerMove
      )

      window.removeEventListener(
        'pointermove',
        updateArrowHover
      )

      window.removeEventListener(
        'pointerup',
        pointerUp
      )

      window.removeEventListener(
        'resize',
        handleResize
      )

      renderer.domElement.removeEventListener(
        'pointerdown',
        pointerDown
      )

      renderer.domElement.removeEventListener(
        'click',
        arrowClick
      )

      joystick.removeEventListener(
        'touchstart',
        joystickStart
      )

      joystick.removeEventListener(
        'touchmove',
        joystickMove
      )

      joystick.removeEventListener(
        'touchend',
        joystickEnd
      )

      if (joystick.parentNode) {
        joystick.parentNode.removeChild(joystick)
      }

      renderer.setAnimationLoop(null)

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(
          renderer.domElement
        )
      }

      renderer.dispose()

      delete window.getCameraPosition
    }
  }, [])

  return <div ref={containerRef} />
}

export default Scene
