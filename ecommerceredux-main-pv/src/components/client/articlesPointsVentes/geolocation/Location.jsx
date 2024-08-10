import { useEffect, useState } from 'react';
import './styleLocation.css';
import MapLeaflet from './MapLeaflet';
import axios from "axios";
import {  useParams} from 'react-router-dom';

function Location() {

  const {id} = useParams();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
const tab=[]
    axios.get('http://localhost:3002/api/articles/art/points/'+ id)
    .then((res) => {
     
        res.data.depotID.map((item) => {
          tab.push(item.pointsvente)
        })
      
        setLocations(tab || []);
     
  })
  .catch((error) => {
      console.error("Error fetching locations:", error);
  });
  }, []);


  return (
    <div className="leaflet-container">
      {locations.length > 0 ? (
        <MapLeaflet locations={locations} />
      ) : (
        <p>Loading locations...</p>
      )}
    </div>
  );
}

export default Location;