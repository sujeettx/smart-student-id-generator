import React, { useState, useEffect } from 'react';

// Template options with different styles
const templates = [
  {
    id: 'classic',
    name: 'Classic',
    thumbnail: '/api/placeholder/100/60',
    colors: {
      primary: 'blue-600',
      secondary: 'blue-500',
      accent: 'gray-100',
      text: 'gray-600'
    }
  },
  {
    id: 'modern',
    name: 'Modern',
    thumbnail: '/api/placeholder/100/60',
    colors: {
      primary: 'purple-600',
      secondary: 'purple-500',
      accent: 'gray-50',
      text: 'gray-700'
    }
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    thumbnail: '/api/placeholder/100/60',
    colors: {
      primary: 'gray-800',
      secondary: 'gray-700',
      accent: 'gray-900',
      text: 'gray-200'
    }
  },
  {
    id: 'corporate',
    name: 'Corporate',
    thumbnail: '/api/placeholder/100/60',
    colors: {
      primary: 'green-600',
      secondary: 'green-500',
      accent: 'gray-50',
      text: 'gray-700'
    }
  }
];

const TemplateSelector = ({ onSelectTemplate, currentTemplateId = 'classic' }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(
    templates.find(t => t.id === currentTemplateId) || templates[0]
  );
  const [isOpen, setIsOpen] = useState(false);

  // When template changes, notify parent component
  useEffect(() => {
    if (onSelectTemplate) {
      onSelectTemplate(selectedTemplate);
    }
    
    // Save selected template to localStorage for persistence
    localStorage.setItem('selectedTemplateId', selectedTemplate.id);
  }, [selectedTemplate, onSelectTemplate]);

  // Load saved template preference on component mount
  useEffect(() => {
    const savedTemplateId = localStorage.getItem('selectedTemplateId');
    if (savedTemplateId) {
      const template = templates.find(t => t.id === savedTemplateId);
      if (template) {
        setSelectedTemplate(template);
      }
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="mb-2 text-sm font-medium">Card Template</div>
      
      {/* Template selector button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between bg-white border border-gray-300 rounded-md p-2 w-full"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center">
          <div 
            className={`w-8 h-8 mr-2 rounded bg-${selectedTemplate.colors.primary} flex items-center justify-center`}
            aria-hidden="true"
          >
            <span className="text-white text-xs">ID</span>
          </div>
          <span>{selectedTemplate.name}</span>
        </div>
        <svg 
          className="h-5 w-5 text-gray-400" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor" 
          aria-hidden="true"
        >
          <path 
            fillRule="evenodd" 
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
            clipRule="evenodd" 
          />
        </svg>
      </button>

      {/* Template options dropdown */}
      {isOpen && (
        <div 
          className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          role="listbox"
        >
          {templates.map((template) => (
            <div
              key={template.id}
              className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 ${
                selectedTemplate.id === template.id ? 'bg-gray-100' : ''
              }`}
              role="option"
              onClick={() => handleSelectTemplate(template)}
            >
              <div className="flex items-center">
                <div 
                  className={`w-8 h-8 mr-2 rounded bg-${template.colors.primary} flex items-center justify-center`}
                  aria-hidden="true"
                >
                  <span className="text-white text-xs">ID</span>
                </div>
                <span className={selectedTemplate.id === template.id ? 'font-medium' : 'font-normal'}>
                  {template.name}
                </span>

                {selectedTemplate.id === template.id && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;