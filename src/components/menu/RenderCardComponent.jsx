

import "../../App.css";
// import './adMenu.css';

import { useHistory } from "react-router-dom";
import { dateCal } from '../../utills/dateCal';
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { shadows } from '@material-ui/system';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import NewReleasesTwoToneIcon from '@material-ui/icons/NewReleasesTwoTone';
import axios from "axios";
import UserContext from "../../context/UserContext";
import PostAdContext from "../../context/PostAdContext";
import baseUrl from "../../config/api";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({

  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  card: {
    borderRadius: 15,

  },





}));

const RenderCard = (props) => {
  const [openPromote, setOpenPromote] = React.useState(false);

  const handlePromoteOpen = () => {
    setOpenPromote(true);
  };
  const handlePromoteClose = () => {
    setOpenPromote(false);
  };

  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClickDeleteOpen = () => {
    setOpenDelete(true);
  };
  const handleEdit = async (Add) => {
    try {
      axios.get(baseUrl + "advertisements/" + Add._id)
        .then((response) => {
          console.log(response)
          setPostad({
            address: response.data.address,
            qty: response.data.qty.toString(),
            name: response.data.name,
            tel: response.data.tel,
            tel2: response.data.tel2,
            price: response.data.price.toString(),
            promoted: response.data.promoted,
            count: response.data.count,
            publisher: response.data.publisher._id,
            description: response.data.description,
            location: response.data.location,
            category: response.data.category,
            unit: response.data.unit,
            image: response.data.image,
            lat: response.data.lat,
            lng: response.data.lng,
            address: response.data.address,
            province: response.data.province,
          });

        }).then(() => { history.push(`/edit/${Add._id}`); }
        )
    }
    catch (err) {
      console.log(err)
    }


  }

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };
  const handleDelete = () => {
    try {
      axios
        .delete(
          baseUrl + "advertisements/delete/" + props.Adds._id + "/" + props.Adds.image_id
        )

        .then((response) => {
          setOpenDelete(false);
          props.loadFunc();
        })
    }
    catch (err) {
      console.log(err);
    }
  };
  const { postAd, setPostad } = useContext(PostAdContext);
  const { userData, setUserData } = useContext(UserContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [publisherAdsCount, setPublisherAdsCount] = React.useState();
  const handlePublisherOpen = () => {
    try {
      setOpen(true);
      axios
        .get(
          baseUrl + "advertisements/ads/member/count",

          {
            headers: {
              publisher: props.Adds.publisher._id,

            },

          }
        )
        .then((response) => {


          setPublisherAdsCount(response.data);


        })
        .catch((error) => {
          console.log(error);
        });
    }
    catch (err) {
      console.log(err);
    }

  };


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handlePublisherClose = () => {
    setOpen(false);

  };
  // const handleToken = (token) => {
  //   console.log({ token })
  // }
  const handleToken = (product) => {
    window.payhere.onCompleted = function onCompleted(orderId) {

      axios.get(baseUrl + "advertisements/" + product._id).then((response) => {

        const newAdd = {
          publisher: response.data.publisher._id,
          name: response.data.name,
          price: response.data.price,
          image: response.data.image,
          image_id: response.data.image_id,
          tel: response.data.tel,
          tel2: response.data.tel2,
          unit: response.data.unit,
          qty: response.data.qty,
          location: response.data.location,
          lat: response.data.lat,
          lng: response.data.lng,
          province: response.data.province,
          address: response.data.address,
          promoted: true,
          published: response.data.published,
          description: response.data.description,
          selectedCategory: response.data.category,
          count: parseInt(response.data.count),

        };

        axios.post(baseUrl + "advertisements/update/" + response.data._id, newAdd)

      }).then(() => {
        props.loadFunc();
      })
    };

    // Called when user closes the payment without completing
    window.payhere.onDismissed = function onDismissed() {
      //Note: Prompt user to pay again or show an error page
      toast("Payment dismissed", { type: 'error' })

    };

    // Called when error happens when initializing payment such as invalid parameters
    window.payhere.onError = function onError(error) {
      // Note: show an error page
      toast("Error:" + error, { type: 'error' })

    };
    var payment = {
      "sandbox": true,
      "merchant_id": "1216688",    // Replace your Merchant ID
      "return_url": 'https://fathomless-brushlands-17933.herokuapp.com/',     // Important
      "cancel_url": 'https://fathomless-brushlands-17933.herokuapp.com/',     // Important
      "notify_url": "https://fathomless-brushlands-17933.herokuapp.com/",
      "order_id": product._id,
      "items": product.name,
      "amount": "100.00",
      "currency": "LKR",
      "first_name": userData.user.firstname,
      "last_name": userData.user.lastname,
      "email": userData.user.email,
      "phone": userData.user.tel,
      "address": "No.1, Galle Road",
      "city": "Colombo",
      "country": "Sri Lanka",
      "delivery_address": "No. 46, Galle road, Kalutara South",
      "delivery_city": "Kalutara",
      "delivery_country": "Sri Lanka",
      "custom_1": "",
      "custom_2": "",

    };

    window.payhere.startPayment(payment);

  }
  const history = useHistory();
  const Add = props.Adds;


  let diffString = `Published ${dateCal(Add.createdAt)} by ${Add.publisher.firstname}`;


  return (


    <div className="col-sm-6 col-md-4 col-lg-4 mt-4 mb-4" key={Add._id} >



      <Grid item  >
        <ToastContainer />
        <Card variant="outlined" classes={{ root: classes.card }} >
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" style={{ cursor: "pointer" }} className={classes.avatar} onClick={handlePublisherOpen}></Avatar>
            }
            action={
              <IconButton aria-label="settings">
                {Add.promoted ? <div><span class="badge badge-pill badge-warning">PROMOTED</span></div> : null}

              </IconButton>
            }


            title={
              <Typography gutterBottom variant="h6" color="textPrimary" component="h5" >{Add.name}</Typography>}
            subheader={diffString} />

          <CardMedia style={{ cursor: "pointer" }} onClick={async () => {
            await history.push(`/advertisements/${Add._id}`);
            await props.loadFunc();

          }}
            className={classes.media}
            image={Add.image}
            title={Add.name}
          />
          <CardContent style={{ cursor: "pointer" }}
          // onClick={async()=>{
          //        await history.push(`/advertisements/${Add._id}`);

          //        await props.loadFunc();
          //     }}
          >
            <Typography variant="h6" gutterBottom color="textSecondary" component="p">
              {Add.location}  - {Add.category}
            </Typography>
            {Add.unit === 'units' ? <Typography variant="h6" gutterBottom color="textPrimary" component="h5">
              1 unit for Rs. {Add.price}

            </Typography> : <Typography variant="h6" gutterBottom color="textPrimary" component="h5">
                1 {Add.unit} for Rs. {Add.price}

              </Typography>}


            <Typography variant="h6" color="textSecondary" gutterBottom component="h5">
              {Add.qty} {Add.unit} Available
        </Typography>
            <Typography variant="h6" color="primary" paragraph onClick={async () => {

              await history.push(`/advertisements/${Add._id}`);

            }}>View This Advertisement
    </Typography>


            {/* /////////////////////// from here it is option buttons ////////////////// */}
            {
              userData.user && userData.user.id === Add.publisher._id ?
                <div>

                  <Grid container spacing={2} alignItems="center"
                    justify="center">
                    {!Add.promoted && <Grid item container xs={4} alignItems="center"
                      justify="center">
                      <Button id="payhere-payment" fullWidth={true} variant="contained" color="secondary" onClick={handlePromoteOpen}>Promote</Button>

                    </Grid>}
                    <Grid item container xs={4} alignItems="center"
                      justify="center">
                      <Button variant="contained" fullWidth={true} color="primary" onClick={() => { handleEdit(Add) }}>
                        Edit
</Button>

                    </Grid>
                    <Grid item container xs={4} alignItems="center"
                      justify="center">
                      <Button fullWidth={true} variant="contained" color="default" onClick={handleClickDeleteOpen}>Delete</Button>
                    </Grid>
                  </Grid>
                </div> : null
            }
            {/* /////////////////////// end of option buttons ////////////////// */}


          </CardContent>
          <CardActions disableSpacing>
            <IconButton disabled aria-label="viewsIcon">
              <RemoveRedEyeIcon />
            </IconButton>
            <Typography variant="h6" color="textSecondary" >
              {Add.count} Views
        </Typography>
            <span
              color="primary"
              style={{ cursor: "pointer" }}
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </span>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h6" component="h5" color="textPrimary" paragraph>Description:</Typography>
              <Typography paragraph>
                {Add.description}
              </Typography>


            </CardContent>
          </Collapse>
        </Card>
      </Grid>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handlePublisherClose}

      >
        <DialogTitle  ><Typography variant="h6" gutterBottom color="textSecondary" paragraph>Publisher Details</Typography></DialogTitle>
        <DialogContent>
          <img src="/images/serial.png" width="100" />

          <Typography variant="h6" gutterBottom component="h5" color="textSecondary" paragraph>Publisher : {props.Adds.publisher.firstname
          }</Typography>
          {publisherAdsCount > 1 ? <Typography variant="h6" component="h5" color="textSecondary" paragraph>{publisherAdsCount} ads from this member
    </Typography> : <Typography variant="h6" component="h5" color="textSecondary" paragraph>{publisherAdsCount} ad from this member
    </Typography>

          }


        </DialogContent>
        <DialogActions disableSpacing={false}>

          <Button variant="contained" color="primary" size="small">
            See All Ads from this member
</Button>
          <Button onClick={handlePublisherClose} variant="contained" size="small">
            close
          </Button>
        </DialogActions>
      </Dialog>
      {/* ////////////////////////////////////// */}

      <Dialog
        open={openDelete}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Are you sure you want to delete this advertiement?"}</DialogTitle>

        <DialogActions>
          <Button onClick={handleDelete} color="primary">
            YES
          </Button>
          <Button onClick={handleDeleteClose} color="primary">
            NO
          </Button>
        </DialogActions>
      </Dialog>
      <div>

        <Dialog onClose={handlePromoteClose} aria-labelledby="customized-dialog-title" open={openPromote}>

          <DialogTitle id="customized-dialog-title" onClose={handlePromoteClose}>
            Promote Your Advertisement
        </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              The cost for promoting an advertisement is just Rs.100.00. By promoting an advertisement you can publish it on the top of the page for a one week.
          </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => { handlePromoteClose(); handleToken(Add) }} color="primary">
              OK
          </Button>
          </DialogActions>
        </Dialog>
      </div>

    </div>





  );

};
export default RenderCard;