import React, { useState, useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import { MenuItem, Button } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import MapInterface from "../../components/postAd/MapInterface";
import PostAdContext from "../../context/PostAdContext";

const useStyles = makeStyles((theme) => ({

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));


export default function Step4(props) {
  const { postAd, setPostad } = useContext(PostAdContext);
  const [place, setPlace] = useState({
    placeAddress: "Please Select Your Location",

    placeState: "",
  });
  const [marker, setMarker] = useState({
    lat: 7.291418,
    lng: 80.636696,
  });

  const handleMarker = (marker) => {
    setMarker(marker);
  };
  const handlePlace = (place) => {
    setPlace(place);
  };
  const classes = useStyles();



  const onSubmit = (event) => {
    try {
      setPostad({
        ...postAd,
        ["lat"]: marker.lat,
        ["lng"]: marker.lng,
        ["address"]: place.placeAddress,
        ["province"]: place.placeState,


      })
      props.handleNext();
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    try {
      const loadOldDetails = async () => {

        setMarker({
          lat: postAd.lat,
          lng: postAd.lng
        });
        setPlace({
          placeAddress: postAd.address,
          placeState: postAd.province

        })
      };
      loadOldDetails();
    }
    catch (err) {
      console.log(err)
    }
  }, []);
  return (
    <React.Fragment>


      <Grid container spacing={6}>


        <Grid item xs={12}>
          <MapInterface
            handleMarker={handleMarker}
            handlePlace={handlePlace}
            place={place}
            marker={marker}
          />
        </Grid>




        <Grid item xs={6} sm={6}>

          <Button
            onClick={() => props.handleBack()}
            fullWidth
            variant="contained"

            className={classes.button}
          >
            <Typography variant="h6" color="inherit">Back</Typography>
          </Button>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Button
            type="submit"
            fullWidth
            onClick={() => onSubmit()}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            <Typography variant="h6" color="inherit">Next</Typography>
          </Button>
        </Grid>

      </Grid>

    </React.Fragment>
  );
}