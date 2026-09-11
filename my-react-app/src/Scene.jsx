import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

function Scene() {
  const containerRef = useRef(null)

  useEffect(function () {
    const container = containerRef.current

    // --------------------------------------------------
    // SCENE
    // --------------------------------------------------

    const scene = new THREE.Scene()

    scene.background = new THREE.Color(0x080b18)


    // --------------------------------------------------
    // KAMERA
    // --------------------------------------------------

    let fov = 70

    if ('ontouchstart' in window) {
      fov = 95
    }

    const camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    )

    window.getCameraPosition = function () {
      console.log(camera.position)
    }


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
    // KAMERA-ROTASJON
    // --------------------------------------------------

    let yaw = 0
    let pitch = 0

    const mouseSensitivity = 0.0006
    const touchSensitivity = 0.0035


    // --------------------------------------------------
    // TASTER
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
    // MUS
    // --------------------------------------------------

    let isDragging = false
    let previousMouseX = 0
    let previousMouseY = 0

    function pointerDown(event) {
      // Ikke start kameradrag hvis vi trykker på joysticken
      if (event.target === joystick || joystick.contains(event.target)) {
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

      const movementX = event.clientX - previousMouseX
      const movementY = event.clientY - previousMouseY

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

    renderer.domElement.addEventListener('pointerdown', pointerDown)
    window.addEventListener('pointermove', pointerMove)
    window.addEventListener('pointerup', pointerUp)


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
    joystick.style.background = 'rgba(255, 255, 255, 0.15)'
    joystick.style.border = '2px solid rgba(255, 255, 255, 0.3)'
    joystick.style.touchAction = 'none'
    joystick.style.display = 'none'
    joystick.style.zIndex = '10'

    joystickKnob.style.position = 'absolute'
    joystickKnob.style.left = '35px'
    joystickKnob.style.top = '35px'
    joystickKnob.style.width = '50px'
    joystickKnob.style.height = '50px'
    joystickKnob.style.borderRadius = '50%'
    joystickKnob.style.background = 'rgba(255, 255, 255, 0.5)'

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

      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

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
    // LAST INN BLENDER-MODELL
    // --------------------------------------------------

    const loader = new GLTFLoader()

    loader.load(
      '/lofi_room.glb',

      function (gltf) {
        const room = gltf.scene

        scene.add(room)


        // Finn størrelsen på modellen
        const box = new THREE.Box3().setFromObject(room)

        const size = box.getSize(
          new THREE.Vector3()
        )

        const center = box.getCenter(
          new THREE.Vector3()
        )


        // Flytt modellen slik at den står
        // rundt et ryddig koordinatsystem

        room.position.x -= center.x
        room.position.y -= box.min.y
        room.position.z -= center.z


        // --------------------------------------------------
        // NORMALISER STØRRELSEN
        // --------------------------------------------------

        const maxSize = Math.max(
          size.x,
          size.y,
          size.z
        )

        const scale = 10 / maxSize

        room.scale.setScalar(scale)


        // Oppdater modellen
        room.updateMatrixWorld(true)


        // --------------------------------------------------
        // STARTPOSISJON FOR KAMERA
        // --------------------------------------------------

        camera.position.set(
          -7,
          3,
          -1.7
        )

        yaw = Math.PI / 2
        pitch = 0


        console.log(
          'LO-FI ROOM LOADED'
        )
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
    // HENT KAMERAPOSISJON FRA CONSOLE
    // --------------------------------------------------

    function getCameraPosition() {
      return {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z
      }
    }

    window.getCameraPosition = getCameraPosition


    // --------------------------------------------------
    // ANIMASJON OG BEVEGELSE
    // --------------------------------------------------

    const clock = new THREE.Clock()

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


      // Hvis spilleren beveger seg
      if (direction.length() > 0) {
        direction.normalize()

        const movement = new THREE.Vector3()


        // Bevegelse basert på kameraets yaw
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


      // Tegn scenen
      renderer.render(
        scene,
        camera
      )
    }


    renderer.setAnimationLoop(
      animate
    )


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

  }, [])


  return (
    <div ref={containerRef} />
  )
}

export default Scene