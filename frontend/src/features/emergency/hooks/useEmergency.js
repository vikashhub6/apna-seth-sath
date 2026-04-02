import { useContext, useEffect } from 'react';
import { EmergencyContext } from '../emergency.context';
import { fetchNearbyHospitals } from '../services/emergency.api';

export const useEmergency = () => {
  const context = useContext(EmergencyContext);
  if (!context) throw new Error('useEmergency must be used within EmergencyProvider');

  const { hospitals, setHospitals, loading, setLoading, 
          called, setCalled, userLocation, setUserLocation } = context;

  useEffect(() => {
    fetchNearbyHospitals()
      .then(data => setHospitals(data))
      .catch(() => {})
      .finally(() => setLoading(false));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        () => {}
      );
    }
  }, []);

  const handleEmergencyCall = () => {
    setCalled(true);
    setTimeout(() => setCalled(false), 4000);
    window.location.href = 'tel:108';
  };

  return { hospitals, loading, called, userLocation, handleEmergencyCall };
};