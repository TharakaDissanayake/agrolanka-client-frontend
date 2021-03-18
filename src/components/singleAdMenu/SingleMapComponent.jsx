import React, { useState } from "react";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

//function to show google map

//wrapping Map with sevaral component to work properly

//main function
function SingleMapComponent(props) {
  const WrappedMap = withScriptjs(
    withGoogleMap(function Map() {
      //hooks state for selectedMarker to dispaly detais when click the position
      const [selectedMarker, setSelectedMarker] = useState(null);
      return (
        <GoogleMap
          defaultZoom={11}
          defaultCenter={{ lat: props.product.lat, lng: props.product.lng }}
        >

          <Marker
            key={props.product._id}
            position={{
              lat: props.product.lat,
              lng: props.product.lng,
            }}

            onClick={() => {
              setSelectedMarker(props.product);
            }}
          />

          {selectedMarker && (
            <InfoWindow
              position={{
                lat: selectedMarker.lat,
                lng: selectedMarker.lng,
              }}
              onCloseClick={() => {
                setSelectedMarker(null);
              }}
            >
              <div>

                <h6>{selectedMarker.address}</h6>

              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      );
    })
  );
  return (
    <div style={{ width: "100%", height: "60vh" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDUO8QmBhQBfZOdlDT5xlG3mxLM_Y2jDMc&v=3.exp&libraries=geometry,drawing,places`}
        //set shown elements when map is loaded.
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  );
}

export default SingleMapComponent;
