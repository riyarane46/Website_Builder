export const getInitialContent = (templateType) => {
  const baseContent = {
    header: {
      id: 'header',
      type: 'header',
      content: `${templateType.charAt(0).toUpperCase() + templateType.slice(1)} Website`,
      style: { fontSize: '32px', color: '#333', textAlign: 'center' }
    },
    image: {
      id: 'image',
      type: 'image',
      content: `https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80`,
      alt: `${templateType} image`,
      style: { width: '100%', maxWidth: '800px', margin: '20px auto' }
    },
    description: {
      id: 'description',
      type: 'text',
      content: `This is a ${templateType} website template. You can edit this text to describe your ${templateType}.`,
      style: { fontSize: '16px', color: '#666', lineHeight: '1.6', margin: '20px 0' }
    },
    button: {
      id: 'button',
      type: 'button',
      content: 'Learn More',
      style: { 
        backgroundColor: '#4a6cf7', 
        color: 'white', 
        padding: '10px 20px', 
        border: 'none', 
        borderRadius: '4px',
        cursor: 'pointer'
      }
    }
  };

  // Customize based on template type
  if (templateType === 'portfolio') {
    baseContent.header.content = 'My Portfolio';
    baseContent.description.content = 'Welcome to my portfolio website. Here you can find my latest work and projects.';
    baseContent.button.content = 'View Projects';
    baseContent.image.content = 'https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80';
  } else if (templateType === 'ecommerce') {
    baseContent.header.content = 'Welcome to Our Store';
    baseContent.description.content = 'Browse our collection of products and find something you love.';
    baseContent.button.content = 'Shop Now';
    baseContent.image.content = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80';
  } else if (templateType === 'business') {
    baseContent.header.content = 'Business Solutions';
    baseContent.description.content = 'We provide top-quality business services to help your company grow.';
    baseContent.button.content = 'Contact Us';
    baseContent.image.content = 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400&q=80';
  }

  return baseContent;
};

export const createNewElement = (elementType, id) => {
  let newElement = {
    id,
    type: elementType
  };
  
  // Set default properties based on element type
  switch (elementType) {
    case 'header':
      newElement = {
        ...newElement,
        content: 'New Heading',
        style: { fontSize: '24px', color: '#333', textAlign: 'center', margin: '20px 0' }
      };
      break;
    case 'text':
      newElement = {
        ...newElement,
        content: 'Add your text here',
        style: { fontSize: '16px', color: '#666', lineHeight: '1.6', margin: '15px 0' }
      };
      break;
    case 'image':
      newElement = {
        ...newElement,
        content: 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&h=300&q=80',
        alt: 'New image',
        style: { width: '100%', maxWidth: '600px', margin: '20px auto' }
      };
      break;
    case 'button':
      newElement = {
        ...newElement,
        content: 'Click Me',
        style: { 
          backgroundColor: '#4a6cf7', 
          color: 'white', 
          padding: '8px 16px', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }
      };
      break;
    default:
      break;
  }
  
  return newElement;
};
