# Recipe Sharing Platform

A modern, responsive web application for sharing and discovering recipes, built with React and Tailwind CSS.

## Project Description

This Recipe Sharing Platform allows users to browse recipes, view detailed recipe information, and submit new recipes. The application demonstrates the integration of React with Tailwind CSS for building responsive, visually appealing web interfaces.

## Technologies Used

- **React** 19.2.0 - JavaScript library for building user interfaces
- **Vite** 7.3.1 - Next-generation frontend build tool
- **Tailwind CSS** 3.4.1 - Utility-first CSS framework
- **PostCSS** 8.5.6 - Tool for transforming CSS with JavaScript
- **Autoprefixer** 10.4.24 - PostCSS plugin to parse CSS and add vendor prefixes

## Features

- Responsive design optimized for all devices
- Modern UI built with Tailwind CSS utility classes
- Fast development with Vite's Hot Module Replacement
- Component-based architecture with React

## Installation

### Prerequisites

- Node.js (version 14.18+ or 16+)
- npm or yarn

### Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/Loisyy/alx-fe-reactjs.git
cd alx-fe-reactjs/recipe-sharing-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure
```
recipe-sharing-platform/
├── src/
│   ├── App.jsx         # Main application component
│   ├── App.css         # Component styles
│   ├── main.jsx        # Application entry point
│   └── index.css       # Tailwind directives and global styles
├── public/             # Static assets
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── postcss.config.js   # PostCSS configuration
```

## Tailwind CSS Configuration

The project uses Tailwind CSS with the following configuration:

- **Content paths**: Scans `./src/**/*.{js,jsx,ts,tsx}` and `./index.html`
- **Theme**: Default Tailwind theme with customization options
- **Plugins**: Ready for additional Tailwind plugins

## Development

### Adding New Components

Create new React components in the `src/` directory and import them in `App.jsx`.

### Using Tailwind CSS

Use Tailwind utility classes directly in your JSX:
```jsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Hello World
</div>
```

### Hot Module Replacement

Changes to your code will automatically reload in the browser without losing application state.

## Building for Production
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Learning Objectives

This project demonstrates:

1. Setting up a React application with Vite
2. Installing and configuring Tailwind CSS
3. Using utility-first CSS methodology
4. Building responsive web interfaces
5. Modern React development practices

## License

This project is part of the ALX Software Engineering program.

## Author

**Nkeiru Lois**

GitHub: [@Loisyy](https://github.com/Loisyy)

## Acknowledgments

- ALX Africa for the project requirements and guidance
- Tailwind CSS team for the amazing framework
- React and Vite communities for excellent documentation