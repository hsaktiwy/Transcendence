import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import LoadingScreen from '../components/LoadingScreen';
import gsap from 'gsap'; 
import '../game/RemoteScene.css'


const ChessGameBack = () => {
    const canvasRef = useRef(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadingManager = new THREE.LoadingManager();

        
        
        
        let canvas = null;
        if (canvasRef.current != null){
            canvas = canvasRef.current
            loadingManager.onLoad = () => {
                gsap.to('#loading-screen', {
                  opacity: 0,
                  duration: 1,
                  onComplete: () => {
                    setLoading(false);
                  }
                });
              };
        }
        
        
        const scene = new THREE.Scene()
       
        const ambientLight = new THREE.AmbientLight(0xffffff, 2.4)
        scene.add(ambientLight)
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
        directionalLight.castShadow = false
        directionalLight.shadow.mapSize.set(1024, 1024)
        directionalLight.shadow.camera.far = 15
        directionalLight.shadow.camera.left = - 7
        directionalLight.shadow.camera.top = 7
        directionalLight.shadow.camera.right = 7
        directionalLight.shadow.camera.bottom = - 7
        directionalLight.position.set(5, 5, 5)
        scene.add(directionalLight)
        
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        
        window.addEventListener('resize', handleResize)

        function handleResize(event) {
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight
        
            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix()
        
            renderer.setSize(sizes.width, sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 0.5))     
        }
        
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.set(-0.71, 1.41, 0.78)
        scene.add(camera)
        
        
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas
        })
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 0.5))
        
        const GLTFLoaderr = new GLTFLoader(loadingManager);
        
        GLTFLoaderr.load(
            '/GamePub/chess-assets/models/round_wooden_table_01_2k.gltf/round_wooden_table_01_2k.gltf',
            function ( gltf ) {
                gltf.scene.children[0].position.y = -0.5;
                scene.add( gltf.scene.children[0] ); //Jilali Table
            }
        );
        
        
        GLTFLoaderr.load(
            '/GamePub/chess-assets/models/chess_set_2k.gltf/chess_set.gltf',
            function ( gltf ) {
                let item;
        
                while (gltf.scene.children.length){
                    item = gltf.scene.children[0];
                    if (item.name === "board"){
                        item.position.y = 0.504;
                    }
                    else{
                        item.position.y = 0.5215;
                    }
                    scene.add(item)
                }
            }
        );
        
        
        let cameraAngle  = 0;
        let cameraHeight = 0.7;
        let cameraRadius = 1.8; 
        
    
        const clock = new THREE.Clock()
        let previousTime = 0
        
        const tick = () =>
        {
        
            const elapsedTime = clock.getElapsedTime()
            const deltaTime = elapsedTime - previousTime
            previousTime = elapsedTime
        
            cameraAngle += 0.005;
            cameraHeight += 0.0005;
            camera.position.x = Math.cos(cameraAngle) * (cameraRadius - cameraHeight);
            camera.position.z = Math.sin(cameraAngle) * (cameraRadius - cameraHeight);
            camera.position.y = cameraHeight;
            
            if (cameraHeight > 1.7) cameraHeight = 0.7;
    
            camera.lookAt(0, 0, 0);
        
            renderer.render(scene, camera)
        
            renderer.setAnimationLoop(tick);
        }
        
        tick()
        

        return() => {

            window.removeEventListener('resize', handleResize)

            renderer.dispose();
            scene.traverse(object => {
              if (object.geometry) object.geometry.dispose();
              if (object.material) {
                if (Array.isArray(object.material)) {
                  object.material.forEach(mat => mat.dispose());
                } else {
                  object.material.dispose();
                }
              }
            });
            while (scene.children.length > 0) {
              scene.remove(scene.children[0]);
            }
        };

    }, []);
  
    return (
        <>
            <LoadingScreen show={loading} />
            <div className="blur-wrapper">
                <canvas ref={canvasRef}></canvas>
            </div>
        </>
    )
};

export default ChessGameBack;
