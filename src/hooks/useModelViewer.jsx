// hooks/useModelViewer.js
import React, { Suspense, useEffect, useRef } from 'react'
import { Canvas, useThree} from '@react-three/fiber'
import { OrbitControls, useGLTF, useAnimations, Bounds, useBounds } from '@react-three/drei'

// GLB Model Component
function Model({ url }) {
  const group = useRef()
  const { scene, animations } = useGLTF(url)
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAnim = actions[Object.keys(actions)[0]]
      firstAnim.play()
    }
  }, [actions])

  return( 
      <group
      ref={group}
      // scale={[1, 1, 1]}
      rotation={[0, Math.PI+0.8, 0]} // this stays consistent
      position={[0, 0, 0]}
    >
      <primitive object={scene} />
    </group>)
  }



// Hook returns a fixed-size 3D viewer
function useModelViewer(url) {
  const ModelViewer = () => (
   
      <Canvas className='h-full w-full' camera={{ position: [0, 0, 0], fov: 50 }} >
        <ambientLight intensity={0.9} />
        <directionalLight position={[0, 2, 0]} intensity={1} />
        <Suspense fallback={null}>
          <Bounds fit clip >
            <Model url={url} />
         
          </Bounds>
        </Suspense>
        <OrbitControls enableZoom={false} enableRotate={false} enablePan={false}  /> {/* Disable zoom */}
      </Canvas>
   
  ) 

  return ModelViewer
}

export default useModelViewer
