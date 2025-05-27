// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { AuthProvider } from './context/AuthContext'; // Make sure the path is correct

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // your AuthProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>      {/* Wrap your app in BrowserRouter */}
      <AuthProvider>     {/* And AuthProvider inside */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
