# Global Herald

A modern, modular application designed to facilitate news content creation and management with an intuitive interface. This project uses **React**, **Vite**, **TailwindCSS**, and other modern libraries to ensure an efficient development and user experience.

---

## 📚 Table of Contents

- [Installation](#installation)
- [Setup](#setup)
  - [Environment Variables](#environment-variables)
  - [Running the Development Server](#running-the-development-server)
  - [Building the Project](#building-the-project)
  - [Preview the Build](#preview-the-build)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)
- [Key Files](#key-files)
- [License](#license)

---

## 🚀 Installation

Clone this repository:

```bash
git clone https://github.com/yourusername/global-herald.git
```

Navigate to the project directory:

```bash
cd global-herald
```

Install the dependencies:

```bash
npm install
```

---

## ⚙️ Setup

### Environment Variables

This project requires an environment variable for OpenWeatherMap API:

Create a `.env` file in the root directory and add the following:

```env
WEATHER_API_KEY=your_openweathermap_api_key
```

### Running the Development Server

```bash
npm run dev
```

Access the app at: [http://localhost:3000](http://localhost:3000)

### Building the Project

```bash
npm run build
```

This will output the build to the `dist` directory.

### Preview the Build

```bash
npm run preview
```

---

## 🛠 Technologies Used

- **React** – JavaScript library for building UIs
- **Vite** – Build tool for modern web apps
- **TailwindCSS** – Utility-first CSS framework
- **Formik** – React form builder
- **Yup** – Schema validation
- **Axios** – HTTP client
- **Framer Motion** – Animation library
- **React Router** – Routing
- **Zustand** – State management

---

## 🌟 Features

- **Multi-step Forms**: Step-by-step registration with validation
- **Weather Information**: Real-time data from OpenWeatherMap
- **Live Time**: Dynamic, real-time clock
- **Responsive Design**: Mobile and desktop friendly

---

## 📜 Scripts

Available scripts:

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run lint      # Run linter
npm run preview   # Preview production build
```

---

## 📁 Folder Structure

```bash
/src
  /components        # Reusable React components
  /utils             # Utility functions and services
  /pages             # Page components (home, signup, etc.)
  /assets            # Static assets
  /styles            # Tailwind configurations
  App.tsx            # Root component
  main.tsx           # App entry point
  index.tsx          # Shared TypeScript utilities

/public              # Public static files
```

---

## 🗂 Key Files

- `src/utils/formValidationSchema.ts`: Yup schemas for forms
- `src/utils/getGeoLocation.ts`: Geolocation logic
- `src/utils/fetchWeatherData.ts`: Fetches weather data
- `src/utils/getLiveTime.ts`: Real-time clock utility
- `src/App.tsx`: Routing and layout management

---

## 📝 License

This project is licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.

---

> Questions or issues? Feel free to [open an issue](https://github.com/yourusername/global-herald/issues) on GitHub.
