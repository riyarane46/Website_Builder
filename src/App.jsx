import React, { useState, useRef } from 'react';
import Header from './components/Header/Header';
import TemplateSelector from './components/Template/TemplateSelector';
import Builder from './components/Builder/Builder';
import './App.css';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const builderRef = useRef(null);

  const handleSelectTemplate = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleBackToTemplates = () => {
    setSelectedTemplate(null);
    setIsPreviewMode(false);
  };

  const handlePreview = () => {
    if (selectedTemplate) {
      setIsPreviewMode(!isPreviewMode);
    }
  };

  const handleExport = () => {
    if (!selectedTemplate || !builderRef.current) return;
    
    // Get the current elements from the Builder component
    const elements = builderRef.current.getElements();
    
    // Create HTML content from the elements
    const htmlContent = generateHTML(elements, selectedTemplate);
    
    // Create a downloadable file
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Create a link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTemplate}-website.html`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Function to generate HTML from elements
  const generateHTML = (elements, templateType) => {
    const styles = `
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        line-height: 1.6;
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }
    `;

    const elementsHTML = Object.values(elements).map(element => {
      switch (element.type) {
        case 'header':
          return `<h1 style="${styleObjectToString(element.style)}">${element.content}</h1>`;
        case 'text':
          return `<p style="${styleObjectToString(element.style)}">${element.content}</p>`;
        case 'image':
          return `<img src="${element.content}" alt="${element.alt || ''}" style="${styleObjectToString(element.style)}" />`;
        case 'button':
          return `<button style="${styleObjectToString(element.style)}">${element.content}</button>`;
        default:
          return '';
      }
    }).join('\n');

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${templateType.charAt(0).toUpperCase() + templateType.slice(1)} Website</title>
        <style>${styles}</style>
      </head>
      <body>
        <div class="container">
          ${elementsHTML}
        </div>
      </body>
      </html>
    `;
  };

  // Helper function to convert style object to string
  const styleObjectToString = (styleObj) => {
    if (!styleObj) return '';
    return Object.entries(styleObj)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');
  };

  return (
    <div className="App">
      <Header 
        onPreview={handlePreview} 
        onExport={handleExport} 
      />
      
      {!selectedTemplate ? (
        <TemplateSelector onSelectTemplate={handleSelectTemplate} />
      ) : (
        <>
          {!isPreviewMode && (
            <div className="builder-nav">
              <button className="back-button" onClick={handleBackToTemplates}>
                ← Back to Templates
              </button>
            </div>
          )}
          
          <Builder 
            templateType={selectedTemplate} 
            isPreviewMode={isPreviewMode}
            ref={builderRef}
          />
          
          {isPreviewMode && (
            <div className="preview-bar">
              <button className="button secondary" onClick={handlePreview}>
                Exit Preview
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
