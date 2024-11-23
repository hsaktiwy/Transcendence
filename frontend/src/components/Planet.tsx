import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();

    // Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Camera
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
    camera.position.z = 10; // Adjusted closer to the object for better view
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Load the GLB model
    const loader = new GLTFLoader();
    loader.load(
      '/models/planetEarth.glb', // Correct path to the GLB file
      (gltf) => {
        scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error('An error occurred while loading the model:', error);
      }
    );

    // Light
    const light = new THREE.PointLight(0xffffff, 1, 100);  // Adjusted intensity
    light.position.set(0, 10, 10);
    scene.add(light);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;  // Adjusted speed

    // Animation loop
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="webgl" />;
};

export default ThreeScene;
