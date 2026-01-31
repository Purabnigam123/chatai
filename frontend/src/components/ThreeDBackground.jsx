import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeDBackground() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    sceneRef.current = scene;

    camera.position.z = 30;

    // Create abstract particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 100;
      posArray[i + 1] = (Math.random() - 0.5) * 100;
      posArray[i + 2] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.3,
      color: 0x3b82f6,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create floating cubes
    const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
    const boxMaterial = new THREE.MeshPhongMaterial({
      color: 0xa855f7,
      emissive: 0x6d28d9,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });

    const boxes = [];
    for (let i = 0; i < 5; i++) {
      const box = new THREE.Mesh(boxGeometry, boxMaterial);
      box.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
      );
      box.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      );
      box.velocity = {
        x: (Math.random() - 0.5) * 0.1,
        y: (Math.random() - 0.5) * 0.1,
        z: (Math.random() - 0.5) * 0.1,
      };
      scene.add(box);
      boxes.push(box);
    }

    // Lighting
    const light = new THREE.PointLight(0x3b82f6, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    const light2 = new THREE.PointLight(0xa855f7, 0.8, 80);
    light2.position.set(-10, -10, 10);
    scene.add(light2);

    // Animation loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate particles
      particles.rotation.x += 0.0001;
      particles.rotation.y += 0.0002;

      // Animate boxes
      boxes.forEach((box) => {
        box.rotation.x += box.velocity.x;
        box.rotation.y += box.velocity.y;
        box.rotation.z += box.velocity.z;

        box.position.x += box.velocity.x * 10;
        box.position.y += box.velocity.y * 10;
        box.position.z += box.velocity.z * 10;

        // Bounce back if out of bounds
        if (Math.abs(box.position.x) > 50) box.velocity.x *= -1;
        if (Math.abs(box.position.y) > 50) box.velocity.y *= -1;
        if (Math.abs(box.position.z) > 50) box.velocity.z *= -1;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (
        containerRef.current &&
        renderer.domElement.parentNode === containerRef.current
      ) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
}
