# Courier Tracker

A modern React application built with Vite, Tailwind CSS, and Ant Design for tracking courier packages.

## 🚀 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Ant Design** - React UI component library
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd courier-tracker
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

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Styling

This project uses both **Tailwind CSS** and **Ant Design** together:

### Tailwind CSS
- Utility-first CSS framework
- Responsive design utilities
- Custom component styling
- Hover effects and transitions

### Ant Design
- Pre-built React components
- Consistent design system
- Accessibility features
- Theme customization

### How They Work Together
- Tailwind classes can be applied to Ant Design components
- Custom styling with Tailwind utilities
- Ant Design provides the component structure
- Responsive design with Tailwind's grid system

## 📁 Project Structure

```
courier-tracker/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Custom styles
│   ├── index.css        # Tailwind directives
│   └── main.jsx         # Application entry point
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
├── package.json
└── README.md
```

## 🔧 Configuration Files

### Tailwind CSS (`tailwind.config.js`)
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### PostCSS (`postcss.config.js`)
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 🎯 Features Demonstrated

- **Responsive Layout**: Mobile-first design with Tailwind's responsive utilities
- **Component Integration**: Ant Design components with Tailwind styling
- **Interactive Elements**: Counter with state management
- **Modern UI**: Gradient backgrounds, shadows, and hover effects
- **Navigation**: Header with menu items using Ant Design Menu component

## 🚀 Deployment

Build the project for production:
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 📝 Customization

### Adding New Tailwind Classes
Tailwind CSS is configured to scan all your React components. Any new utility classes you use will be automatically included in the build.

### Ant Design Theme
You can customize Ant Design's theme by modifying the component props or creating a custom theme configuration.

### Adding New Components
1. Create new components in the `src/` directory
2. Import Ant Design components as needed
3. Apply Tailwind classes for custom styling
4. Import and use in your App.jsx

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
