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

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

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
}));


export default function Step3(props) {
  const handleSubmitFile = async () => {
    try {
      if (!previewSource) return;
      uploadImage(previewSource);
    }
    catch (err) {
      console.log(err)
    }
  }
  const uploadImage = async (base64EncodedImage) => {
    try {

      setPostad({
        ...postAd,
        ["image"]: base64EncodedImage,


      })
      props.handleNext();
    }
    catch (error) {
      console.log(error);
    }

  }
  const handleFileInputChange = (e) => {
    try {
      const file = e.target.files[0];
      previewFile(file);
    }
    catch (err) {
      console.log(err)
    }
  };
  const previewFile = (file) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
      }
    }
    catch (err) {
      console.log(err)
    }

  }
  const [previewSource, setPreviewSource] = useState('');



  const { postAd, setPostad } = useContext(PostAdContext);

  const classes = useStyles();
  const { handleSubmit, register, errors } = useForm();




  useEffect(() => {
    try {
      const loadOldDetails = async () => {

        setPreviewSource(postAd.image);

      };
      loadOldDetails();
    }
    catch (err) {
      console.log(err)
    }
  }, []);
  return (
    <React.Fragment>

      <form noValidate onSubmit={handleSubmit(handleSubmitFile)}>
        <Grid container spacing={6}>


          <Grid item xs={12}>
            <input type="file" title=" " onChange={handleFileInputChange} />

          </Grid>

          <Grid item xs={12} sm={12}>
            {previewSource && <img src={previewSource} alt="test" style={{maxHeight:'350px',objectFit:'cover',display:'block',marginLeft:'auto',marginRight:'auto'}}/>}
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