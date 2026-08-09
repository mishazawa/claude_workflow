import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const ShaderBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.Camera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const meshRef = useRef<THREE.Mesh | null>(null)
  const animationIdRef = useRef<number | null>(null)

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uResolution;
    varying vec2 vUv;

    // Simplex noise implementation
    vec3 permute(vec3 x) {
      return mod(((x * 34.0) + 1.0) * x, 289.0);
    }

    vec2 fade(vec2 t) {
      return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
    }

    float cnoise(vec2 P) {
      vec2 Pi = floor(P);
      vec2 Pf = P - Pi;
      vec2 u = fade(Pf);

      vec2 Pi0 = mod(Pi, 289.0);
      vec2 Pi1 = mod(Pi + vec2(1.0), 289.0);

      float p00 = permute(Pi0.x + permute(Pi0.y)).x;
      float p10 = permute(Pi1.x + permute(Pi0.y)).x;
      float p01 = permute(Pi0.x + permute(Pi1.y)).x;
      float p11 = permute(Pi1.x + permute(Pi1.y)).x;

      vec2 g00 = normalize(fract(sin(vec2(p00) * 0.0127821) * 43758.5453) * 2.0 - 1.0);
      vec2 g10 = normalize(fract(sin(vec2(p10) * 0.0127821) * 43758.5453) * 2.0 - 1.0);
      vec2 g01 = normalize(fract(sin(vec2(p01) * 0.0127821) * 43758.5453) * 2.0 - 1.0);
      vec2 g11 = normalize(fract(sin(vec2(p11) * 0.0127821) * 43758.5453) * 2.0 - 1.0);

      float n00 = dot(g00, Pf);
      float n10 = dot(g10, Pf - vec2(1.0, 0.0));
      float n01 = dot(g01, Pf - vec2(0.0, 1.0));
      float n11 = dot(g11, Pf - vec2(1.0, 1.0));

      float nx0 = mix(n00, n10, u.x);
      float nx1 = mix(n01, n11, u.x);
      return mix(nx0, nx1, u.y) * 0.2 + 0.5;
    }

    void main() {
      vec2 uv = vUv;

      // Create flowing noise pattern
      float noise1 = cnoise(uv * 3.0 + vec2(uTime * 0.1, 0.0));
      float noise2 = cnoise(uv * 2.0 + vec2(0.0, uTime * 0.08));
      float noise3 = cnoise(uv * 1.5 + vec2(uTime * 0.05, uTime * 0.07));

      // Combine noises with different frequencies
      float pattern = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;

      // Add some feedback loop effect with normalized coordinates
      float feedback = length(uv - 0.5) * 0.5;
      pattern = pattern * (1.0 - feedback * 0.3);

      // Create color based on pattern
      vec3 color1 = vec3(0.1, 0.05, 0.15);
      vec3 color2 = vec3(0.2, 0.1, 0.25);
      vec3 color3 = vec3(0.15, 0.08, 0.2);

      vec3 finalColor = mix(color1, color2, pattern);
      finalColor = mix(finalColor, color3, sin(pattern * 3.14159 + uTime * 0.5) * 0.5 + 0.5);

      // Add subtle radial gradient toward center
      float dist = length(uv - 0.5) * 1.4;
      finalColor += vec3(0.02) * (1.0 - dist);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      0.1,
      1000
    )
    camera.position.z = 1

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Create shader material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
    })

    // Create plane geometry
    const geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    sceneRef.current = scene
    cameraRef.current = camera
    rendererRef.current = renderer
    materialRef.current = material
    meshRef.current = mesh

    let startTime = Date.now()
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)
      const elapsed = (Date.now() - startTime) * 0.001
      material.uniforms.uTime.value = elapsed
      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      camera.left = width / -2
      camera.right = width / 2
      camera.top = height / 2
      camera.bottom = height / -2
      camera.updateProjectionMatrix()

      renderer.setSize(width, height)
      material.uniforms.uResolution.value.set(width, height)

      const oldGeometry = mesh.geometry
      const newGeometry = new THREE.PlaneGeometry(width, height)
      mesh.geometry = newGeometry
      oldGeometry.dispose()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (containerRef.current && renderer.domElement.parentElement === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [vertexShader, fragmentShader])

  return <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
}

export default ShaderBackground
