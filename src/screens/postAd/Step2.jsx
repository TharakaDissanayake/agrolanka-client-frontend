import React, { useEffect, useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import { MenuItem, Button } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import PostAdContext from "../../context/PostAdContext";
import InputLabel from '@material-ui/core/InputLabel';
import Axios from "axios";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import baseUrl from '../../config/api';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    Width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  placeholder: {
    fontSize: 50
  },
  //style for font size
  resize: {
    fontSize: 18
  },
}));


export default function Step2(props) {

  const [categories, setCategories] = useState({
    categoriesList: [],
  });

  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [locationErr, setLocationErr] = useState("");
  const [categoryErr, setCategoryErr] = useState("");
  const [descriptionErr, setDescriptionErr] = useState("");
  const { postAd, setPostad } = useContext(PostAdContext);

  const classes = useStyles();

  const districts = ['Ampara',
    'Anuradhapura',
    'Badulla',
    'Batticaloa',
    'Colombo',
    'Galle',
    'Gampaha',
    'Hambantota',
    'Jaffna',
    'Kalutara',
    'Kandy',
    'Kegalle',
    'Kilinochchi',
    'Kurunegala',
    'Mannar',
    'Matale',
    'Matara',
    'Monaragala',
    'Mullativu',
    'Nuwara_Eliya',
    'Polonnaruwa',
    'Puttalam',
    'Ratnapura',
    'Trincomalee',
    'Vavuniya',];
  const validate = () => {
    setDescriptionErr("");
    setLocationErr("");
    setCategoryErr("");

    let descriptionErr = "";
    let locationErr = "";
    let categoryErr = "";


    if (description.trim() === "") {
      descriptionErr = "Required";
    }

    if (description.trim().length < 3) {
      descriptionErr = "description should more than 2 characters";
    }
    if (location.trim() === "") {
      locationErr = "Required";
    }

    if (category.trim() === "") {
      categoryErr = "Required";
    }




    if (descriptionErr) {
      setDescriptionErr(descriptionErr);
      return false;
    }
    if (locationErr) {
      setLocationErr(locationErr);
      return false;
    }
    if (categoryErr) {
      setCategoryErr(categoryErr);
      return false;
    }

    return true;
  }
  const onSubmit = (event) => {
    try {
      event.preventDefault();
      const isValid = validate();
      if (isValid) {
        setPostad({
          ...postAd,
          ["description"]: description,
          ["location"]: location,
          ["category"]: category,

        })

        setDescriptionErr("");
        setLocationErr("");
        setCategoryErr("");

        props.handleNext();
      }
    }
    catch (err) {
      console.log(err);
    }

  }

  useEffect(() => {
    try {
      const renderSelect = async () => {

        setLocation(postAd.location);
        setDescription(postAd.description);
        setCategory(postAd.category);

        Axios.get(baseUrl + "categories/")
          .then((response) => {
            if (response.data.length > 0) {
              setCategories({
                categoriesList: response.data.map(
                  (category) => category.label
                ),
              });
              //setCategory(response.data[0].category);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
      renderSelect();
    }
    catch (err) {
      console.log(err)
    }
  }, []);
  return (
    <React.Fragment>

      <form noValidate onSubmit={onSubmit}>
        <Grid container spacing={6}>


          <Grid item xs={12}>
            <h6>Type your advertisement description here</h6>
            <TextField
              multiline
              required

              id="description"
              name="description"
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}

              fullWidth
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              autoComplete="description"
            />
            {<Typography variant="body2" color="error">{descriptionErr}</Typography>}
          </Grid>

          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <h6>Select District</h6>
              <Select
                style={{ width: 180 }}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={location}

                onChange={(event) => {
                  setLocation(event.target.value);
                }}
              >
                {districts.map(district => {
                  return (<MenuItem key={district} value={district}>{district}</MenuItem>);

                })}


              </Select>
              <FormHelperText>Select your district     </FormHelperText>
              {<Typography variant="body2" color="error">{locationErr}</Typography>}
            </FormControl>

          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <h6>Select Category</h6>
              <Select
                style={{ width: 180 }}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={category}

                onChange={(event) => {
                  setCategory(event.target.value);
                }}
              >
                {categories.categoriesList.map(category => {
                  return (<MenuItem key={category} value={category}>{category}</MenuItem>);

                })}


              </Select>
              <FormHelperText>Select Your Category</FormHelperText>
              {<Typography variant="body2" color="error">{categoryErr}</Typography>}
            </FormControl>

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
              variant="contained"
              color="primary"
              className={classes.button}
            >
              <Typography variant="h6" color="secondary">Next</Typography>
            </Button>
          </Grid>

        </Grid>
      </form>
    </React.Fragment>
  );
}