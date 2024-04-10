import React from 'react';
import './index.scss';
import pickleImage from "../../components/assets/pickle.jpg";
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className ="container" style={{ backgroundImage: `url(${pickleImage})` }}>

        <div className="container">
            <h1 className="heading">The Fastest way to organize play</h1>
            <p className="text">Recruit the perfect number of players every time and always know who’s in. It's never been easier to get out on the court!</p>
          <div className='buttonArea'>
          <Link to="/login" className="button">Create a game</Link>
          </div>
        </div>
      
      <section>
        <div className="container">
          <div className="stack centered">
            <h1 className="heading">How it works?</h1>
          </div>
          
          <div className="card-container">
            <div className="card">
              <h2 className="heading">Create a Session:</h2>
              <p>Set a time and a local court for an upcoming game. You can add a player limit too.</p>
            </div>

            <div className="card">
              <h2 className="heading">Invite Players:</h2>
              <p>Grab a link to share in group chats, GroupMe, Facebook Groups or TeamReach threads.</p>
            </div>

            <div className="card">
              <h2 className="heading">See Who’s In:</h2>
              <p>Players can grab a spot in the game.</p>
            </div>            
          </div>

        </div>
      </section>
    </div>
  );
}