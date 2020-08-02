import React, { useState } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

import "./index.css";

export const icon = new Icon({
  iconUrl: "../../R.png",
  iconSize: [25, 25],
});

export default function RestaurantMap(props) {
  const { id, latitude, longitude } = props;
  return (
    <Map center={[latitude, longitude]} zoom={20}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[latitude, longitude]} icon={icon} />
    </Map>
  );
}
