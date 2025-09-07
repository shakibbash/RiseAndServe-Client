import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/Routes";
import AuthProvider from "./Provider/AuthProvider";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./Provider/ThemeContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <HelmetProvider>
          <ThemeProvider>
             <AuthProvider>
  
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: '8px',
              fontWeight: '500',
              padding: '12px 16px',
              fontSize: '15px',
              boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
            },
            success: {
              style: {
                background: '#22c55e',
                color: '#f0fdf4',
              },
              iconTheme: {
                primary: '#bbf7d0',
                secondary: '#166534',
              },
            },
            error: {
              style: {
                background: '#ef4444',
                color: '#fff1f2',
              },
              iconTheme: {
                primary: '#fecaca',
                secondary: '#7f1d1d',
              },
            },
          }}
        />

    </AuthProvider>
          </ThemeProvider>
                    
        </HelmetProvider>

    
    </StrictMode>
);
