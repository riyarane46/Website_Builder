import React, { useState, useImperativeHandle, forwardRef } from 'react';
import './Builder.css';
import ElementEditor from '../ElementEditor/ElementEditor';
import BuilderCanvas from './BuilderCanvas';
import { getInitialContent, createNewElement } from './TemplateUtils';

const Builder = forwardRef(({ templateType, isPreviewMode }, ref) => {
  const [elements, setElements] = useState(getInitialContent(templateType));
  const [selectedElement, setSelectedElement] = useState(null);
  const [nextId, setNextId] = useState(1);

  // Expose elements to parent component for export
  useImperativeHandle(ref, () => ({
    getElements: () => elements
  }));

  const handleElementClick = (elementId) => {
    if (!isPreviewMode) {
      setSelectedElement(elementId);
    }
  };

  const handleElementUpdate = (elementId, updatedProps) => {
    setElements(prevElements => ({
      ...prevElements,
      [elementId]: {
        ...prevElements[elementId],
        ...updatedProps
      }
    }));
  };

  const handleDeleteElement = (elementId) => {
    const newElements = { ...elements };
    delete newElements[elementId];
    setElements(newElements);
    setSelectedElement(null);
  };

  const handleDragOver = (e) => {
    if (!isPreviewMode) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    }
  };

  const handleDrop = (e) => {
    if (isPreviewMode) return;
    
    e.preventDefault();
    const elementType = e.dataTransfer.getData('elementType');
    
    if (!elementType) return;
    
    // Create a new element based on the dropped type
    const newElementId = `${elementType}_${nextId}`;
    setNextId(prevId => prevId + 1);
    
    const newElement = createNewElement(elementType, newElementId);
    
    // Add the new element to the elements state
    setElements(prevElements => ({
      ...prevElements,
      [newElementId]: newElement
    }));
    
    // Select the newly added element
    setSelectedElement(newElementId);
  };

  return (
    <div className={`builder-container ${isPreviewMode ? 'preview-mode' : ''}`}>
      <BuilderCanvas 
        elements={elements}
        selectedElement={selectedElement}
        isPreviewMode={isPreviewMode}
        onElementClick={handleElementClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />
      
      {!isPreviewMode && (
        <div className="editor-panel">
          {selectedElement ? (
            <ElementEditor 
              element={elements[selectedElement]} 
              onUpdate={(updatedProps) => handleElementUpdate(selectedElement, updatedProps)} 
              onDeleteElement={handleDeleteElement}
            />
          ) : (
            <div className="editor-placeholder">
              <ElementEditor 
                element={{id: 'placeholder', type: 'placeholder', content: ''}}
                onUpdate={() => {}}
                onDeleteElement={() => {}}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export default Builder;
