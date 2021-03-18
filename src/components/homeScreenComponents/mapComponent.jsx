import React, { useState } from "react";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    width: "100%"
  },
  iconButton: {
    padding: 10,
  },

}));

function MapComponent(props) {
  const WrappedMap = withScriptjs(
    withGoogleMap(function Map() {

      const classes = useStyles();
      const [selectedMarker, setSelectedMarker] = useState(null);
      const history = useHistory();
      return (
        <GoogleMap
          defaultZoom={8.2}
          defaultCenter={{ lat: 7.681532, lng: 80.697189 }}
        >
          {props.Adds.map((add) => (
            <Marker
              key={add._id}
              position={{
                lat: add.lat,
                lng: add.lng,
              }}
              onClick={() => {
                setSelectedMarker(add);
              }}
            />
          ))}
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
                <h5>{selectedMarker.name}</h5>
                <img
                  src={selectedMarker.image}
                  alt="test img"
                  width="250"
                  height="166"
                />

                <h6 style={{ marginTop: 10 }}>{selectedMarker.location} - {selectedMarker.category}</h6>
                <h6 style={{ marginTop: 10 }}>{selectedMarker.qty} Kg Available</h6>

                <h5 style={{ marginTop: 10 }}>1kg for Rs.{selectedMarker.price}.00</h5>

                <Button
                  variant="contained"
                  color="primary"

                  className={classes.button}
                  onClick={async () => {
                    await history.push(`/advertisements/${selectedMarker._id}`)
                  }}
                >
                  View
      </Button>

              </div>



            </InfoWindow>
          )}
        </GoogleMap>
      );
    })
  );
  return (
    <div style={{ width: "100%", height: "80vh" }}>
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

export default MapComponent;
