import { useEffect, useState } from 'react';
import './styleLocation.css';
import MapLeaflet from './MapLeafletNearLocations';
import axios from "axios";

function NearLocations() {

  const [locations, setLocations] = useState([]);

  const[Latitude,setLatitude]=useState("")
  const[Longitude,setLongitude]=useState("")

  const [nearestLocation, setNearestLocation] = useState(null);

  useEffect(() => {

    axios.get('http://localhost:3002/api/locations')
      .then((res) => {
              setLocations(res.data);
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, []);

   //pour déterminer mon emplacement
   useEffect(() =>{
  /* navigator.geolocation.getCurrentPosition(function(position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      });*/
      axios.get('https://api.ipdata.co/?api-key=41a2d8598be579f01fa3839161f3c65f40cc8a881a79e6de3e70f99f').then((res) => {
        setLatitude(res.data.latitude);
        setLongitude(res.data.longitude);
      })
        
    },[]);


  // pour déterminer la position la plus
  useEffect(() => {
    if (Latitude !== null && Longitude !== null && locations.length > 0) {
      const nearest = locations.reduce((prev, curr) => { 
        const prevDistance = calculateDistance(Latitude, Longitude, prev.latitude, prev.longitude);
        const currDistance = calculateDistance(Latitude, Longitude, curr.latitude, curr.longitude);
        return prevDistance < currDistance ? prev : curr;
      }, locations[0]);

      setNearestLocation(nearest);
    }
  }, [Latitude, Longitude, locations]);
    
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <div className="leaflet-container">
      {locations.length > 0 ? (
        <MapLeaflet locations={locations} Latitude={Latitude} Longitude={Longitude} nearestLocation={nearestLocation} />
      ) : (
        <p>Loading locations...</p>
      )}
    </div>
  );
}

export default NearLocations;