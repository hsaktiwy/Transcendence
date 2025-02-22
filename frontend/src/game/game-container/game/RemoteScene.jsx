import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js'

import gsap from 'gsap'; 
import LoadingScreen from '../components/LoadingScreen';

import './RemoteScene.css'

import Scoreboard from '../components/Scoreboard';
import { useLocation, useNavigate} from 'react-router-dom';

import { useRemoteGameContext } from '../game/MatchContext';
import { useLocalGamesContext } from '../game/MatchContext';
import Tooltip from '../components/Tooltip';




const RemoteGame = () => {
    
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    
    const { setReomteGameData } = useRemoteGameContext();
    const { ReomteGameData } = useRemoteGameContext();
    const { setLocalGamesData } = useLocalGamesContext();
    const location = useLocation()
    const [dataReady, setDataReady] = useState(false)

    useEffect(()=>{
        if (!ReomteGameData && !location.state){
            navigate('/game/PreRemote');
        }
        else{
            if (location.state){
                if (location.state.room_name && location.state.my_user){
                    ReomteGameData.room_name = location.state.room_name
                    ReomteGameData.my_user  = location.state.my_user
                    ReomteGameData.p1_id  = location.state.p1_id
                    ReomteGameData.p2_id = location.state.p2_id
                    ReomteGameData.opponent = location.state.opponent
                    setReomteGameData(ReomteGameData)
                }
                setDataReady(true);
            }
            if (ReomteGameData && ReomteGameData.room_name && ReomteGameData.my_user && ReomteGameData.opponent){
                setDataReady(true);
            }
        }
        if (location.state && !ReomteGameData.room_name && !ReomteGameData.my_user && !ReomteGameData.opponent){
            if (location.state.room_name && location.state.my_user){
                ReomteGameData.room_name = location.state.room_name
                ReomteGameData.my_user = location.state.my_user
                ReomteGameData.p1_id = location.state.p1_id
                ReomteGameData.p2_id = location.state.p2_id
                ReomteGameData.opponent = location.state.opponent
                setReomteGameData(ReomteGameData)
            }
            setDataReady(true);
        }
        if (ReomteGameData && !ReomteGameData.room_name && !ReomteGameData.my_user && !ReomteGameData.opponent){
            navigate('/game/PreRemote');
        }
        else if (ReomteGameData && ReomteGameData.inviting && ReomteGameData.gameSocket){
            setDataReady(true);
        }
    },[])
    
    const [playerScore, setPlayerScore] = useState(0);
    const [aiScore, setAiScore] = useState(0);
    
    const [loading, setLoading] = useState(true);
    const [The_end, setThe_end] = useState(false);
    const [docket, setdocket] = useState(null);

    let Aix        = 0;
    let Aiy        = 0;
    let ball_count = 0;
    let ball_x     = 0;
    let ball_y     = 0;
    let ball_z     = 0;
    let Objects    = [];
    let my_score   = 0
    let opp_score  = 0

    let OppmouseDirection;

    let state = false;
    
    useEffect(() => {

    if (dataReady == true)
    {
        let gameSocket = null
        const scene = new THREE.Scene();

        const kgeometry = new THREE.SphereGeometry( 0.10, 32, 16 ); 
        const kmaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); 
        const sphere = new THREE.Mesh( kgeometry, kmaterial ); scene.add( sphere );

    try{
        if (!ReomteGameData.inviting && !ReomteGameData.gameSocket){
            gameSocket = new WebSocket(import.meta.env.VITE_ws_url + `/ws/ping-pong/room/${ReomteGameData.room_name}`);
            
            gameSocket.onopen = () => {
                setdocket(gameSocket);
            };
            
        }
        else if (ReomteGameData.inviting && ReomteGameData.room_name){
            gameSocket = ReomteGameData.gameSocket;
            setdocket(gameSocket);
        }
  
        gameSocket.onerror = (error) => {
            navigate('/game/PreRemote');
        };
        
        gameSocket.onclose = (event) => {
            if (!event.wasClean || event.code === 4001){
                navigate('/game/PreRemote');
            }
        };
        
        gameSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data['type'] == 'paddle_update' || data['type'] == 'Game_end'|| data['type'] == 'Forfait'){
            if(data['type'] == 'Forfait'){
                
                setReomteGameData({
                    winner  : ReomteGameData.my_user + ' FORFAIT'
                }); 
                setAiScore(0);
                setPlayerScore(0);
                setLocalGamesData({})
                navigate('/game/Winner');
            }
            else {

            state             = Boolean(data['ball']['state']);

            OppmouseDirection = Number(data['ball']['mousedirection']);

            if (state === true){
                if (OppmouseDirection === 1){
                    setReomteGameData({
                        winner  : ReomteGameData.opponent
                    });
                }
                else {
                    setReomteGameData({
                        winner  : ReomteGameData.my_user
                    });        
                }
                setAiScore(0);
                setPlayerScore(0);
                setLocalGamesData({})
                navigate('/game/Winner');
            }
            
            else if (data){
                Aix               = data['paddle']['x'];
                Aiy               = data['paddle']['y'];
    
                ball_count        = data['ball']['c'];
    
                ball_x            = data['ball']['x'];
                ball_y            = data['ball']['y'];
                ball_z            = data['ball']['z'];
    
                my_score          = data['score']['p2']
                opp_score         = data['score']['p1']
    
                if (aiScore != opp_score){
                    setAiScore(opp_score)
                }
                if (playerScore != my_score){
                    setAiScore(my_score)
                }
                if(ball_count > Objects.length){
                    createSphere(new THREE.Vector3(ball_x, ball_y, ball_y), false);
                }
                if(Objects.length && Objects[Objects.length - 1].created_by_me === false){
                    Objects[Objects.length - 1].sphere.position.x = -ball_x;
                    Objects[Objects.length - 1].sphere.position.y = ball_y;
                    Objects[Objects.length - 1].sphere.position.z = -ball_z;
                }
            }
            
        }
        };
    
    
        };
    }catch(error){
        navigate('/game/PingPong_Lobby');
    }    
     
        const gravity     = -9.8;
        const friction    = 0.25;
        const restitution = 0.89;

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
        
        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(30, 30),
            new THREE.MeshStandardMaterial({
                color: '#444444',
                metalness: 0,
                roughness: 0.5,
            })
        )
        floor.receiveShadow = true
        floor.rotation.x = - Math.PI * 0.5
        floor.material.side = THREE.DoubleSide;
        
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.14)
        scene.add(ambientLight)
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
        directionalLight.castShadow = true
        directionalLight.shadow.mapSize.set(1024, 1024)
        directionalLight.shadow.camera.far    = 300
        directionalLight.shadow.camera.left   = - 20
        directionalLight.shadow.camera.top    = 20
        directionalLight.shadow.camera.right  = 20
        directionalLight.shadow.camera.bottom = - 20
        directionalLight.position.set(5, 5, 5)
        scene.add(directionalLight)
        
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        
        const handleResize = () => {
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight
            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix()
            renderer.setSize(sizes.width, sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        };
        
        window.addEventListener('resize', handleResize)
        
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.set(-22, 6, 0)
        scene.add(camera)
        
        const topControls = new OrbitControls(camera, canvas)
        topControls.enableDamping = true
        
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas
        })
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        
        const GLTFLoaderr = new GLTFLoader(loadingManager); 
        GLTFLoaderr.load('/GamePub/models/chinese_tea_table_4k.gltf/tabla_v2.gltf', function (gltf){
            const model = gltf.scene;
            model.scale.set(1.5, 1.5, 1.5)
            model.position.y += 1.7;
            model.position.z = -1.94;
            
            model.traverse(function (node) {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                    node.material.wireframe = false;
                }
            })
            scene.add(model);
        })
        
        let paddle = null;
        let paddleAi = null;
        
        GLTFLoaderr.load('/GamePub/models/chinese_tea_table_4k.gltf/paddle_test.gltf', function (gltf){
            const model = gltf.scene;
            paddle = model;
            model.scale.set(2.1, 2.1, 2.1)
            model.position.y = 4.0387;
            model.position.z = 10; 
            
            model.traverse(function (node) {          
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            })
        
            paddleAi = paddle.clone();
            paddleAi.position.z = -10;
            paddleAi.rotation.set(0, 0, 0);
        
            scene.add(paddle);
            scene.add(paddleAi);
        })
        
        const hit_sound = new Audio("/GamePub/sounds/ping_pong.mp3");
        
        const Pong_Ball_colide = (impact) => {
            hit_sound.volume = Math.min(impact, 1);
            hit_sound.currentTime = 0;
            hit_sound.play();
        }
        
        const TextureLoader = new THREE.TextureLoader(loadingManager);
        const Texture = TextureLoader.load("/GamePub/textures/Models/ball.jpeg");
        
        
        const STDGeometry = new THREE.SphereGeometry(0.1, 32, 32);
        const STDMaterial = new THREE.MeshStandardMaterial;
        STDMaterial.metalness = 0.1;
        STDMaterial.roughness = 0.1;
        STDMaterial.map       = Texture;
        
        
        const createSphere = (position, status) => {
            const sphere = new THREE.Mesh(
                STDGeometry,
                STDMaterial)
        
                sphere.castShadow = true
                sphere.position.copy(position);
                sphere.position.x = ((Math.random() - 0.5) * 5);
                
                scene.add(sphere)
                
                Objects.push({
                    sphere: sphere,
                    velocity: new THREE.Vector3(1, 1, 1), 
                    mass: 1,
                    created_by_me: status
                });
        
                Objects[Objects.length - 1].velocity.set(BallCreator.serve_x, BallCreator.serve_y, BallCreator.serve_z); 
        
            New_ball_launched = true;
        }
        
        const BallCreator = {
            serve_x: 0,
            serve_y: -4.65,
            serve_z: 26.5,
        
            hit_x  : 0,
            hit_y  : -4.65,
            hit_z  : 26.5,
        
            cameraFixed: false 
        }
        
        
        BallCreator.serve_x = 0;
        BallCreator.serve_y = 3.4;
        BallCreator.serve_z = 22;
        
        BallCreator.hit_x   = 0;
        BallCreator.hit_y   = 3.2;
        BallCreator.hit_z   = 22;
        
        BallCreator.reset = () => {
            for (const object of Objects){
                scene.remove(object.sphere);
            }
            Objects.splice(0, Objects.length)
        }
        
        BallCreator.createBall = () => {
            let x = (Math.random() - 0.5) * 4
            let y = 4.92;
            let z = -10.1;
            
            createSphere(new THREE.Vector3(paddle.position.x, y, -paddle.position.z), true)
            
        }
        
        const geometry       = new THREE.BoxGeometry( 1, 1, 1 ); 
        const material       = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        material.transparent = true; 
        const Table          = new THREE.Mesh( geometry, material ); 
        
        Table.position.x = -0.01;
        Table.position.y = 4.15;
        Table.position.z = -0.06;
        
        Table.scale.set(8.28, 0.3, 18.51)
        
        const Net = new THREE.Mesh( geometry, material ); 
        Net.position.x = 0;
        Net.position.y = 4.66;
        Net.position.z = -0.02;
        Net.scale.set(10.29, 1, 0.05)
        
        let mouseDirection = 0;
        let prevMouseX = 0;
        
        const handleMouseMove = (info) => {
            mouse.x = (info.clientX/window.innerWidth)*2-1;
            mouse.y = -((info.clientY/window.innerHeight)*2-1);
            
            mouseDirection = mouse.x > prevMouseX ? 1 : -1;
            prevMouseX = mouse.x;
        };
        
        const mouse = new THREE.Vector2();
        window.addEventListener('mousemove', handleMouseMove)

        let Chained_Keys = [
            {ArrowUp   :0},
            {ArrowRight:0},
            {ArrowDown :0},
            {ArrowLeft :0},
        ]
        

        const handleKeyDown = (event) => {
            const keyName = event.key;
          
            if (keyName === " " && !New_ball_launched && BallCreator.cameraFixed){
                BallCreator.createBall()
            }
            if ( keyName === "ArrowUp") {
                Chained_Keys.ArrowUp = 1;
            }
            if (keyName === "ArrowRight"){
                Chained_Keys.ArrowRight = 1;
            }
            if (keyName === "ArrowDown"){
                Chained_Keys.ArrowDown = 1;
            }
            if (keyName === "ArrowLeft"){
                Chained_Keys.ArrowLeft = 1;
            }
        }
        ;
        
        
        const handleKeyUp = (event) => {
            const keyName = event.key;
            
            if ( keyName === "ArrowUp") {
                Chained_Keys.ArrowUp = 0;
            }
            if (keyName === "ArrowRight"){
                Chained_Keys.ArrowRight = 0;
            }
            if (keyName === "ArrowDown"){
                Chained_Keys.ArrowDown = 0;
            }
            if (keyName === "ArrowLeft"){
                Chained_Keys.ArrowLeft = 0;
            }
        };
        
        document.addEventListener("keydown", handleKeyDown)
        document.addEventListener("keyup", handleKeyUp)
        
        const rgbeLoader = new RGBELoader(loadingManager);
        rgbeLoader.load('/GamePub/models/metro_noord_1k.hdr', (enviroment_map) => {
            enviroment_map.mapping = THREE.EquirectangularReflectionMapping
            scene.background  = enviroment_map;
            scene.environment = enviroment_map;
            
            scene.backgroundBlurriness = 0.5; 
            scene.environmentIntensity = 0.02; 
            scene.backgroundIntensity  = 0.008;
        })
        
        const BallBoundingBox     = new THREE.Box3();
        const PaddleBoundingBox   = new THREE.Box3();
        const PaddleBoundingAiBox = new THREE.Box3();
        const TableBoundingBox    = new THREE.Box3();
        const NetBoundingBox      = new THREE.Box3();
                
        function checkCollision() {
            if (Objects.length){
                PaddleBoundingBox.setFromObject(paddle);
                PaddleBoundingAiBox.setFromObject(paddleAi);
                BallBoundingBox.setFromObject(Objects[Objects.length - 1].sphere);
                NetBoundingBox.setFromObject(Net)
                TableBoundingBox.setFromObject(Table)
                
                if (PaddleBoundingBox.intersectsBox(BallBoundingBox) && Objects[Objects.length - 1].velocity.z > 0) {
                    
                    let intensity = Math.max((3 - (Math.abs(paddle.position.x))), 0);
                    if ((paddle.position.x > 2) && (mouseDirection < 0)){
                        intensity = (Math.abs(paddle.position.x) * 0.5) ;
                    }
                    if ((paddle.position.x < -2) && (mouseDirection > 0)){
                        intensity = (Math.abs(paddle.position.x) * 0.5);
                    }    
                    let forceX = (intensity * mouseDirection)
        
                    gsap.to(paddle.rotation, {
                        x: paddle.rotation.x - 0.5,
                        duration: 0.1,
                        ease: "power3.out"
                    })
                    Pong_Ball_colide(0.54);
                    
                    Objects[Objects.length - 1].velocity.set( forceX,       
                                                              BallCreator.hit_y,        
                                                              -BallCreator.hit_z
                    )
                }
                else if (PaddleBoundingAiBox.intersectsBox(BallBoundingBox) && Objects[Objects.length - 1].velocity.z < 0){
                    
                    let intensity = Math.max((3 - (Math.abs(paddleAi.position.x))), 0);
                    if ((paddleAi.position.x > 2) && (OppmouseDirection > 0)){
                        intensity = (Math.abs(paddleAi.position.x) * 0.5) ;
                    }
                    if ((paddleAi.position.x < -2) && (OppmouseDirection < 0)){
                        intensity = (Math.abs(paddleAi.position.x) * 0.5);
                    }    
                    let forceX = -(intensity * OppmouseDirection)
                    
                    gsap.to(paddleAi.rotation, {
                        x: paddleAi.rotation.x + 0.5,
                        duration: 0.1,
                        ease: "power3.out"
                    })
                    Pong_Ball_colide(0.54);
                    
                    Objects[Objects.length - 1].velocity.set( forceX,       
                                                              BallCreator.hit_y,        
                                                              BallCreator.hit_z
                    )
                }
                
                // else if (NetBoundingBox.intersectsBox(BallBoundingBox)) {
                // }
                else if (TableBoundingBox.intersectsBox(BallBoundingBox)) {
                    Pong_Ball_colide(0.85);
                    
                    Objects[Objects.length - 1].velocity.x *= friction;
                    Objects[Objects.length - 1].velocity.z *= friction;
        
                    Objects[Objects.length - 1].velocity.y *= -restitution;
        
                    const ballHeight = BallBoundingBox.max.y - BallBoundingBox.min.y;
                    Objects[Objects.length - 1].sphere.position.y = TableBoundingBox.max.y + ballHeight / 2;
                }
            }
        }
        
        let New_ball_launched = false;
        
        const clock = new THREE.Clock()
        let   deltaTime    = 0;
        
        let   angle = 0;
        const radius = 20;
        const target = new THREE.Vector3(0, 0, 0);

        const sendPaddleUpdate = (end_state) => {
            const message = {
                type: 'paddle_update',
                my_id: ReomteGameData.p1_id,
                paddle: {
                    x: mouse.x,
                    y: mouse.y,      
                },
                ball: {
                    c:  Objects.length,
                    
                    x:  Objects[Objects.length - 1]?.sphere?.position?.x,
                    y:  Objects[Objects.length - 1]?.sphere?.position?.y,
                    z:  Objects[Objects.length - 1]?.sphere?.position?.z,
                    
                    mousedirection: mouseDirection,
                    
                    status: Objects[Objects.length - 1]?.created_by_me ?? false,
                    state : end_state
                },
                score:{
                    p1: playerScore,
                    p2: aiScore,
                }
            };
            if (gameSocket.readyState === 1)
                gameSocket.send(JSON.stringify(message));
        };

        let   accumulator = 0;
        const targetInterval = 1/60;
        
        let p =false;

        const tick = () =>
        {
            if (p === false && paddleAi && paddle){
                setTimeout(() => {BallCreator.cameraFixed = true} , 3800)
                p = true;
            }
            
            deltaTime = clock.getDelta();
            
            accumulator += deltaTime;
            
            angle += 0.005;
            
            camera.position.x += deltaTime/10 * (target.x + radius * Math.cos(angle));
            camera.position.z += deltaTime/10 * (target.z + radius * Math.sin(angle));
            camera.position.y = 9;
            
            
        if (BallCreator.cameraFixed){
            if (accumulator >= targetInterval) {
                sendPaddleUpdate(false);
                accumulator -= targetInterval;
            }
            for (const obj of Objects) {
                    obj.velocity.y += gravity * deltaTime;
                    
                    obj.sphere.position.x += obj.velocity.x * deltaTime;
                    obj.sphere.position.y += obj.velocity.y * deltaTime;
                    obj.sphere.position.z += obj.velocity.z * deltaTime;       
            }
            
            if (Objects.length && paddleAi){
                
                if (New_ball_launched){
                    if (Objects[Objects.length - 1].sphere.position.z > (paddle.position.z + 1)) {
                        New_ball_launched = false;
                        setAiScore((aiScore) => aiScore + 1)
                    } else if (Objects[Objects.length - 1].sphere.position.z < (paddleAi.position.z - 1)) {
                        New_ball_launched = false;
                        setPlayerScore((playerScore) => playerScore + 1)
                    }
                }
                
                }
                
                if ( Chained_Keys.ArrowUp === 1) {
                    mouse.y += 0.04;
                }
                if (Chained_Keys.ArrowDown === 1){
                    mouse.y -= 0.04;
                }
                if (Chained_Keys.ArrowRight === 1){
                    mouse.x += 0.04;
                }
                if (Chained_Keys.ArrowLeft === 1){
                    mouse.x -= 0.04; 
                }
        
                if (mouse.x > 0){
                    mouse.x = Math.min(mouse.x, 1);
                }
                if (mouse.x < 0){
                    mouse.x = Math.max(mouse.x, -1);
                }
                if (mouse.y > 0){
                    mouse.y = Math.min(mouse.y, 1);
                }
                if (mouse.y < 0){
                    mouse.y = Math.max(mouse.y, -1);
                }
                

                camera.position.x = 0;
                camera.position.y = 7.8;
                camera.position.z = 12.8;
                camera.position.x = (4 * mouse.x);
                camera.position.y = (6.8 + ( 1 * mouse.y));
                
                paddle.position.x = (5.5 * mouse.x);
                paddle.position.y = (5.03 + (2 * mouse.y));

                paddleAi.position.x = (5.5 * (-Aix));
                paddleAi.position.y = (5.03 + (2 * Aiy));
                
                if (paddle.position.x >0){
                    gsap.to(paddle.rotation, {
                        x: 2.81,
                        y: 2.96,
                        z: 2.81,
                        duration: 0.095,
                        ease: "power2.inOut",
                    });
                }
                else{
                    gsap.to(paddle.rotation, {
                        x: 2.81,
                        y: 6.28,
                        z: 2.81,
                        duration: 0.095,
                        ease: "power2.inOut",
                    });
                }
        
                if (paddleAi.position.x > 0){
                    gsap.to(paddleAi.rotation, {
                        x: 2.81,
                        y: 2.96,
                        z: 2.81,
                        duration: 0.095,
                        ease: "power2.inOut",
                    });
                }
                else{
                    gsap.to(paddleAi.rotation, {
                        x: 2.81,
                        y: 6.28,
                        z: 2.81,
                        duration: 0.095,
                        ease: "power2.inOut",
                    });
                }
                
            }
            checkCollision();
        
            topControls.update()
            
            renderer.render(scene, camera)
        
            renderer.setAnimationLoop(tick);
        }
        
        tick()

        return() => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('keydown', handleKeyDown);

            while (scene.children.length > 0) {
                const child = scene.children[0];
                scene.remove(child);
            }

            renderer.dispose();
            topControls.dispose();

            hit_sound.pause();
            hit_sound.src = "";
            if (gameSocket && gameSocket.readyState === 1){
                gameSocket.close();
            }
        };

    }
        }, [ReomteGameData.room_name, ReomteGameData.p1_id, ReomteGameData.p2_id, dataReady ]);
  
    useEffect(() => {
    if (playerScore === 7 || aiScore === 7 || The_end === true ) {

        const message = {
            type: 'Game_end',
            role:  ReomteGameData.role,
            room_name: ReomteGameData.room_name,
            my_id: ReomteGameData.p1_id,
            paddle: {
                x: ReomteGameData.p1_id,
                y: ReomteGameData.p2_id,      
            },
            ball: {
                c: 1,
                
                x:  playerScore,
                y:  aiScore,
                z:  1,

                mousedirection: 1,

                status: Objects[Objects.length - 1]?.created_by_me ?? false,
                state : true
            }
        };
        if (playerScore === 7){
            setReomteGameData({
                winner  : ReomteGameData.my_user
            });    
            message.ball.mousedirection = 1;
        }
        else {
            setReomteGameData({
                winner  : ReomteGameData.opponent
            });     
            message.ball.mousedirection = 2;
        }
            if (docket && docket.readyState === 1)
                docket.send(JSON.stringify(message));
        
        setPlayerScore(0);
        setAiScore(0);
        setLocalGamesData({})
        navigate('/game/Winner');

        return(docket.close());
    }
      }, [playerScore, aiScore, The_end]);

    return (
        <>
            <LoadingScreen show={loading} />
            <canvas style={{zIndex:97, position: 'absolute',top: 0,
                left: 0,
                width: '100%',
                height: '100%'}} ref={canvasRef}></canvas>
            <div className='downleft'>
                <Tooltip Tip={'Hint'} Paragraph={'Use the Arrow keys on your Keyboard (Up, Right, Left, Down) or your Mouse to move, aim, and interact with the game.'}/>
            </div>
            {/* <Scoreboard player1={ReomteGameData.my_user} player2={ReomteGameData.opponent} playerScore={playerScore} aiScore={aiScore}/> */}
        </>
    )
};

export default RemoteGame;
