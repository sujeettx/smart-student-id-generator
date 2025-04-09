import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import * as htmlToImage from 'html-to-image';
import TemplateSelector from './TemplateSwitcher'; 

const IDCardPreview = () => {
  const [currentStudent, setCurrentStudent] = useState(null);
  const [previousStudent, setPreviousStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('current');
  const [selectedTemplate, setSelectedTemplate] = useState({
    id: 'classic',
    name: 'Classic',
    colors: {
      primary: 'blue-600',
      secondary: 'blue-500',
      accent: 'gray-100',
      text: 'gray-600'
    }
  });

  useEffect(() => {
    // Fetch both current and previous student data
    const storedData = JSON.parse(localStorage.getItem("studentData")) || [];
    
    if (storedData.length > 0) {
      setCurrentStudent(storedData[0]); // Most recent entry
      
      if (storedData.length > 1) {
        setPreviousStudent(storedData[1]); // Previous entry
      }
    }
  }, []);

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
  };

  const handleDownload = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    htmlToImage.toPng(element)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `student-id-card-${id}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('Error generating image:', error);
      });
  };

  const renderIDCard = (student, id) => {
    if (!student) return null;

    // Destructure colors from the selected template
    const { primary, secondary, accent, text } = selectedTemplate.colors;

    return (
      <div 
        id={id} 
        className={`bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm mx-auto border-2 border-${secondary}`}
      >
        <div className={`bg-${primary} text-white py-3 px-4`}>
          <h3 className="text-xl font-bold text-center">Student ID Card</h3>
        </div>
        
        <div className="p-4 flex flex-col items-center">
          {student.photoPreview ? (
            <div className={`w-32 h-32 rounded-full overflow-hidden border-4 border-${secondary} mb-4`}>
              <img 
                src={student.photoPreview} 
                alt={student.name} 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className={`w-32 h-32 rounded-full bg-${accent} flex items-center justify-center mb-4`}>
              <span className={`text-4xl text-${text}`}>
                {student.name ? student.name.charAt(0).toUpperCase() : "?"}
              </span>
            </div>
          )}
          
          <h2 className="text-2xl font-bold text-center mb-2">{student.name}</h2>
          <div className={`bg-${accent} w-full p-3 rounded mb-3`}>
            <div className="grid grid-cols-2 gap-2">
              <div className={`text-${text}`}>Class:</div>
              <div className="font-medium">{student.classDivision}</div>
              
              <div className={`text-${text}`}>Roll Number:</div>
              <div className="font-medium">{student.rollNumber}</div>
              
              <div className={`text-${text}`}>Rack Number:</div>
              <div className="font-medium">{student.rackNumber}</div>
              
              <div className={`text-${text}`}>Bus Route:</div>
              <div className="font-medium">{student.busRoute}</div>
            </div>
          </div>
          
          {student.allergies && student.allergies.length > 0 && (
            <div className="w-full mb-3">
              <h4 className={`font-medium mb-1 ${selectedTemplate.id === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                Allergies:
              </h4>
              <div className="flex flex-wrap gap-1">
                {student.allergies.map((allergy, index) => (
                  <span 
                    key={index}
                    className={`${selectedTemplate.id === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800'} text-xs px-2 py-1 rounded`}
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-4 flex justify-center">
            <QRCodeSVG 
              value={JSON.stringify(student)} 
              size={128}
              level="H"
              includeMargin={true}
              bgColor={selectedTemplate.id === 'dark' ? '#1f2937' : '#ffffff'}
              fgColor={selectedTemplate.id === 'dark' ? '#ffffff' : '#000000'}
            />
          </div>
        </div>
        
        <div className={`p-4 bg-${accent} flex justify-center`}>
          <button
            onClick={() => handleDownload(id)}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center gap-2 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download as PNG
          </button>
        </div>
      </div>
    );
  };

  // Destructure colors for use in the component's main UI
  const { primary } = selectedTemplate.colors;

  return (
    <div className={`min-h-screen ${selectedTemplate.id === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} p-4`}>
      <div className="max-w-md mx-auto">
        <h2 className={`text-2xl font-bold text-center mb-6 ${selectedTemplate.id === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Student ID Card Preview
        </h2>
        
        {/* Template Selector */}
        <div className="mb-6">
          <TemplateSelector 
            onSelectTemplate={handleTemplateChange} 
            currentTemplateId={selectedTemplate.id} 
          />
        </div>
        
        {(currentStudent || previousStudent) ? (
          <>
            {currentStudent && previousStudent && (
              <div className={`flex mb-4 border-b ${selectedTemplate.id === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                <button 
                  className={`flex-1 py-2 text-center font-medium ${
                    activeTab === 'current' 
                      ? `text-${primary} border-b-2 border-${primary}` 
                      : selectedTemplate.id === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                  onClick={() => setActiveTab('current')}
                >
                  Current ID Card
                </button>
                <button 
                  className={`flex-1 py-2 text-center font-medium ${
                    activeTab === 'previous' 
                      ? `text-${primary} border-b-2 border-${primary}` 
                      : selectedTemplate.id === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                  onClick={() => setActiveTab('previous')}
                >
                  Previous ID Card
                </button>
              </div>
            )}
            
            {activeTab === 'current' && currentStudent && (
              renderIDCard(currentStudent, 'current-id-card')
            )}
            
            {activeTab === 'previous' && previousStudent && (
              renderIDCard(previousStudent, 'previous-id-card')
            )}
          </>
        ) : (
          <div className={`${
            selectedTemplate.id === 'dark' 
              ? 'bg-yellow-800 text-yellow-100' 
              : 'bg-yellow-100 text-yellow-800'
          } p-4 rounded text-center`}>
            No student data found. Please register a student first.
          </div>
        )}
      </div>
    </div>
  );
};

export default IDCardPreview;