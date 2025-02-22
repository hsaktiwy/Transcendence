import { Frame } from '../components/Frame';
import InfoLink from '../components/InfoLink';
import './style.css'
import { useNavigate } from "react-router-dom";


function Lobby(){
    const navigate = useNavigate();
    return(
        <>

            {/* <PingPongBack/> */}
            <div className="main-game-page-container">


            <div className="lktaba">
                <div className="lktaba1">Ping Pong Game</div>
                <div className="lktaba2">GAME DESCIEPTION :</div>
                <p className="lktaba3">
                    {/* Lorem Ipsum is simply dummy text of the printing
                    and&nbsp;&nbsp;typesetting industry. Lorem Ipsum has been the
                    industry&#39;s standard dumm y text ever since the 1500s, when
                    an unknown printer took a galley of&nbsp;&nbsp;type and
                    scrambled it to make a type specimen book. It has survived
                    not&nbsp;&nbsp;only five centuries, but also the leap into
                    electronic typesetting,&nbsp;&nbsp;remaining essentially
                    unchanged. It was popularised in the 1960s with&nbsp;&nbsp;the
                    release of Letraset sheets containing Lorem Ipsum passages, and
                    more recently with desktop publishing software like Aldus
                    PageMaker&nbsp;&nbsp;including versions of Lorem Ipsum */}
                    Experience the adrenaline rush of fast-paced 3D Ping Pong! Hone your reflexes in local matches, battle friends online, and prove your dominance in thrilling local tournaments. With multiplayer modes galore—and AI opponents coming soon—you’ll be smashing epic rallies around the table in no time!
                </p>
            </div>


            <div className="yy">
                {/* <em>Lobby</em>
                <button onClick={() => {navigate('/game/RemoteGame')}} > <em>Play Now</em></button>
            <button onClick={() => {navigate('/game/Matchmaking')}} > <em>Matchmaking</em></button> */}
                <div className="text-wrapper">SELECT MODE</div>
                <Frame
                    text="Play Locally"
                    default_icon='/GamePub/bottouns/default_offline.svg'
                    hovered_icon='/GamePub/bottouns/hovered_offline.svg'
                    onClick={() => {navigate('/game/PlayLocally_1v1')}}
                    />
                <Frame
                    text="Play Online"
                    default_icon='/GamePub/bottouns/default_online.svg'
                    hovered_icon='/GamePub/bottouns/hovered_online.svg'
                    onClick={() => {navigate('/game/PreRemote')}}
                    />
                <Frame
                    text="Multiplayer Game"
                    default_icon='/GamePub/bottouns/default_multiplayer.svg'
                    hovered_icon='/GamePub/bottouns/hovered_multiplayer.svg'
                    onClick={() => {navigate('/game/PreMultiplayer')}}
                    />
                <Frame
                    text="Start Tournament"
                    default_icon='/GamePub/bottouns/default_tournament.svg'
                    hovered_icon='/GamePub/bottouns/hovered_tournament.svg'
                    onClick={() => {navigate('/game/PreTournament')}}
                    />
            </div>

                <InfoLink />
            
            </div>
        </>
    )
}

export default Lobby;