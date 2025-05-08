import React from 'react';
import '../styles/layout/header.css';
import RickAndMortyLogo from '../assets/images/RICK_MORTY_ICON-01.svg';

const Header = ({ searchTerm, setSearchTerm }) => (
  <header className="header">
    <img src={RickAndMortyLogo} alt="Rick and Morty logo" className="header-logo" />
    <div className="header-content">
      <h1 className="header-title">API de Rick and Morty</h1>
      <div className="header-search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Pesquise"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button className="search-button">🔍</button>
      </div>
    </div>
  </header>
);

export default Header;
