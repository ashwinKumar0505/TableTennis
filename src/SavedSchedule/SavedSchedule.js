import React from "react";
import fireBase from "../fireBaseConfig";
import Table from "../Table";
import classes from "./SavedSchedule.module.css";

class SavedSchedule extends React.Component {
  componentDidMount() {
    fireBase
      .database()
      .ref()
      .once("value")
      .then(Response => {
        if (Response.val())
          this.setState({
            choosedOpponents: Response.val().choosedOpponents,
            choosedPlayers: Response.val().choosedPlayers,
            points:Response.val().points,
            rounds:Response.val().rounds,
            details:Response.val().details
          });
          else{
            this.setState({
              data:"No match have been scheduled yet!!"
            })
          }
      });
  }
  state = {
    choosedOpponents: [],
    choosedPlayers: [],
    data:"loading.....",
    points:"",
    rounds:"",
    details:{}
  };
  deleteSchedule = () => {
    const confirm = window.prompt(
      "Do you really want to delete this schedule...yes to continue",
    );
    if (confirm === "yes") {
      fireBase
        .database()
        .ref()
        .remove()
        .then(Response => {
          alert("The Schedule is deleted")
          this.setState({
            choosedPlayers: [],
            choosedOpponents: [],
            data:"No match have been scheduled yet!!"
          });
        });
    } else {
      return;
    }
  };

  render() {

    let TableToShow = null;
    if (this.state.choosedPlayers.length>0) {
      TableToShow = (
        <div className={classes.Table}>
          {this.state.choosedPlayers.map((player, index) => {
            return (
              <Table
                showTable={true}
                showPoints={true}
                choosedOpponents={this.state.choosedOpponents[index]}
                choosedPlayers={player}
                rounds={index + 1}
                points={this.state.points}
                details={this.state.details}
              />
            );
          })}
          ;
        </div>
      );
    }
    else{
      TableToShow=(<div><h2>{this.state.data}</h2></div>)
    }
    return (
      <div className={classes.SavedSchedule}>
        <h1>SAVED SCHEDULE</h1>
        {TableToShow}
        {this.state.choosedPlayers.length > 0 ? (
          <button
            onClick={this.deleteSchedule}
            className={classes.deleteSchedule}
          >
            Delete This Schedule
          </button>
        ) : null}
      </div>
    );
  }
}

export default SavedSchedule;
