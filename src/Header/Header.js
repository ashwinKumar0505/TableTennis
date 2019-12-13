import React from 'react'
import logo from "../tableLogo.png"
import { NavLink } from "react-router-dom"
import classes from './Header.module.css'
const Header=()=>{
  return <div className={classes.Header}>
    <img src={logo} alt="logo" />
    <h1>TABLE TENNIS</h1>
    <div className={classes.Links}>
      <NavLink to="/" activeClassName={classes.active} exact>Schedule Match</NavLink>
      <NavLink to="/savedSchedule" activeClassName={classes.active} exact>Saved Schedule</NavLink>
      <NavLink to="/result" activeClassName={classes.active} exact>Results</NavLink>
    </div>
  </div>
} 

export default Header;