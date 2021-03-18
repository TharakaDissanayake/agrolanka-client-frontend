
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Typography from '@material-ui/core/Typography';



export default function Filter(props) {
  const numOfAdvertisements = () => {
    try {
      if (props.count === 0 || props.count === 1) {
        return (
          <Typography variant="h5" component="h5" color="primary" paragraph>{props.count} Advertisement Found</Typography>
        );
      }
      return (
        <Typography variant="h5" component="h5" color="primary" paragraph>{props.count} Advertisements Found</Typography>


      );
    }
    catch (err) {
      console.log(err);
    }
  }
  return (
    <React.Fragment>
      {/* {numOfAdvertisements()} */}
      <div className="row justify-content-between">
        <div className="col-12 col-lg-6">
          <Autocomplete
            onChange={(event, value) => props.onChange(value)}
            id="highlights-demo1"


            options={props.locations}
            getOptionLabel={(location) => location.location}
            renderInput={(params) => (
              <TextField {...params} label={props.selectedLocation} variant="outlined" margin="normal" style={{ backgroundColor: 'white' }} />
            )}
            renderOption={(location, { inputValue }) => {
              const matches = match(location.location, inputValue);
              const parts = parse(location.location, matches);

              return (
                <div>
                  {parts.map((part, index) => (
                    <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                      {part.text}
                    </span>
                  ))}
                </div>
              );
            }}
          />
        </div>
        <div className="col-12 col-lg-6">
          <Autocomplete
            onChange={(event, value) => props.onChange2(value)}
            id="highlights-demo2"

            options={props.categories}
            getOptionLabel={(category) => category.label}
            renderInput={(params) => (
              <TextField {...params} label={props.selectedCategory} variant="outlined" margin="normal" style={{ backgroundColor: 'white' }} />
            )}
            renderOption={(category, { inputValue }) => {
              const matches = match(category.label, inputValue);
              const parts = parse(category.label, matches);

              return (
                <div>
                  {parts.map((part, index) => (
                    <span key={index} style={{ backgroundColor: 'white', fontWeight: part.highlight ? 700 : 400 }}>
                      {part.text}
                    </span>
                  ))}
                </div>
              );
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

