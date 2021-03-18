import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
function ErrorDisplay(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.root}>
        <Alert variant="outlined" onClick={props.handleError} severity="error">{props.msg}</Alert>

        <br />
      </div>

    </React.Fragment>
  );
}

export default ErrorDisplay;
