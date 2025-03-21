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
      domain={"https://dev-pouq2mfoxifc4e1g.us.auth0.com"}
      clientId={"smp2hmkhHihH1mkzgQjqzpwlsXdEQ3fM"}
      authorizationParams={{
        redirect_uri: "https://symphonious-pegasus-dafca0.netlify.app/"
      }}
      cacheLocation="localstorage"
    >
      <NotesProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 flex flex-col">
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
            <footer className="bg-white py-4 border-t border-gray-200">
              <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} NotesApp. All rights reserved.
              </div>
            </footer>
          </div>
        </BrowserRouter>
      </NotesProvider>
    </Auth0Provider>
  )
}

export default App
