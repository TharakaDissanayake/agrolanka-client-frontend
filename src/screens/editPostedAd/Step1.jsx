import React, { useContext, useEffect, useState } from 'react';
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
import UserContext from "../../context/UserContext";
import { InputLabel } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
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


export default function Step1(props) {
  // const { handleSubmit, register, errors } = useForm();

  const validate = () => {
    setNameErr("");
    setQtyErr("");
    setTelErr("");
    setTel2Err("");
    setUnitErr("");
    setPriceErr("");
    let nameErr = "";
    let qtyErr = "";
    let telErr = "";
    let tel2Err = "";
    let unitErr = "";
    let priceErr = "";

    if (name.trim() === "") {
      nameErr = "Required";
    }
    if (name.trim().length < 3) {
      nameErr = "Title should more than 2 characters";
    }
    if (name.trim().length > 25) {
      nameErr = "Title should less than 25 characters";
    }
    if (price.trim() === "") {
      priceErr = "Required";
    }
    if (unit.trim() === "") {
      unitErr = "Required";
    }
    if (qty.trim() === "") {
      qtyErr = "Required";
    }
    if (tel.trim() === "") {
      telErr = "Required";
    }
    if (isNaN(tel.trim())) {
      telErr = "Contact name should be like 07XXXXXXXX";
    }
    if (isNaN(tel2.trim())) {
      tel2Err = "Contact name should be like 07XXXXXXXX";
    }
    if (tel.trim().length !== 10) {
      telErr = "Contact name should be like 07XXXXXXXX";
    }
    if (tel2.trim().length > 0 && tel2.trim().length !== 10) {
      tel2Err = "Contact name should be like 07XXXXXXXX";
    }



    if (nameErr) {
      setNameErr(nameErr);
      return false;
    }
    if (priceErr) {
      setPriceErr(priceErr);
      return false;
    }
    if (unitErr) {
      setUnitErr(unitErr);
      return false;
    }
    if (qtyErr) {
      setQtyErr(qtyErr);
      return false;
    }
    if (telErr) {
      setTelErr(telErr);
      return false;
    }

    if (tel2Err) {
      setTel2Err(tel2Err);
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
          ["publisher"]: userData.user.id,
          ["name"]: name,
          ["qty"]: qty,
          ["tel"]: tel,
          ["tel2"]: tel2,
          ["price"]: price,
          ["unit"]: unit

        })
        setNameErr("");
        setQtyErr("");
        setTelErr("");
        setTel2Err("");
        setUnitErr("");
        setPriceErr("");
        props.handleNext();
      }
    }
    catch (err) {
      console.log(err)
    }

  }
  const { userData, setUserData } = useContext(UserContext);
  const { postAd, setPostad } = useContext(PostAdContext);

  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [tel, setTel] = useState("");
  const [tel2, setTel2] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [qtyErr, setQtyErr] = useState("");
  const [telErr, setTelErr] = useState("");
  const [tel2Err, setTel2Err] = useState("");
  const [unitErr, setUnitErr] = useState("");
  const [priceErr, setPriceErr] = useState("");
  const classes = useStyles();
  const list = ['g', 'Kg', 'units', 'liter', 'ml'];





  useEffect(() => {
    try {
      const loadOldDetails = async () => {

        setName(postAd.name);
        setPrice(postAd.price);
        setQty(postAd.qty);
        setTel(postAd.tel);
        setTel2(postAd.tel2);
        setUnit(postAd.unit);
      };
      loadOldDetails();
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
          <h6 style={{color:'#069c54'}}>Type your advertisement title here</h6>
            <TextField
              required
              id="name"
              name="name"
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              label=""
              fullWidth
              autoComplete="name"
            />

            {<Typography variant="body2" color="error">{nameErr}</Typography>}
          </Grid>
          <Grid item xs={6} sm={7} md={8}>
          <h6 style={{color:'#069c54'}}>Price for 1 unit</h6>
            <TextField
              required
              id="price"
              type="number"
              name="price"
              label=""
              fullWidth
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
              autoComplete="price"
            />
            {<Typography variant="body2" color="error">{priceErr}</Typography>}
          </Grid>
          <Grid item xs={6} sm={5} md={4}>
          <h6 style={{color:'#069c54'}}>Unit</h6>
            <TextField
              id="unit"
              select
              name="unit"
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}
              label=""
              value={unit}
              onChange={(event) => {
                setUnit(event.target.value);
              }}
              helperText="please select a price unit"
            >
              {list.map((unit) => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </TextField>
            {<Typography variant="body2" color="error">{unitErr}</Typography>}
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
          <h6 style={{color:'#069c54'}}>Quantity</h6>
            <TextField
              required
              id="quantity"
              name="quantity"
              type="number"
              label=""
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}
              value={qty}
              onChange={(event) => {
                setQty(event.target.value);
              }}
              fullWidth
              autoComplete="quantity"
            />
            {<Typography variant="body2" color="error">{qtyErr}</Typography>}
          </Grid>

          <Grid item xs={12} sm={6}>
          <h6 style={{color:'#069c54'}}>Contact No</h6>
            <TextField
              required
              id="tel"
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}
              type="number"
              name="tel"
              value={tel}
              onChange={(event) => {
                setTel(event.target.value);
              }}

              fullWidth
              autoComplete="tel"
            />
            {<Typography variant="body2" color="error">{telErr}</Typography>}

          </Grid>
          <Grid item xs={12} sm={6}>
          <h6 style={{color:'#069c54'}}>Contact No(additional)</h6>
            <TextField
              required
              id="tel2"
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}
              type="number"
              name="tel2"

              label=""
              value={tel2}
              onChange={(event) => {
                setTel2(event.target.value);
              }}
              fullWidth
              autoComplete="tel2"
            />
            {<Typography variant="body2" color="error">{tel2Err}</Typography>}
          </Grid>
          <Grid item xs={6} sm={6}></Grid>
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