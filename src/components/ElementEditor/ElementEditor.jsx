import React, { useState, useEffect } from 'react';
import './ElementEditor.css';

const ElementEditor = ({ element, onUpdate, onDeleteElement }) => {
  const [formValues, setFormValues] = useState({
    content: element.content,
    ...element.style
  });
  
  const [activeTab, setActiveTab] = useState('add'); // Changed default to 'add'

  // Reset form values when a different element is selected
  useEffect(() => {
    setFormValues({
      content: element.content,
      ...element.style
    });
    // When an element is selected, switch to edit tab
    if (element) {
      setActiveTab('edit');
    }
  }, [element.id, element.content, element.style]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { content, ...styleProps } = formValues;
    
    onUpdate({
      content,
      style: styleProps
    });
  };

  const handleDragStart = (e, elementType) => {
    e.dataTransfer.setData('elementType', elementType);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this element?')) {
      onDeleteElement(element.id);
    }
  };

  const renderFields = () => {
    const commonFields = (
      <>
        <div className="form-group">
          <label>Content</label>
          <input 
            type="text" 
            name="content" 
            value={formValues.content || ''} 
            onChange={handleChange} 
          />
        </div>
        
        {element.type !== 'image' && (
          <>
            <div className="form-group">
              <label>Font Size</label>
              <input 
                type="text" 
                name="fontSize" 
                value={formValues.fontSize || ''} 
                onChange={handleChange} 
                placeholder="e.g., 16px"
              />
            </div>
            
            <div className="form-group">
              <label>Color</label>
              <input 
                type="color" 
                name="color" 
                value={formValues.color || '#000000'} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label>Text Align</label>
              <select 
                name="textAlign" 
                value={formValues.textAlign || 'left'} 
                onChange={handleChange}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </>
        )}
      </>
    );

    // Element-specific fields
    switch (element.type) {
      case 'image':
        return (
          <>
            <div className="form-group">
              <label>Image URL</label>
              <input 
                type="text" 
                name="content" 
                value={formValues.content || ''} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <label>Alt Text</label>
              <input 
                type="text" 
                name="alt" 
                value={element.alt || ''} 
                onChange={(e) => onUpdate({ alt: e.target.value })} 
              />
            </div>
            <div className="form-group">
              <label>Width</label>
              <input 
                type="text" 
                name="width" 
                value={formValues.width || ''} 
                onChange={handleChange} 
                placeholder="e.g., 100%"
              />
            </div>
          </>
        );
      case 'button':
        return (
          <>
            {commonFields}
            <div className="form-group">
              <label>Background Color</label>
              <input 
                type="color" 
                name="backgroundColor" 
                value={formValues.backgroundColor || '#4a6cf7'} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <label>Padding</label>
              <input 
                type="text" 
                name="padding" 
                value={formValues.padding || ''} 
                onChange={handleChange} 
                placeholder="e.g., 10px 20px"
              />
            </div>
            <div className="form-group">
              <label>Border Radius</label>
              <input 
                type="text" 
                name="borderRadius" 
                value={formValues.borderRadius || ''} 
                onChange={handleChange} 
                placeholder="e.g., 4px"
              />
            </div>
          </>
        );
      default:
        return commonFields;
    }
  };

  const renderDraggableElements = () => {
    return (
      <div className="draggable-elements">
        <h4>Drag elements to add</h4>
        <div 
          className="draggable-element"
          draggable
          onDragStart={(e) => handleDragStart(e, 'header')}
        >
          <div className="element-icon">H</div>
          <span>Heading</span>
        </div>
        <div 
          className="draggable-element"
          draggable
          onDragStart={(e) => handleDragStart(e, 'text')}
        >
          <div className="element-icon">T</div>
          <span>Text</span>
        </div>
        <div 
          className="draggable-element"
          draggable
          onDragStart={(e) => handleDragStart(e, 'image')}
        >
          <div className="element-icon">I</div>
          <span>Image</span>
        </div>
        <div 
          className="draggable-element"
          draggable
          onDragStart={(e) => handleDragStart(e, 'button')}
        >
          <div className="element-icon">B</div>
          <span>Button</span>
        </div>
      </div>
    );
  };

  return (
    <div className="element-editor">
      <div className="editor-tabs">
        <button 
          className={`tab-button ${activeTab === 'edit' ? 'active' : ''}`}
          onClick={() => setActiveTab('edit')}
        >
          Edit Element
        </button>
        <button 
          className={`tab-button ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          Add Elements
        </button>
      </div>

      {activeTab === 'edit' ? (
        <>
          <h3>Edit {element.type.charAt(0).toUpperCase() + element.type.slice(1)}</h3>
          <form onSubmit={handleSubmit}>
            {renderFields()}
            <div className="button-group">
              <button type="submit" className="save-button">Apply Changes</button>
              <button 
                type="button" 
                className="delete-button"
                onClick={handleDelete}
              >
                Delete Element
              </button>
            </div>
          </form>
        </>
      ) : (
        renderDraggableElements()
      )}
    </div>
  );
};

export default ElementEditor;
