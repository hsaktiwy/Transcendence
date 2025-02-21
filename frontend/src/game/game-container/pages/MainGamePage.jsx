import { useNavigate } from "react-router-dom";
import InfoLink from "../components/InfoLink";
import PingPongBack from "../components/PingPongBack";
import './MainGamePage.css'
import './style.css'


function MainGamePage(){
    const navigate = useNavigate();

    return(
        <>
            {/* <PingPongBack/> */}
            <div className="main-game-page-container">
                <div className="lktaba">
                    <div className="lktaba1 hidden sm:block">THE PLATFORM</div>
                    <div className="lktaba2 hidden sm:block">PLATFORM DESCIEPTION :</div>
                    <p className="lktaba3 hidden sm:block">
                    Experience the thrill of fast-paced 3D Ping Pong and the cerebral challenge of immersive 3D Chess—all in one seamless web app. Hone your reflexes in intense table tennis battles, or devise brilliant strategies in stunning board showdowns. With sleek visuals and easy connectivity, the future of online gaming awaits at your fingertips! Have fun !
                    </p>
                </div>

                <div className={"teams-container"} >
                    <div className="team" onClick={() => {navigate('/game/Chess_Lobby')}}>
                        {/* <center>
                            <h1>Chess Game</h1>
                        </center> */}
                    </div>
                    <div className="team" onClick={() => {navigate('/game/PingPong_Lobby')}}>
                        {/* <center>
                            <h1>Ping Pong</h1>
                        </center> */}
                    </div>
                </div>

                <InfoLink />
            </div>
        </>
    )
};

export default MainGamePage;
