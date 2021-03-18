import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { List, Button } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import PostAdContext from "../../context/PostAdContext";
import UserContext from "../../context/UserContext";
import SingleMapComponent from '../../components/singleAdMenu/SingleMapComponent';
import Axios from "axios";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import baseUrl from '../../config/api';
// const products = [
//   { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
//   { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
//   { name: 'Product 3', desc: 'Something else', price: '$6.51' },
//   { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
//   { name: 'Shipping', desc: '', price: 'Free' },
// ];
// const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
// const payments = [
//   { name: 'Card type', detail: 'Visa' },
//   { name: 'Card holder', detail: 'Mr John Smith' },
//   { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
//   { name: 'Expiry date', detail: '04/2024' },
// ];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    // marginTop: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function Review(props) {
  const [openBackdrop, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(true);
  };

  const classes = useStyles();
  const [submitClicked, setSubmitClicked] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  const { postAd, setPostad } = useContext(PostAdContext);
  const onSubmit = async () => {

    try {
      handleClose();
      setSubmitClicked(true);
      const updateAdd = {
        publisher: postAd.publisher,
        name: postAd.name,
        price: postAd.price,
        image: postAd.image,
        image_id: postAd.image_id,
        tel: postAd.tel,
        qty: postAd.qty,
        location: postAd.location,
        lat: postAd.lat,
        lng: postAd.lng,
        province: postAd.province,
        address: postAd.address,
        description: postAd.description,
        selectedCategory: postAd.category,
        count: postAd.count,
        tel2: postAd.tel2,
        category: postAd.category,
        unit: postAd.unit,
        promoted: postAd.promoted,
        published: true
      };
      console.log(updateAdd);

      await Axios.post(baseUrl + "advertisements/update/" + props.match.params.id, updateAdd);

    }
    catch (err) {
      //  alert("something went wrong.Try Again!!!")
      console.log(err)
    }
    props.handleNext();

  }
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} >
          <Typography variant="h5" >
            Advertisement summary
      </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          {postAd.image && <img src={postAd.image} alt="test" style={{ width: '100%' }} />}
        </Grid>
        <Grid item xs={12} lg={4}>
          <Typography variant="h6" gutterBottom color="textSecondary" className={classes.title}>Advertisement Title</Typography>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Typography gutterBottom variant="h6" color="primary">{postAd.name}</Typography>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Typography variant="h6" gutterBottom color="textSecondary" className={classes.title}>Category</Typography>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Typography gutterBottom variant="h6" color="primary">{postAd.category}</Typography>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Typography variant="h6" gutterBottom color="textSecondary" className={classes.title}>Location </Typography>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Typography gutterBottom variant="h6" color="primary">{postAd.location}</Typography>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Typography variant="h6" gutterBottom color="textSecondary" className={classes.title}>Price</Typography>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Typography gutterBottom variant="h6" color="primary">{postAd.price}</Typography>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Typography variant="h6" gutterBottom color="textSecondary" className={classes.title}>Available Quantity </Typography>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Typography gutterBottom variant="h6" color="primary">{postAd.qty}</Typography>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Typography variant="h6" gutterBottom color="textSecondary" className={classes.title}>Contact No </Typography>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Typography gutterBottom variant="h6" color="primary">{postAd.tel}</Typography>
          {postAd.tel2 &&
            <div>

              <Typography gutterBottom variant="h6" color="primary">{postAd.tel2}</Typography>
            </div>
          }
        </Grid>
        <Grid item xs={12} lg={4}>
          <Typography variant="h6" gutterBottom color="textSecondary" className={classes.title}>Description </Typography>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Typography gutterBottom variant="h6" color="primary">{postAd.description}</Typography>
        </Grid>
        {postAd.province !== "Please Select Your Location" &&

          <Grid item container spacing={2}>
            <Grid item xs={12} lg={4}>
              <Typography variant="h6" gutterBottom color="textSecondary" className={classes.title}>Address </Typography>
            </Grid>
            <Grid item xs={12} lg={8}>
              <Typography gutterBottom variant="h6" color="primary">{postAd.address}</Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography variant="h6" gutterBottom color="textSecondary" className={classes.title}>Province </Typography>
            </Grid>
            <Grid item xs={12} lg={8}>
              <Typography gutterBottom variant="h6" color="primary">{postAd.province}</Typography>
            </Grid>
            <Grid item xs={12}>
              <SingleMapComponent product={postAd} {...props} />
            </Grid>
          </Grid>

        }
      </Grid>







      {/* {products.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
        
          </ListItem>
        ))} */}
      {/* <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $34.06
          </Typography>
        </ListItem>
      </List> */}


      <Grid container spacing={5}>
        {/* <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid> */}
        {/* <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
             
              </React.Fragment>
            ))}
          </Grid>
  
        </Grid> */}
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
            disabled={submitClicked}
            onClick={() => onSubmit()}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            <Typography variant="h6" color="inherit">Update</Typography>
          </Button>
        </Grid>
      </Grid>
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
}