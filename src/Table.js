import React, { useState } from "react";
import { storeResults } from "./Store/Action/ActionCreators";
import { connect } from "react-redux"
import classes from "./Table.module.css";

const Table = props => {
  const [playerScore, setPlayerScore] = useState("");
  const [opponentScore, setOpponentScore] = useState("");
  const playerScoreHandler = event => {
    if (event.target.value <= props.points) {
      setPlayerScore(event.target.value);
    } else {
      alert("Enter proper match points");
    }
  };
  const opponentScoreHandler = event => {
    if (event.target.value <= props.points) {
      setOpponentScore(event.target.value);
    } else {
      alert("Enter proper match points");
    }
  };
  const submitButtonHandler=()=>{
    console.log("here")
  }
  if (props.showTable) {
    return (
      <div className={classes.Table}>
        <h2>Round {props.rounds}</h2>
        <div className={classes.TableData}>
          <table>
            <tr>
              <th>MATCH NUMBER</th>
              <th>MATCH</th>
              {props.showPoints ? <th>SCORE</th> : null}
            </tr>
            {props.choosedPlayers.map((player, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    {player.toUpperCase() +
                      " vs " +
                      props.choosedOpponents[index].toUpperCase()}
                  </td>
                  {props.showPoints ?
                  <td>
                    <div className={classes.Scores}>
                      {player + " score:"}
                      <input
                        type="text"
                        className={classes.PlayerScore}
                        onChange={playerScoreHandler}
                        value={playerScore}
                      />
                      {props.choosedOpponents[index] + " score:"}
                      <input
                        type="text"
                        className={classes.PlayerScore}
                        onChange={opponentScoreHandler}
                        value={opponentScore}
                      />
                      <button className={classes.SubmitButton} onClick={submitButtonHandler}>Submit</button>
                    </div>
                  </td> : null}
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    );
  } else {
    return null;
  }
};


const mapDispatchToProps=dispatch=>{
  return {
    storeResults:(winner,looser)=>dispatch(storeResults(winner,looser))
  }
}


export default connect(null,mapDispatchToProps)(Table);
