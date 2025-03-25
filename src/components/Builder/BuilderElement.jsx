import React from 'react';

const BuilderElement = ({ element, isSelected, isPreviewMode, onElementClick }) => {
  const handleClick = (e) => {
    if (element.type === 'button') {
      e.preventDefault();
    }
    onElementClick(element.id);
  };

  const className = !isPreviewMode && isSelected ? 'selected-element' : '';

  switch (element.type) {
    case 'header':
      return (
        <h1 
          style={element.style}
          onClick={handleClick}
          className={className}
        >
          {element.content}
        </h1>
      );
    case 'image':
      return (
        <img 
          src={element.content} 
          alt={element.alt} 
          style={element.style}
          onClick={handleClick}
          className={className}
        />
      );
    case 'text':
      return (
        <p 
          style={element.style}
          onClick={handleClick}
          className={className}
        >
          {element.content}
        </p>
      );
    case 'button':
      return (
        <button 
          style={element.style}
          onClick={handleClick}
          className={className}
        >
          {element.content}
        </button>
      );
    default:
      return null;
  }
};

export default BuilderElement;
