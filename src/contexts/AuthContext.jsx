import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);

  // Function to decode JWT token to get user info
  const decodeToken = (token) => {
    try {
      // For PASETO tokens, we can't decode like JWT, but we can store user info separately
      // For now, we'll store user info when logging in
      const userInfo = localStorage.getItem('userInfo');
      return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  useEffect(() => {
    // Check if user is logged in when component mounts
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      const userInfo = decodeToken(storedToken);
      setUser(userInfo);
    }
    setLoading(false);
  }, []);

  const login = (token, userData = null) => {
    localStorage.setItem('authToken', token);
    if (userData) {
      localStorage.setItem('userInfo', JSON.stringify(userData));
      setUser(userData);
    }
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!token;
  };

  const getUserRole = () => {
    return user?.role || null;
  };

  const isAdmin = () => {
    return getUserRole() === 'admin';
  };

  const isUser = () => {
    return getUserRole() === 'user';
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated,
    getUserRole,
    isAdmin,
    isUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
