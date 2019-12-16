import React from "react";
import { NavLink } from "react-router-dom";
import image from "../logo1.png";
import classes from "./SideDrawer.module.css";
const SideDrawer = props => {
  return (
    <div
      className={classes.SideDrawer}
      style={{
        transform: props.showSideDrawer ? "translateX(0)" : "translateX(-100%)",
      }}
      onClick={event => {
        event.stopPropagation();
      }}
    >
      <div className={classes.Logo}>
        <img src={image} alt="bar" /> <p>Codebrahma</p>
      </div>
      <div className={classes.DemoButtons}>
        <NavLink to="/" exact activeClassName={classes.active}>Schedule Match</NavLink>
        <NavLink to="/savedSchedule" activeClassName={classes.active}>Saved Schedule</NavLink>
        <NavLink to="/result" activeClassName={classes.active}>Results</NavLink>
      </div>
    </div>
  );
};

export default SideDrawer;
