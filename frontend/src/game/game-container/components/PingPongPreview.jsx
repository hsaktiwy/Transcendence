import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function PingPongPreview() {
  const canvasRef = useRef(null);


  useEffect(() => {
  
    let model = null;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.5, 3);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 0.55));


    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const Directional = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(Directional);

    // Controls
    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true;

    // Resize handling
    function onResize() {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', onResize);

    // Load model
    const loader = new GLTFLoader();
    loader.load("/GamePub/models/king_pown-20250201T201304Z-001/paddle/paddle.gltf", (gltf) => {
      model = gltf.scene;
    //   model.scale()
      model.scale.multiplyScalar(2.8)
      model.position.y -= 0.2;
      scene.add(model);
    });

    // Animate
    const clock = new THREE.Clock();
    function tick() {
      const delta = clock.getDelta();


      
      const elapsed = clock.getElapsedTime()
      if (model){
        //   model.position.x = 1 * Math.cos(elapsed);
        //   model.position.z = 1 * Math.sin(elapsed);
        // model.position.y = Math.max(Math.min(3 * Math.sin(elapsed), 1), -1)
        
        
        // model.rotation.x = Math.sin(elapsed) * 0.2;
        // model.rotation.y = Math.cos(elapsed) * 0.3;
        // model.position.y = (Math.sin(elapsed * 1) * 0.2) - 1;
        model.rotation.y += 0.015;
        // camera.lookAt(model.position)
        camera.lookAt(0, 0, 0)
      }


      // controls.update();
      renderer.render(scene, camera);
      renderer.setAnimationLoop(tick);
      // requestAnimationFrame(tick);
    }
    tick();

    // Cleanup
    return () => {
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      
      scene.traverse((object) => {
        if (object.isMesh) {
          object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((mat) => mat.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      scene.clear();
    };
  }, []);

  // Style: give the canvas a fixed size or let CSS handle it
  return (
    <div style={{ width: '350px', height: '350px', position: 'relative' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

export default PingPongPreview;
