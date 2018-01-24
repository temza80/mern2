import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
   center={{ lat: props.coords.lat, lng: props.coords.lon }}
    panTo={{ lat: props.coords.lat, lng: props.coords.lon }}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.coords.lat, lng: props.coords.lon }} title={props.coords.name}/>}
  </GoogleMap>

))

export default MyMapComponent;