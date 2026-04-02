import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const hospitalIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function EmergencyMap({ userLocation, hospitals }) {
  return (
    <div className="card overflow-hidden">
      <div style={{ height: '350px', zIndex: 1 }}>
        <MapContainer center={userLocation} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Circle center={userLocation} radius={300} color="blue" fillColor="blue" fillOpacity={0.2}>
            <Popup>📍 Your Location</Popup>
          </Circle>
          {hospitals.map((h, i) => {
            const offset = (i + 1) * 0.005;
            const pos = [userLocation[0] + offset, userLocation[1] + offset];
            return (
              <Marker key={h._id} position={pos} icon={hospitalIcon}>
                <Popup>
                  <strong>{h.name}</strong><br />
                  {h.type}<br />
                  📍 {h.distance}<br />
                  ⏱ {h.wait} wait
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-1">📍 Live Area Map</h3>
        <p className="text-muted text-sm">Showing your location and nearby hospitals</p>
      </div>
    </div>
  );
}