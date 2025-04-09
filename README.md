# 📛 Smart Student ID Generator

The Smart Student ID Generator is a simple yet powerful React-based web app that allows students to register their information, preview their ID card in real-time, and switch between different ID templates. It uses local storage to retain the latest submitted student data and displays a responsive preview of the ID card with uploaded photo, personal details, and more.

## 🧠 Overview

This app is designed for generating stylish student ID cards with just a few inputs. It allows:

- 📝 Student registration with personal details & photo upload
- 👀 Real-time preview of the ID card after form submission
- 🎨 Template switching support (multiple themes/layouts)
- 💾 LocalStorage integration for retaining data on reload

## 🔧 Tech Stack

- **React** – Frontend library
- **React Router DOM** – For routing between form and preview
- **React Toastify** – For displaying success notifications
- **Tailwind CSS** – For styling the app responsively
- **LocalStorage** – For persisting form data locally

## ⚙️ Setup Instructions

Make sure you have Node.js & npm or yarn installed.

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/smart-student-id-generator.git
   cd smart-student-id-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the app**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── StudentForm.jsx        # Student registration form
│   ├── IDCardPreview.jsx      # Shows student ID card after form is submitted
│   └── TemplateSwitcher.jsx   # (Optional) Switches ID card templates
├── App.jsx                    # Main app with routes
├── main.jsx                   # Entry point
├── index.css                  # Tailwind CSS setup
```

## 🧩 Used Dependencies

```json
"dependencies": {
  "@tailwindcss/vite": "^4.1.3",
  "html-to-image": "^1.11.13",
  "qrcode.react": "^4.2.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^7.5.0",
  "react-toastify": "^11.0.5",
  "tailwindcss": "^4.1.3"
}
```

## 🔄 How It Works

**StudentForm.jsx**
- Collects student data like name, roll number, class, bus route, allergies, rack number, and photo
- Saves it into localStorage under the key: studentDataArray

**IDCardPreview.jsx**
- Fetches the saved data from localStorage
- Displays the most recent student ID card preview in a styled format

**TemplateSwitcher.jsx**
- (Optional) Allows the user to switch between different ID card designs

## ✅ Features

- 📥 File Upload (Profile Photo)
- 🧼 Form Validation
- 🖼️ Real-time Preview with Image
- 📡 Data Persistence using localStorage
- 🛠 Tailwind-powered styling
- 🚀 Clean Routing via React Router

## 📸 Preview Screenshot
*(Add a screenshot here when you have one)*

## 🙌 Author

**Sujeet Kumar Kushwaha**
- [LinkedIn](#)
- [GitHub](#)

## 🪄 Future Ideas

- 📤 Export ID card as PDF or PNG
- ☁️ Cloud storage integration (Firebase/Cloudinary)
- 🌓 Dark mode
- 🧑‍🎓 Admin panel for managing all students