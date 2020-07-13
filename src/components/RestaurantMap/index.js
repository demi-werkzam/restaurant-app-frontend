import React, { useState } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

import "./index.css";

export default function RestaurantMap(props) {
  const { id, latitude, longitude } = props;
  return (
    <Map center={[52.370216, 4.895168]} zoom={12}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[latitude, longitude]} />
    </Map>
  );
}
