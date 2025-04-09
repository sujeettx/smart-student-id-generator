import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

const classes = ["1A", "1B", "2A", "2B"];
const busRoutes = ["Route 1", "Route 2", "Route 3"];
const allergyOptions = ["Peanuts", "Dairy", "Gluten", "Dust", "Pollen"];

function StudentForm({ onSubmit }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    rollNumber: "",
    classDivision: "",
    allergies: [],
    rackNumber: "",
    busRoute: "",
    photo: null,
    photoPreview: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAllergyChange = (allergy) => {
    setForm((prev) => {
      if (prev.allergies.includes(allergy)) {
        return {
          ...prev,
          allergies: prev.allergies.filter(item => item !== allergy)
        };
      } else {
        return {
          ...prev,
          allergies: [...prev.allergies, allergy]
        };
      }
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        photo: file,
        photoPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Prepare form data with proper handling of photo
    const formData = {
      ...form,
      photo: form.photo ? form.photo.name : null,
      photoPreview: form.photoPreview, // Preserve the photo preview URL
      timestamp: new Date().getTime(), // Add timestamp to track when entry was created
    };
    
    // Get existing data from localStorage
    const existingData = JSON.parse(localStorage.getItem("studentData")) || [];
    
    // Implement the logic for managing two entries
    if (existingData.length === 0) {
      // First entry - just add it
      localStorage.setItem("studentData", JSON.stringify([formData]));
    } else if (existingData.length === 1) {
      // Second entry - add as newest while keeping the previous one
      localStorage.setItem("studentData", JSON.stringify([formData, existingData[0]]));
    } else {
      // Third entry or more - keep newest and second newest only
      localStorage.setItem("studentData", JSON.stringify([formData, existingData[0]]));
    }
    
    // Save current student separately for easy access
    localStorage.setItem("currentStudent", JSON.stringify(formData));
  
    toast.success("Your data is successfully saved! Redirecting to your ID card...", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  
    if (onSubmit) onSubmit(formData);
    setForm({
      name: "",
      rollNumber: "",
      classDivision: "",
      allergies: [],
      rackNumber: "",
      busRoute: "",
      photo: null,
      photoPreview: "",
    });
    setTimeout(() => {
      navigate("/id-card-preview");
    }, 3000);
  };  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <ToastContainer />
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-bold text-center mb-6">Student Registration</h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input 
              type="text" 
              name="name" 
              placeholder="Enter full name" 
              required
              value={form.name} 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Roll Number</label>
            <input 
              type="text" 
              name="rollNumber" 
              placeholder="Enter roll number" 
              required
              value={form.rollNumber} 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Class & Division</label>
            <select 
              name="classDivision" 
              value={form.classDivision} 
              onChange={handleChange} 
              required 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Class & Division</option>
              {classes.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Allergies (if any)</label>
            <div className="space-y-2 p-2 border border-gray-300 rounded">
              {allergyOptions.map((allergy) => (
                <div key={allergy} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`allergy-${allergy}`}
                    checked={form.allergies.includes(allergy)}
                    onChange={() => handleAllergyChange(allergy)}
                    className="mr-2"
                  />
                  <label htmlFor={`allergy-${allergy}`} className="text-sm text-gray-700">
                    {allergy}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Rack Number</label>
            <input 
              type="text" 
              name="rackNumber" 
              placeholder="Enter rack number" 
              required
              value={form.rackNumber} 
              onChange={handleChange} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Bus Route</label>
            <select 
              name="busRoute" 
              value={form.busRoute} 
              onChange={handleChange} 
              required 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Bus Route</option>
              {busRoutes.map((route) => <option key={route} value={route}>{route}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Photo</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handlePhotoUpload} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            {form.photoPreview && (
              <div className="flex justify-center mt-2">
                <img 
                  src={form.photoPreview} 
                  alt="Preview" 
                  className="w-24 h-24 rounded-full object-cover border-2 border-blue-500" 
                />
              </div>
            )}
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white p-3 rounded font-medium hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;