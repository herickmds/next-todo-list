import { createContext, useContext, useState, useEffect } from 'react';
import { getUserInfo } from '../services/api/auth';  
 
const UserContext = createContext({ user: null, loading: true });

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  async function loadUser() {
    try {
      const userData = await getUserInfo(); 
      setUser(userData);
    } finally {
      setLoading(false);
    }
  }
   
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token){
      loadUser();
    } 
  }, [])
  
  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};