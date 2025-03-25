import React from 'react';
import './TemplateSelector.css';
import portfolioIcon from '../../assets/portfolio-icon.svg';
import ecommerceIcon from '../../assets/ecommerce-icon.svg';
import businessIcon from '../../assets/business-icon.svg';

const TemplateSelector = ({ onSelectTemplate }) => {
  const templates = [
    {
      id: 'portfolio',
      name: 'Portfolio',
      icon: portfolioIcon,
      description: 'Showcase your work with this elegant portfolio template'
    },
    {
      id: 'ecommerce',
      name: 'E-commerce',
      icon: ecommerceIcon,
      description: 'Sell products online with this feature-rich store template'
    },
    {
      id: 'business',
      name: 'Business',
      icon: businessIcon,
      description: 'Present your business professionally with this corporate template'
    }
  ];

  return (
    <div className="template-selector-container">
      <h2 className="template-selector-title">Choose a Template</h2>
      <div className="template-grid">
        {templates.map(template => (
          <div 
            key={template.id} 
            className="template-card"
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="template-icon">
              <img src={template.icon} alt={`${template.name} template`} />
            </div>
            <h3 className="template-name">{template.name}</h3>
            <p className="template-description">{template.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
