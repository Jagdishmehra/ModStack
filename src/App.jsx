import './App.css'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NotesProvider } from './context/NotesContext'
import Home from './pages/Home'
import NotesApp from './pages/NotesApp'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'

function App() {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN || "dev-pouq2mfoxifc4e1g.us.auth0.com"}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID || "smp2hmkhHihH1mkzgQjqzpwlsXdEQ3fM"}
      authorizationParams={{
        redirect_uri:  "http://localhost:5173/"
      }}
      cacheLocation="localstorage"
    >
      <NotesProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-grow container mx-auto px-4 py-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/notes" element={
                  <ProtectedRoute>
                    <NotesApp />
                  </ProtectedRoute>
                } />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </NotesProvider>
    </Auth0Provider>
  )
}

export default App
