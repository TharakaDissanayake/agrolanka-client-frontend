


import React, { useState } from 'react';

import './Search.css';


export default function Search(props) {

  const [value, setValue] = useState("");
  return (
    <div>

      <form>

      <div className="input-field-search">
          <i className="fas fa-search"></i>
        <input
          
          onKeyDown={(e) =>
            props.searchSpace(e)}

          onChange={(e) => {
            setValue(e.currentTarget.value)
          }}
          
          placeholder={props.searchAdd ? props.searchAdd : "Search"}
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        </div>
       


      </form>
  
    </div>

  );
}
