/* import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as database from '../../../database';
import "./addplayer.scss";
export default function AddPlayer() {
  const { sessionId } = useParams(); // Access sessionId from URL parameters
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const maxPlayers = 4;
  const minPlayers = 2;

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        // Load the session data
        const sessions = await database.load();
        // Find the session with the matching sessionId
        const session = sessions.find(session => session.id === sessionId);
        if (session) {
          // Set the players from the session data
          setPlayers(session.players || []); // Use empty array if players field is undefined
        }
      } catch (error) {
        console.error('Error loading players:', error);
      }
    };

    fetchPlayers();
  }, [sessionId]); // Fetch players whenever sessionId changes



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

  const handleRemovePlayer = (index) => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
  };

  return (
    <div className="addplayer-container" >
      <div>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter player name"
        />
        <button onClick={handleAddPlayer} disabled={players.length >= maxPlayers}>
          Add Player
        </button>
        {players.length < minPlayers && (
          <p>Please add at least {minPlayers - players.length} more player(s).</p>
        )}
        <ul>
          {players.map((player, index) => (
            <li key={index}>
              {player}
              <button onClick={() => handleRemovePlayer(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <div>Document ID: {sessionId}</div>
      </div>
     
    </div>
  );
}
 */

import React, { useState, useEffect } from "react";
import * as database from '../../../database';
import "./addplayer.scss";

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
          // Create a copy of the players array
          const updatedPlayers = [...players];
          // Remove the player at the specified index
          updatedPlayers.splice(index, 1);
          // Update the players array in the database using the save function
          const isUpdated = await database.save(updatedPlayers, sessionId);
          if (!isUpdated) {
              console.error('Failed to update session with players');
          }
          // Update the local state
          setPlayers(updatedPlayers);
      } catch (error) {
          console.error('Error removing player:', error);
      }
  };

  return (
    <div className="addplayer-container" >
      <div>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter player name"
        />
        <button onClick={handleAddPlayer} disabled={players.length >= maxPlayers}>
          Add Player
        </button>
        {players.length < minPlayers && (
          <p>Please add at least {minPlayers - players.length} more player(s).</p>
        )}
        <ul>
          {players.map((player, index) => (
            <li key={index}>
              {player}
              <button onClick={() => handleRemovePlayer(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <div>Document ID: {sessionId}</div>
      </div>
     {/* Add console.log here */}
    {console.log("Players:", players)}
    </div>
  );
}
