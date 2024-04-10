import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Session.scss'; // Import the SCSS file
import playerImg from '../../assets/player1.png';

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

    return (
        <div className="session-container">
            <h3 className='session-title'>{props.session.description}</h3>
            <div className="session-info">
                <p className="label">Court Name: </p>
                <p className="value">{props.session.courtName}</p>
            </div>

            <div className="session-info">
                <p className="label">Date: </p>
                <p className="value">{formatDate(props.session.dateTime)}</p>
            </div>

            <div className="session-info">
                <p className="label">Time: </p>
                <p className="value">{formatTime(props.session.dateTime)}</p>
            </div>

            <div className="session-info">
                <p className="label">Organizer Name: </p>
                <p className="value">{props.session.orgName}</p>
            </div>

            {/* Display the document ID */}
            <div className="session-info">
                <p className="label">Document ID: </p>
                <div className="value">{props.session.id}</div>
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


            {/* Link to add player */}
            <div className="session-info">
                <p className="label">Add Player: </p>
                {/* Pass session id as a prop to AddPlayer component */}
                <Link to={`/addplayer/${props.session.id}`}>Add Player</Link>
            </div>
        </div>
    );
}
