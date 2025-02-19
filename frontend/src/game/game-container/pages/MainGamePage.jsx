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
                    <div className="lktaba1">THE PLATFORM</div>
                    <div className="lktaba2">PLATFORM DESCIEPTION :</div>
                    <p className="lktaba3">
                        {/* Lorem Ipsum is simply dummy text of the printing
                        and&nbsp;&nbsp;typesetting industry. Lorem Ipsum has been the
                        industry&#39;s standard dumm y text ever since the 1500s, when
                        an unknown. Have Fun ! */}
                    {/* Experience the ultimate fusion of strategy and adrenaline in this all-in-one 3D gaming web app! Dive into lightning-fast Ping Pong matches where reflexes reign supreme, or flex your brainpower in visually stunning 3D Chess duels. Challenge friends locally, climb global leaderboards in competitive multiplayer, or dominate fierce tournaments—each victory forging your legacy. With seamless matchmaking, immersive visuals, and endless ways to play, this web app takes your gaming experience to thrilling new heights, Have Fun ! */}
                    Experience the thrill of fast-paced 3D Ping Pong and the cerebral challenge of immersive 3D Chess—all in one seamless web app. Hone your reflexes in intense table tennis battles, or devise brilliant strategies in stunning board showdowns. With sleek visuals and easy connectivity, the future of online gaming awaits at your fingertips! Have fun !
                    </p>
                </div>

                <div className={"teams-container"} >
                    <div className="team" onClick={() => {navigate('/game/Chess_Lobby')}}>
                        <center>
                            <h1>Chess Game</h1>
                        </center>
                    </div>
                    <div className="team" onClick={() => {navigate('/game/PingPong_Lobby')}}>
                        <center>
                            <h1>Ping Pong</h1>
                        </center>
                    </div>
                </div>

                <InfoLink />
            </div>
        </>
    )
};

export default MainGamePage;
