import { createContext, useContext, useState, useCallback } from 'react'
import { apiService } from '../services/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('ssk-user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const [token, setToken] = useState(() => {
    return localStorage.getItem('ssk-token') || null
  })

  const login = useCallback((newToken, userData) => {
    localStorage.setItem('ssk-token', newToken)
    localStorage.setItem('ssk-user', JSON.stringify(userData))
    setToken(newToken)
    setUser(userData)
  }, [])

  const logout = useCallback(async () => {
    try {
      await apiService.auth.logout()
    } catch {
      // ignore errors on logout
    } finally {
      localStorage.removeItem('ssk-token')
      localStorage.removeItem('ssk-user')
      setToken(null)
      setUser(null)
    }
  }, [])

  const isAuthenticated = Boolean(token && user)

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
