import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { route } from './routes/route.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast'


const queryClient = new QueryClient()



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />

        <RouterProvider router={route}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>

  </StrictMode>,
)
