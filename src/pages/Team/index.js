import React from 'react';
import './team.scss';
import alineImg from "../../components/assets/aline.jpg";
import anuImg from "../../components/assets/anu.jpg";
import vivaImg from "../../components/assets/viva.jpg";

export default function Team() {
  return (
    <>
    <div className='team-container'>
    <h3>Meet our Team</h3>
    <div className="team-members">
      <div className="team-member">
        <img src={alineImg} alt="Alin Crispe" />
        <h3>Alin Crispe</h3>
        <p>Mommy Line</p>
      </div>
      <div className="team-member">
        <img src={anuImg} alt="Anu Sayora" />
        <h3>Anu Sayora</h3>
        <p>Mommy Anu</p>
      </div>
      <div className="team-member">
        <img src={vivaImg} alt="Viva Arroyo" />
        <h3>Viva Arroyo</h3>
        <p>Mommy Bee</p>
      </div>
    </div>
    </div>
    </>
  );
};
