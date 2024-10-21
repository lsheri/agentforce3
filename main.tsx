import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  } catch (error) {
    console.error('Failed to render the React app:', error);
    rootElement.innerHTML = `
      <div style="color: white; background-color: #282c34; padding: 20px; font-family: Arial, sans-serif;">
        <h1>Error Loading Application</h1>
        <p>An error occurred while loading the application. Please check the console for more details.</p>
        <pre style="background-color: #1e2127; padding: 10px; overflow: auto;">${error instanceof Error ? error.message : String(error)}</pre>
      </div>
    `;
  }
} else {
  console.error('Root element not found');
}