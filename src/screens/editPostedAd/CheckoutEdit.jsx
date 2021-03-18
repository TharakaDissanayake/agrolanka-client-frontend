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


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
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
    <div style={{ background: "#f2f2f2" }}>
      {loading ? <div>

        <Typography variant="h5" gutterBottom>Loading...</Typography>
        <LinearProgress />
      </div> :
        userData.user ?
          <React.Fragment>
            <Header/>
            <CssBaseline />
            <AppBar position="absolute" color="default" className={classes.appBar} />
            <main className={classes.layout}>
              <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center">
                  Update Your Advertisement Details
          </Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <React.Fragment>
                  {activeStep === steps.length ? (
                    <div style={{ minHeight: 500 }}>

                      <Typography variant="h5" gutterBottom>
                        Advertisement updated successfully
                </Typography>

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
        
          </React.Fragment> :
          <div >
            <h4 className="p-4" style={{ color: "red" }}>
              please login first
              </h4>
            <Link to="/login">
              <h6 className="p-4" style={{ color: "green" }}>
                click here for login or signup
                </h6>
            </Link>

          </div>
      }

    </div>
  );
}