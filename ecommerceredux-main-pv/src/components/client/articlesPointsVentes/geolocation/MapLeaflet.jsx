import React from "react";
import { MapContainer, TileLayer, Marker , Popup } from 'react-leaflet';

function MapLeaflet({locations}) {

  return (
    <MapContainer center={[locations[0].latitude, locations[0].longitude]} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    {
        locations && locations.map((item,ind)=>{ 
        return  <Marker position={[item.latitude, item.longitude]} key={ind}>
        <Popup>
        <img src={item.photo} width={50} height={50} alt={item.name}/>
        <br/> 
        {item.name} <br/> {item.description} 
        </Popup>
      </Marker> 
        })
    }
   
  </MapContainer>
  );
}

export default MapLeaflet;
