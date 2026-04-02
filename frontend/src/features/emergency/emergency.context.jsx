import { createContext, useState } from 'react';

export const EmergencyContext = createContext(null);

export function EmergencyProvider({ children }) {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [called, setCalled] = useState(false);
  const [userLocation, setUserLocation] = useState([28.6139, 77.2090]);

  return (
    <EmergencyContext.Provider value={{
      hospitals, setHospitals,
      loading, setLoading,
      called, setCalled,
      userLocation, setUserLocation
    }}>
      {children}
    </EmergencyContext.Provider>
  );
}
