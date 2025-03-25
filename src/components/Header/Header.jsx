import React from 'react';
import './Header.css';

const Header = ({ onPreview, onExport }) => {
  return (
    <header className="header">
      <h1>Website Builder</h1>
      
      <div className="actions">
        <button className="button secondary" onClick={onPreview}>Preview</button>
        <button className="button primary" onClick={onExport}>Export</button>
      </div>
    </header>
  );
};

export default Header;
