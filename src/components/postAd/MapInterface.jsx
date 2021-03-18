
import React, { useState } from "react";
import geocode from "react-geocode";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import "antd/dist/antd.css";
import { Descriptions } from "antd";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './MapStyle.css';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

import { useEffect } from "react";

const libraries = ["places"];
let center = {
  lat: 7.291418,
  lng: 80.636696,
};
const mapContainerStyle = {
  height: "60vh",
  width: "100%",
};
const useStyles = makeStyles((theme) => ({
  button: {
    height:'50px',
  },




}));
export default function MapInterface(props) {
  const classes = useStyles();
  geocode.setApiKey("AIzaSyDUO8QmBhQBfZOdlDT5xlG3mxLM_Y2jDMc");
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDUO8QmBhQBfZOdlDT5xlG3mxLM_Y2jDMc",
    libraries,
  });



  const getCity = (addressArray) => {
    try {
      let city = "";
      for (let index = 0; index < addressArray.length; index++) {
        if (
          addressArray[index].types[0] &&
          "administrative_area_level_2" === addressArray[index].types[0]
        ) {
          city = addressArray[index].long_name;

          return city;
        }
      }
    }
    catch (err) {
      console.log(err);
    }
  };
  const getArea = (addressArray) => {
    try {
      let area = "";
      for (let i = 0; i < addressArray.length; i++) {
        if (addressArray[i].types[0]) {
          for (let j = 0; j < addressArray[i].types.length; j++) {
            if (
              "sublocality_level_1" === addressArray[i].types[j] ||
              "locality" === addressArray[i].types[j]
            ) {
              area = addressArray[i].long_name;
              return area;
            }
          }
        }
      }
    }
    catch (err) {
      console.log(err);
    }
  };

  const getState = (addressArray) => {
    try {
      let state = "";
      for (let i = 0; i < addressArray.length; i++) {
        for (let i = 0; i < addressArray.length; i++) {
          if (
            addressArray[i].types[0] &&
            "administrative_area_level_1" === addressArray[i].types[0]
          ) {
            state = addressArray[i].long_name;
            return state;
          }
        }
      }
    }
    catch (err) {
      console.log(err)
    }
  };
  const getLocationAddress = (lat, lng) => {
    try {
      geocode.fromLatLng(lat, lng).then((Response) => {
        const address = Response.results[0].formatted_address,
          addressArray = Response.results[0].address_components,
          city = getCity(addressArray),
          area = getArea(addressArray),
          state = getState(addressArray);
        const placeObj = {
          placeAddress: address,
          placeCity: city,
          placeArea: area,
          placeState: state,
        };
        props.handlePlace(placeObj);

      });
    }
    catch (err) {
      console.log(err)
    }
  };



  const onMapClick = React.useCallback((e) => {
    const markerObj1 = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    props.handleMarker(markerObj1);


    getLocationAddress(e.latLng.lat(), e.latLng.lng());
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(13);
    const markerobj2 = {
      lat: lat,
      lng: lng,
    };
    props.handleMarker(markerobj2);

    getLocationAddress(lat, lng);
  }, []);
  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
  return (

    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <Search panTo={panTo} />
        </Grid>

        <Grid item xs={12} md={3}>

          <Locate panTo={panTo} />
        </Grid>
      </Grid>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} >
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={9}
              center={center}
              onClick={onMapClick}
              onLoad={onMapLoad}
            >
              <Marker
                key={`${props.marker.lat}-${props.marker.lng}`}
                position={{ lat: props.marker.lat, lng: props.marker.lng }}
                onDragEnd={onMapClick}
                draggable={true}
              >
                {/* <InfoWindow>
                  <div>
                    <h6>{props.place.placeAddress}</h6>
                    <h6>{props.place.placeCity}</h6>
                    <h6>{props.place.placeState}</h6>
                  </div>
                </InfoWindow> */}
              </Marker>
            </GoogleMap>
          </Grid>
        </Grid>
      </div>
      <div>
        <Descriptions title="Location Details" bordered>
          <Descriptions.Item label="Address" span={1}>
            {props.place.placeAddress}
          </Descriptions.Item>
          <Descriptions.Item label="District">
            {props.place.placeCity}
          </Descriptions.Item>

          <Descriptions.Item label="Province">
            {props.place.placeState}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
}
function Locate({ panTo }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>

      <div className="locationButton">
        <Button variant="contained" color="secondary" className={classes.button} startIcon={<LocationOnIcon />}
          onClick={() => {
            console.log("waiting while we find your location");
            navigator.geolocation.getCurrentPosition(
              (position) => {
                panTo({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                });
              },
              () => null
            );
          }}
        >
          Your Location
      {/* <img src="/compass.png" alt="compass" style={{ top: "3rem" }} /> */}
        </Button>
      </div>
    </div>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });



  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });

      const { lat, lng } = await getLatLng(results[0]);

      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

