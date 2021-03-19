import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Review from './Review';
import Fade from "react-reveal/Fade";
import PostAdContext from "../../context/PostAdContext";
import UserContext from "../../context/UserContext";
import LinearProgress from '@material-ui/core/LinearProgress';
import Header from '../../sections/Header';
import Footer from '../../sections/Footer';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    borderRadius:'30px',
    boxShadow:'5px 5px 18px #888888',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
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

const steps = ['1', '2', '3', '4', '5'];

function getStepContent(step, handleNext, handleBack, props) {
  switch (step) {
    case 0:
      return <Step1 handleNext={handleNext} />;
    case 1:
      return <Step2 handleNext={handleNext} handleBack={handleBack} {...props} />;
    case 2:
      return <Step3 handleNext={handleNext} handleBack={handleBack} {...props} />;
    case 3:
      return <Step4 handleNext={handleNext} handleBack={handleBack} {...props} />;
    case 4:
      return <Review handleNext={handleNext} handleBack={handleBack} {...props} />;

    default:
      throw new Error('Unknown step');
  }
}

export default function CheckoutEdit(props) {
  const { userData, setUserData } = useContext(UserContext);
  const { postAd, setPostad } = useContext(PostAdContext);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000);
    return () => { clearTimeout(timer); };
  }, []);

  return (
    <div style={{ background: "rgba(255, 255, 255, 0.8)" }}>
    {loading ? <div>
<Header/>
<div className='progress-section'>

<h5>Loading...</h5>
<LinearProgress  />
</div>
      <Footer/>
    </div>  :
        userData.user ?
          <React.Fragment>
            <Header/>
            <CssBaseline />
            <AppBar position="absolute" color="default" className={classes.appBar} />
            <main className={classes.layout}>
            <Paper className={classes.paper} style={{marginTop:'83px'}}>
                <h5 style={{marginTop:'20px',color:'#069c54'}}>
                  Post Your Advertisement
          </h5>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <React.Fragment>
                  {activeStep === steps.length ? (
                    <div style={{ minHeight: 500 ,textAlign:'center'}}>

<h5 style={{color:'#069c54'}}>
                        Thank you !
                </h5>
                      <h6>
                        Your advertisement updated successfully.
                </h6>
                <img src='./success.svg' alt='' style={{maxHeight:'350px',marginTop:'50px' ,objectFit:'cover',display:'block',marginLeft:'auto',marginRight:'auto'}}/>
                    </div>
                  ) : (
                      <React.Fragment>
                        <Fade top>{getStepContent(activeStep, handleNext, handleBack, props)}</Fade>

                        {/* <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div> */}
                      </React.Fragment>
                    )}
                </React.Fragment>
              </Paper>

            </main>
            <Footer/>
          </React.Fragment> :
           <div>
           <Header/>
           <div className='progress-section'>
           
             <h5  style={{ color: "red" }}>
               please login first
               </h5>
             <Link to="/login">
               <h6  style={{ color: "green" }}>
                 click here for login or signup
                 </h6>
             </Link>
 
           
           </div>
                   <Footer/>
                 </div>
      }

    </div>
  );
}