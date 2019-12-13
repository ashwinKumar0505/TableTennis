import React from 'react';
import classes from "./Spinner.module.css"
function Spinner(){
  return(
  <div style={{MarginTop:"100px"}}>
    <div className={classes.loader}>Loading...</div>
      <h1>Wait Man!!..Its Loading</h1>
  
  </div>
  )
}
export default Spinner;
