


import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import Button from '@material-ui/core/Button';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "100%",
    // backgroundColor: "#f8f8f8",
    backgroundColor: 'white',

  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    width: "100%"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: 17
  },
  iconButton: {
    padding: 10,

  },
  divider: {
    height: 44,
    marginTop: 4,
  },
}));

export default function Search(props) {
  const classes = useStyles();
  const [value, setValue] = useState("");
  return (
    <div>

      <Paper component="form" className={classes.root} >


        <InputBase

          onKeyDown={(e) =>
            props.searchSpace(e)}

          onChange={(e) => {
            setValue(e.currentTarget.value)
          }}
          className={classes.input}
          placeholder={props.searchAdd ? props.searchAdd : "Search"}
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton className={classes.iconButton} aria-label="search" onClick={() => { props.searchSpaceMouse(value) }}>
          <SearchIcon />
        </IconButton>


      </Paper>
      {/* <Button
        variant="contained"
        color="primary"
        onClick={props.reset}
        className={classes.button}
        endIcon={<RotateLeftIcon>Reset All Filters</RotateLeftIcon>}
      >
        Reset All Filters
      </Button> */}
    </div>

  );
}
