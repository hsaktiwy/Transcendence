import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { motion } from 'framer-motion';


const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();

    // Sizes
    const sizes = {
      width: window.innerWidth * 0.6,
      height: window.innerHeight * 0.6,
    };

    // Camera
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
    camera.position.z = 20; // Adjusted closer to the object for better view
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Load the GLB model
    const loader = new GLTFLoader();
    loader.load(
      '/models/planetEarth.glb', // Correct path to the GLB file
      (gltf) => {
        // gltf.scene.scale.set(0.5, 0.5, 0.5);
        scene.add(gltf.scene);

      },
      undefined,
      (error) => {
        console.error('An error occurred while loading the model:', error);
      }
    );

    // Light
    // const light = new THREE.PointLight(0xffffff, 100, 1000,1.5);  // Adjusted intensity
    // light.position.set(0, 10, 10);
    // scene.add(light);
    // Lights
    // const ambientLight = new THREE.AmbientLight(0x404040, 0.5);  // Soft ambient light
    // scene.add(ambientLight);

    const directionalLight = new THREE.PointLight(0xffffff, 1000,100);  // White directional light
    directionalLight.position.set(5, 5, 5);  // Position the light
    scene.add(directionalLight);
    

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;  // Adjusted speed

    // Animation loop
    const animate = () => {
      controls.update();
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);  // Get the camera's forward direction

      // Adjust the point light's position based on the camera's position and forward direction
      const lightDistance = 0;  // Distance the light should be from the camera
      directionalLight.position.copy(camera.position).add(direction.multiplyScalar(lightDistance));
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();


    const handleResize = () => {
      sizes.width = window.innerWidth * 0.6;
      sizes.height = window.innerHeight * 0.6;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    };
    window.addEventListener('resize', handleResize);
    console.log("aaaaa")

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <motion.div
    initial={{
        x:-600,
        opacity:0
    }}
    animate={{
        opacity: 1,
        x: 0,
        transition : {
            delay:0.3,
            ease: "easeInOut",
            type: "spring",
            stiffness: 100
        } 
    }}
    ref={mountRef} className="webgl hidden lg:block" />;
};

export default ThreeScene;