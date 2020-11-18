import React from 'react';
import '../styles/pages/home.css';

import background from '../images/background-capacitor.jpg';

export default function Home() {
  return (
    <main>
      <h1> Eletronica Beira Rio </h1>

      <div className="backgroundDiv">
        <img id="background" src={background} alt="eletronica"/>
      </div>
    </main>
  );
}