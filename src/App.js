import React,{ useState } from "react";
import { Switch , Route } from "react-router-dom"
import Schedule from "./Schedule/Schedule";
import Header from "./Header/Header";
import Result from "./Result/Result";
import SavedSchedule from "./SavedSchedule/SavedSchedule";

const App = () => {

  const [showSideDrawer , setShowSideDrawer]=useState(false);

  const changeSideDrawer=(event)=>{
    event.stopPropagation();
    console.log("here")
    setShowSideDrawer(!showSideDrawer)
  }
  const closeSideDrawer=()=>{
    setShowSideDrawer(false)
  }
  console.log(showSideDrawer)
  return (
    <div onClick={closeSideDrawer}>
      <Header changeSideDrawer={changeSideDrawer} showSideDrawer={showSideDrawer}/>
      <Switch> 
      <Route path="/savedSchedule" component={SavedSchedule} exact />
      <Route path="/result" component={Result} exact/>
      <Route path="/" component={Schedule} exact/>
      </Switch>
    </div>
  );
};

export default App;
