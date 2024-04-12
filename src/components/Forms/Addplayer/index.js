import React, { useState, useEffect } from "react";
import * as database from '../../../database';
import "./addplayer.scss";
import InvitePlayer from '../../InvitePlayer'
import playerImg from '../../assets/player1.png';

export default function AddPlayer() {
  // Extract sessionId from the URL
  const sessionId = window.location.pathname.split("/").pop();

  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const maxPlayers = 4;
  const minPlayers = 2;

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        // Load session data based on sessionId
        const session = await database.load2(sessionId); // Update to use load2 function with sessionId
        // If session is found, set the players
        if (session) {
          setPlayers(session.players || []);
        } else {
          // Handle case where session is not found
          console.error('Session not found for sessionId:', sessionId);
        }
      } catch (error) {
        console.error('Error loading players:', error);
      }
    };

    fetchPlayers();
  }, [sessionId]);

  const handleAddPlayer = async () => {
    if (playerName.trim() !== "" && players.length < maxPlayers) {
      const updatedPlayers = [...players, playerName.trim()];
      setPlayers(updatedPlayers);
      // Call the save function to update the session with the new players
      const isUpdated = await database.save2(playerName.trim(), sessionId);
      if (!isUpdated) {
        console.error('Failed to update session with players');
      }
      setPlayerName("");
    }
  };

  const handleRemovePlayer = async (index) => {
    try {
      const updatedPlayers = [...players];
      updatedPlayers.splice(index, 1);
      const isUpdated = await database.save(updatedPlayers, sessionId);
      if (!isUpdated) {
        console.error('Failed to update session with players');
      }
      setPlayers(updatedPlayers);
    } catch (error) {
      console.error('Error removing player:', error);
    }
  };

  return (
    <div className="addplayer-container" >
      <div>
      <h2 className="heading">Maximum of 4 Players</h2>
        {players.length < minPlayers && (
          <p>Please add at least {minPlayers - players.length} more player(s).</p>
        )}
        <ul className="add-player-list">
          {players.map((player, index) => (
            <li key={index} className="add-player-item">
              <div className="add-player-info">
                <img src={playerImg} alt="Player" className="player-img" /> {/* Image */}
                <span className="add-player-name">{player}</span>
              </div>
              <button onClick={() => handleRemovePlayer(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <div className="addplayerinput">
        <label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter player name"
          />
          </label>
          <button onClick={handleAddPlayer} disabled={players.length >= maxPlayers}>
            Add Player
          </button>
          </div>
          <div><InvitePlayer /></div>
      </div>
    </div>
  );
}
