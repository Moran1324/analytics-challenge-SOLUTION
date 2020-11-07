import React from "react";
import { GoogleMap, LoadScript, Marker, MarkerClusterer } from "@react-google-maps/api";
import { Event } from "../models/event";

interface Props {
  data: Event[];
}

const containerStyle = {
  width: "90%",
  height: "400px",
};

const center = {
  lat: 30,
  lng: 32,
};

const MapsTile: React.FC<Props> = ({ data }) => {
  const MAPS_API_KEY = "AIzaSyAiyg0IOmHpWDcDaC2Ty4JR7uy2rO4dFw4";

  return (
    <div>
      <LoadScript googleMapsApiKey={MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={1.1}>
          <MarkerClusterer gridSize={60}>
            {(clusterer) =>
              data &&
              data.map((obj: Event) => {
                return (
                  <Marker
                    position={obj.geolocation.location}
                    key={obj.date}
                    clusterer={clusterer}
                  />
                );
              })
            }
          </MarkerClusterer>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapsTile;
