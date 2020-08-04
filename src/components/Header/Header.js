import React from "react";
import logo from "../../assets/logo1.png";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import SideDrawer from "../SideDrawer/SideDrawer";

const Header = (props) => {
  console.log(props);
  return (
    <div className={classes.Header}>
      <img src={logo} alt="logo" />
      <h1>TABLE TENNIS</h1>
      <div className={classes.Links}>
        <NavLink to="/" activeClassName={classes.active} exact>
          Schedule Match
        </NavLink>
        <NavLink to="/savedSchedule" activeClassName={classes.active} exact>
          Saved Schedule
        </NavLink>
        <NavLink to="/result" activeClassName={classes.active} exact>
          Results
        </NavLink>
      </div>
      <div className={classes.BurgerMenu} onClick={props.changeSideDrawer}>
        <div className={classes.line}></div>
        <div className={classes.line}></div>
        <div className={classes.line}></div>
      </div>
      <SideDrawer showSideDrawer={props.showSideDrawer} />
    </div>
  );
};

export default Header;
