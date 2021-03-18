
import './MenuCard.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarIcon from '@material-ui/icons/Star';
import AttachFileIcon from '@material-ui/icons/AttachFile';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function MenuCard(props) {
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

        <div className="menu-item"  >
            <div onClick={async () => {
            await history.push(`/advertisements/${Add._id}`);
            await props.loadFunc();

          }}>
            <div className="menu-item-img"> 
            <img src={Add.image} alt="img" />
        <div class="price"><AttachFileIcon/> Rs. {Add.price}</div>
       

    
   
            </div>
            <div className=" menu-item-text">
           
                <h6>{Add.name}</h6>

                <span> {Add.location}  - {Add.category}</span>
                
            </div>
            </div>

            <div className="row view-row">
            {Add.promoted ? 
            <div><StarIcon style={{color:'#eab523'}}/><StarIcon style={{color:'#eab523'}}/><StarIcon style={{color:'#eab523'}}/><StarIcon style={{color:'#eab523'}}/><StarIcon style={{color:'#eab523'}}/></div>:<div/> } 
              <div> <VisibilityIcon style={{ color: '#069C54' }} />  {Add.count}</div>  
            </div>
            
         
            {userData.user && userData.user.id === Add.publisher._id ?
            <div className='btn-options'>
                {!Add.promoted && 
            <MonetizationOnIcon onClick={handlePromoteOpen} id="payhere-payment" style={{color:'#048654',marginLeft:'10px'}}/>
          
            }
                  <EditIcon onClick={() => { handleEdit(Add) }} style={{color:'gray',marginLeft:'10px'}}/>
            <DeleteIcon onClick={handleClickDeleteOpen} style={{color:'#bb2124',marginLeft:'10px'}}/>
            
            </div> : null}

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
    )
}

export default MenuCard
