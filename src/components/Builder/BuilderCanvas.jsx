import React from 'react';
import BuilderElement from './BuilderElement';

const BuilderCanvas = ({ 
  elements, 
  selectedElement, 
  isPreviewMode, 
  onElementClick, 
  onDragOver, 
  onDrop 
}) => {
  return (
    <div className={`canvas ${isPreviewMode ? 'full-width' : ''}`}>
      <div 
        className="template-preview"
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {Object.values(elements).map(element => (
          <div key={element.id} className="element-wrapper">
            <BuilderElement 
              element={element} 
              isSelected={selectedElement === element.id}
              isPreviewMode={isPreviewMode}
              onElementClick={onElementClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuilderCanvas;
