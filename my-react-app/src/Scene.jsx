import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function Scene() {
  const containerRef = useRef(null)

  useEffect(() => {
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    const renderer = new THREE.WebGLRenderer({ antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)

    camera.position.z = 5

    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({ color: 0x4f8cff })
    const cube = new THREE.Mesh(geometry, material)

    scene.add(cube)

    function animate() {
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01

      renderer.render(scene, camera)
    }

    renderer.setAnimationLoop(animate)

    return () => {
      renderer.setAnimationLoop(null)
      renderer.dispose()
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} />
}

export default Scene