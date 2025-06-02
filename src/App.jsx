import StudentForm from "./components/StudentForm";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import IDCardPreview from "./components/IDCardPreview";
// import TemplateSwitcher from "./components/TemplateSwitcher";

import React from 'react'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<StudentForm />} />
          <Route path="/id-card-preview" element={<IDCardPreview />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
