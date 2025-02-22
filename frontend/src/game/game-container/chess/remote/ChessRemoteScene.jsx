import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import { DragControls } from 'three/examples/jsm/controls/DragControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js'
import gsap from 'gsap'; 
import LoadingScreen from '../../components/LoadingScreen';
import './../style.css'
import '../../game/RemoteScene.css'
import { useNavigate } from 'react-router-dom';
import { Chess } from 'chess.js'
import { useRemoteGameContext } from '../../game/MatchContext';


const ChessRemoteGame = () => {
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    
    const [loading, setLoading] = useState(true);
    
    
    
    const { setReomteGameData } = useRemoteGameContext(); 
    const { ReomteGameData } = useRemoteGameContext();
        
    
    
    if (!ReomteGameData.room_name || !ReomteGameData.my_user || !ReomteGameData.color){
        navigate('/game/ChessPreRemote');
    };
    
    let cinm = true;
    

    let z;
    if (ReomteGameData.color === 'white'){
        z = -0.4220
    }
    else{
        z = 0.4220
    }

    useEffect(() => {

        
        const gameSocket = new WebSocket(import.meta.env.VITE_ws_url + `/ws/chess/room/${ReomteGameData.room_name}`);
        
        
        gameSocket.onopen = () => {
            
            setPlayerPov();
        };
        gameSocket.onerror = (error) => {
            
            navigate('/game/ChessPreRemote');
        };

        gameSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            
            
            
            
            
            
            
            let winnner = ''
             if (data['type'] === 'Game_end'){
                
                if (data['winner'] === ReomteGameData.color){
                    winnner = 'You Won'   
                }
                else if (data['winner'] === 'Draw'){
                    winnner = 'Draw'
                }
                else {
                    winnner = 'You Lost'
                }
                setReomteGameData({
                    
                    
                    
                    
                    
                    
                    
                    winner      : winnner 
                });    
                navigate('/game/ChessWinner')
            }
            
            
            if (data['type'] === 'Forfait'){
                setReomteGameData({
                    winner  : 'YOU WON Forfait'
                });    
                navigate('/game/ChessWinner')
            }
            
            if (data['type'] === 'game_update'){
                
                
                
                
                Executor(data['name'], data['from'], data['to']);
                
                
            };


        };        


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
       
        const hit_sound     = new Audio('/GamePub/chess-assets/sounds/passion.mp3');
        const move_sound    = new Audio('/GamePub/chess-assets/sounds/move.mp3');
        const illegal_sound = new Audio('/GamePub/chess-assets/sounds/illegal.mp3');
        const capture_sound = new Audio('/GamePub/chess-assets/sounds/capture.mp3');

        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10),
            new THREE.MeshStandardMaterial({
                color: '#444444',
                metalness: 0,
                roughness: 0.5,
            })
        )
        floor.receiveShadow = true
        floor.rotation.x = - Math.PI * 0.5
        floor.material.side = THREE.DoubleSide;
        
        
        
        const ambientLight = new THREE.AmbientLight(0xffffff, 2.4)
        scene.add(ambientLight)
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
        directionalLight.castShadow = true
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
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))     
        }
        
        
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.set(-0.71, 1.41, 0.78)
        scene.add(camera)
        
        
        const controls = new OrbitControls(camera, canvas)
        controls.target.set(0, 0.75, 0)
        controls.enableDamping = true
        
        let objects = []
        
        
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas
        })
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        
        
        
        
        const GLTFLoaderr = new GLTFLoader(loadingManager);
        
        
        
        
        
        
        
        
        
        
        
        
        GLTFLoaderr.load(
            '/GamePub/chess-assets/models/chess_set_2k.gltf/chess_set.gltf',
            function ( gltf ) {
                let item;
        
                while (gltf.scene.children.length){
                    item = gltf.scene.children[0];
                    
                    if (item.name === "board"){
                        item.position.y = 1.004;
                    }
                    else{
                        objects.push(item)
                        item.position.y = 1.0215;
                    }
                    scene.add(item)
                }
            }
        );
        
        let controls2; 
        
        
        
        
        
        
        
        
        
        
        
        
        
        const rgbeLoader = new RGBELoader(loadingManager);
        rgbeLoader.load('/GamePub/chess-assets/models/neon_photostudio_2k.hdr', (enviroment_map) => {
            enviroment_map.mapping = THREE.EquirectangularReflectionMapping
            scene.background  = enviroment_map;
            scene.environment = enviroment_map;
            
            scene.backgroundBlurriness = 0.5; 
            scene.environmentIntensity = 0.01; 
            scene.backgroundIntensity  = 0.007;
        })
        
        let cinm = true;
        
        function setPlayerPov(){
            
            camera.position.set(0.011, 1.3785, z)
            controls.enabled = false
            cinm = false;
        }
        

        
        controls2 = new DragControls( objects, camera, canvas );
            
        
        
        const MAX_HEIGHT = 1.03; 
        let init_pos_x, init_pos_y;
        
        controls2.addEventListener('drag', handleDrag);

        function handleDrag(event) {
            
            
            if (event.object.position.y > MAX_HEIGHT) {
                event.object.position.y = MAX_HEIGHT;
            }
            if (event.object.position.y <= 1.021) {
                event.object.position.y = 1.021;
            }
        }
        
        
        controls2.addEventListener( 'dragstart', handleDragStart);

        function handleDragStart(event) {
            
            event.object.material.emissive.set( 0xaaaaaa );
            init_pos_x = event.object.position.x;
            init_pos_y = event.object.position.z;
        }
        
        
        function isNegativeZero(value) {
            return value === 0 && (1 / value) === -Infinity;
        }
        
        
        controls2.addEventListener( 'dragend', handleDragEnd);

        function handleDragEnd(event) {
            
            event.object.material.emissive.set( 0x000000 );
            event.object.position.y = 1.0215;
        
            Validator(event.object.name, event.object.position);
        }
        

        
        const RATIO_FACTOR    = 19.74;
        const SQUARE_DIAMETER = 0.058;
        const SQUARE_RADIUS   = 0.029;
        
        
        
        
        
        const engine_validator = new Chess();
        
        
        
        function convertCoordinatesToNotation(x, y) {
            const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            const columnIndex = x < 0 ? x + 4 : x > 0 ? x + 3 : null;
            const rowNumber = y > 0 ? y + 4 : y + 5;
            
            if (columnIndex === null || columnIndex < 0 || columnIndex > 7 || rowNumber < 1 || rowNumber > 8) {
                return null;
            }
            
            return columns[columnIndex] + rowNumber;
        }
        
        function convertNotationToCoordinates(notation) {
            
            if (!notation || notation.length < 2 || notation.length > 3) {
                return null;
            }
            
            
            const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
            const column = notation[0].toLowerCase();
            const row = parseInt(notation.slice(1));
            
            
            const columnIndex = columns.indexOf(column) + 1; 
            if (columnIndex === -1 || row < 1 || row > 8) {
                return null;
            }
            
            
            const x = columnIndex <= 4 ? columnIndex - 5: columnIndex - 4;
            const y = row <= 4 ? row - 5: row - 4;
            
            return [x, y];
        }
        
        
        
        function findCapturedPiece(name, squareNotation) {
            for (const piece of objects) {
                const [x, y] = WorldToMatrix(piece.position.x, piece.position.z);
                if (convertCoordinatesToNotation(x, y) === squareNotation && name !== piece.name){
                    
                    return piece;
                }
            }
            return null;
        }
        
        
        
        const sendGameUpdate = (name, t_from, t_to) => {
            
            
            
            
            
            
            
            
            
            const message = {
                type      : 'game_update',
                my_id     : ReomteGameData.p1_id,
                from      : t_from,
                to        : t_to,      
                name      : name,
            };
            if (gameSocket.readyState === 1)
                gameSocket.send(JSON.stringify(message));
        };

        
        function Validator(name, pos) {
            let words = WorldToMatrix(init_pos_x, init_pos_y);
            let cords = WorldToMatrix(pos.x, pos.z);
        
        
            let fromNotation = convertCoordinatesToNotation(words[0], words[1]);
            let toNotation   = convertCoordinatesToNotation(cords[0], cords[1]);
        
            
            
            
            
            
        
            if ((cords[0] > 4 || cords[0] < -4) || (cords[1] > 4 || cords[1] < -4) || !fromNotation || !toNotation){
                
                pos.x = init_pos_x;
                pos.z = init_pos_y;
                return ;
            }
        
            try {
                let result = engine_validator.move({from : fromNotation, to: toNotation});
                
                
                if (result){
                    
                    
                    

                    
                    if (engine_validator.isGameOver()) {
                        let score_1 = 0
                        const message = {
                            type      : 'Game_end',
                            my_id     : ReomteGameData.p1_id,
                            p1_id     : ReomteGameData.p1_id,
                            p2_id     : ReomteGameData.p2_id,
                            room_name : ReomteGameData.room_name,
                            p1_score  :score_1,
                            p2_score  :score_1
                            
                        };
                        let winning_color = ''
                        if (engine_validator.isCheckmate()) {
                            winning_color = engine_validator.turn() === 'w' ? 'black' : 'white';
                            
                            setReomteGameData({
                                winner  : winning_color + ' WON !'
                            });  
                            
                            
                            if (ReomteGameData.winner === winning_color){
                                message.p1_score = 1
                            }
                            else{
                                message.p2_score = 1
                            }
                            setReomteGameData({
                                winner  : winning_color + ' WON !'
                            });                             
                            
                        } else if (engine_validator.isDraw()) {
                            
                            
                            message.winner = 'Draw'
                            
                            setReomteGameData({
                                winner  : 'Draw'
                            });    
                            
                        }
                        if (gameSocket.readyState === 1)
                            gameSocket.send(JSON.stringify(message));
                        
                        navigate('/game/ChessWinner')
                    }
                    
                    sendGameUpdate(name, fromNotation, toNotation);

                    
                    if (result.captured){
                        const capturedPiece = findCapturedPiece(name, toNotation);
                        if (capturedPiece) {
                            
                            scene.remove(capturedPiece);
                            objects = objects.filter(obj => obj !== capturedPiece); 
                            
                        }
                    }
                    
                    pos.x =  -((cords[0] > 0 ? cords[0] - 1: cords[0]) * SQUARE_DIAMETER) - SQUARE_RADIUS;
                    pos.z =   ((cords[1] > 0 ? cords[1] - 1: cords[1]) * SQUARE_DIAMETER) + SQUARE_RADIUS;
                }
                else {
                    
                    
                    pos.x = init_pos_x;
                    pos.z = init_pos_y;
                    return ;
                }   
            } catch (error) {
                
                
                pos.x = init_pos_x;
                pos.z = init_pos_y;
                return ;
            }
        }

        

        
        function findaffectedPiece(name) {
            for (const piece of objects) {
                if (name === piece.name){
                    
                    return piece;
                }
            }
            return null;
        }

        function Executor(name, from, to){
            let result = engine_validator.move({from : from, to: to}); 
            if (result.captured){
                const capturedPiece = findCapturedPiece(name, to);
                if (capturedPiece) {
                    
                    scene.remove(capturedPiece);
                    objects = objects.filter(obj => obj !== capturedPiece); 
                    
                }
            }
            const affectedPiece = findaffectedPiece(name)
            let cords = convertNotationToCoordinates(to)
            
            
            affectedPiece.position.x =  -((cords[0] > 0 ? cords[0] - 1: cords[0]) * SQUARE_DIAMETER) - SQUARE_RADIUS;
            affectedPiece.position.z =   ((cords[1] > 0 ? cords[1] - 1: cords[1]) * SQUARE_DIAMETER) + SQUARE_RADIUS;
            
        }
        
        
        
        
        
        
        
        
        
        function WorldToMatrix(world_x, world_y){
            let x = -Math.round(world_x * RATIO_FACTOR);
            let y =  Math.round(world_y * RATIO_FACTOR);
            
            if (x === 0 && isNegativeZero(x)){
                x = -1
            }
            else if (x === 0 ){
                x = 1
            }
            if (y === 0 && isNegativeZero(y)){
                y = -1
            }
            else if (y === 0){
                y = 1
            }
            
            return [x, y];
        }
        

        let ah = new THREE.AxesHelper(15);
        const clock = new THREE.Clock()
        let previousTime = 0
        
        const tick = () =>
        {
            const elapsedTime = clock.getElapsedTime()
            const deltaTime = elapsedTime - previousTime
            previousTime = elapsedTime
        
            
            controls.update()
        
            
        
            
            renderer.render(scene, camera)
        
            
            renderer.setAnimationLoop(tick);
            
        }
        
        tick()
        


        return() => {

            window.removeEventListener('resize', handleResize)
            controls.dispose();
            if (controls2){
                controls2.removeEventListener('drag', handleDrag);
                controls2.removeEventListener( 'dragstart', handleDragStart);
                controls2.removeEventListener( 'dragend', handleDragEnd);
                controls2.dispose();
            }

            renderer.dispose();

            while (scene.children.length > 0) {
                const child = scene.children[0];
                scene.remove(child);
            }

            hit_sound.pause();
            hit_sound.src = "";
            gameSocket.close()
        };

    }, []);
  
    return (
        <>
            <LoadingScreen show={loading} />
            <canvas style={{zIndex:97, position: 'absolute',top: 0,
                left: 0,
                width: '100%',
                height: '100%'}} ref={canvasRef}></canvas>
        </>
    )
};

export default ChessRemoteGame;
