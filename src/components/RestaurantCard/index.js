import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

import "./index.css";

export default function RestaurantCard(props) {
  const { id, name, address, longitude, latitude } = props.data;
  const history = useHistory();

  const goToRestaurant = () => {
    history.push(`/restaurants/${id}`);
  };

  return (
    <Map center={[52.370216, 4.895168]} zoom={12}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[latitude, longitude]} onClick={goToRestaurant} />
    </Map>
  );
}
