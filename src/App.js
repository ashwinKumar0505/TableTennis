import React from "react";
import { Switch , Route } from "react-router-dom"
import Schedule from "./Schedule/Schedule";
import Header from "./Header/Header";
import Result from "./Result/Result";
import SavedSchedule from "./SavedSchedule/SavedSchedule";

const App = () => {
  return (
    <div>
      <Header />
      <Switch> 
      <Route path="/savedSchedule" component={SavedSchedule} exact />
      <Route path="/result" component={Result} exact/>
      <Route path="/" component={Schedule} exact/>
      </Switch>
    </div>
  );
};

export default App;
