import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Session.scss'; // Import the SCSS file
import playerImg from '../../assets/player1.png';
import { RiDeleteBinLine } from "react-icons/ri";

export default function Session(props) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Format date as a string
    };

    const formatTime = (timeString) => {
        const time = new Date(timeString);
        let hour = time.getHours();

        // If hour is before 5am or after 10pm, adjust it to the nearest valid hour
        if (hour < 5) {
            hour = 5;
        } else if (hour > 22) {
            hour = 22;
        }

        // Ensure minute is either 00 or 30
        const minute = Math.round(time.getMinutes() / 30) * 30;

        // Format time as a string
        return `${hour < 10 ? '0' : ''}${hour}:${minute === 0 ? '00' : '30'}`;
    };

    const handleRemoveClick = () => {
        const id = props.session.id;
        props.onSessionRemove(id);
    }

    return (
        <div className="session-container">

            <div className="session-info">
                <span className="label">Session Name: </span>{props.session.description}
            </div>

            <div className="session-info">
                <span className="label">Court Name: </span> {props.session.courtName}
            </div>

            <div className="session-info">
                <span className="label">Date: </span>{formatDate(props.session.dateTime)}
            </div>

            <div className="session-info">
                <span className="label">Time: </span>{formatTime(props.session.dateTime)}
            </div>

            <div className="session-info">
                <span className="label">Organizer Name: </span>{props.session.orgName}
            </div>

            {console.log(props.session.players)}

            <div className="session-info">
                <p className="label">Players: </p>
                <div className="value">
                    <ul className="player-list">
                        {props.session.players ? props.session.players.map((player, index) => (
                            <li key={index} className="player-item">
                                <div className="player-info">
                                    {player}
                                </div>
                                <img src={playerImg} alt={`${player} Avatar`} className="player-avatar" />
                            </li>
                        )) : null}
                    </ul>
                </div>
            </div>



            <div className="session-info">
                <div className='buttonArea'></div>
                <Link to={`/addplayer/${props.session.id}`} className="session-button">Add / Remove Player</Link>
                <button className="session-button" onClick={handleRemoveClick}><RiDeleteBinLine /></button>
            </div>
        </div>
    );
}
