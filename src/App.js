import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Schedule from "./components/Schedule/Schedule";
import Header from "./components/Header/Header";
import Result from "./components/Result/Result";
import SavedSchedule from "./components/SavedSchedule/SavedSchedule";

const App = () => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const changeSideDrawer = (event) => {
    event.stopPropagation();
    setShowSideDrawer(!showSideDrawer);
  };
  const closeSideDrawer = () => {
    setShowSideDrawer(false);
  };
  console.log(showSideDrawer);
  return (
    <div onClick={closeSideDrawer}>
      <Header
        changeSideDrawer={changeSideDrawer}
        showSideDrawer={showSideDrawer}
      />
      <Switch>
        <Route path="/savedSchedule" component={SavedSchedule} exact />
        <Route path="/result" component={Result} exact />
        <Route path="/" component={Schedule} exact />
      </Switch>
    </div>
  );
};

export default App;
