import React, { useState } from "react";
import { storeResults } from "./Store/Action/ActionCreators";
import { connect } from "react-redux";
import fireBase from "./fireBaseConfig";
import classes from "./Table.module.css";

const Table = props => {
  const [playerScore, setPlayerScore] = useState([]);
  const [opponentScore, setOpponentScore] = useState([]);
  const playerScoreHandler = (event, index) => {
    const newPlayerScore = playerScore;
    newPlayerScore[index] = event.target.value;
    setPlayerScore(newPlayerScore);
  };
  const opponentScoreHandler = (event, index) => {
    const newOpponentScore = opponentScore;
    newOpponentScore[index] = event.target.value;
    setOpponentScore(newOpponentScore);
  };
  const submitButtonHandler = (index, player, opponent) => {
    const confirm = prompt("Do you want to submit the score . Yes to submit");
    if (confirm) {
      const details = props.details;
      if (playerScore[index] && opponentScore[index]) {
        details[player].score =
          parseInt(details[player].score, 10) +
          parseInt(playerScore[index], 10);
        details[player].totalMatches = details[player].totalMatches + 1;
        details[opponent].score =
          parseInt(details[opponent].score) + parseInt(opponentScore[index]);
        details[opponent].totalMatches = details[opponent].totalMatches + 1;

        if (playerScore[index] > opponentScore[index]) {
          details[player].matchesWon = details[player].matchesWon + 1;
          details[opponent].matchesLost = details[opponent].matchesLost + 1;

          if (details[player].win) {
            details[player].win = [
              ...details[player].win,
              {
                opponent: opponent,
                Difference: playerScore[index] - opponentScore[index],
              },
            ];
          } else {
            details[player].win = [
              {
                opponent: opponent,
                Difference: playerScore[index] - opponentScore[index],
              },
            ];
          }

          if (details[opponent].lose) {
            details[opponent].lose = [
              ...details[opponent].lose,
              {
                opponent: player,
                Difference: playerScore[index] - opponentScore[index],
              },
            ];
          } else {
            details[opponent].lose = [
              {
                opponent: player,
                Difference: playerScore[index] - opponentScore[index],
              },
            ];
          }
        } else {
          details[opponent].matchesWon = details[opponent].matchesWon + 1;
          details[player].matchesLost = details[player].matchesLost + 1;

          if (details[opponent].win) {
            details[opponent].win = [
              ...details[opponent].win,
              {
                opponent: player,
                Difference: opponentScore[index] - playerScore[index],
              },
            ];
          } else {
            details[opponent].win = [
              {
                opponent: player,
                Difference: opponentScore[index] - playerScore[index],
              },
            ];
          }

          if (details[player].lose) {
            details[player].lose = [
              ...details[player].lose,
              {
                opponent: opponent,
                Difference: opponentScore[index] - playerScore[index],
              },
            ];
          } else {
            details[player].lose = [
              {
                opponent: opponent,
                Difference: opponentScore[index] - playerScore[index],
              },
            ];
          }
        }
        if (details.scoreDetails) {
          details.scoreDetails = [
            ...details.scoreDetails,
            {
              playerScore: playerScore[index],
              opponentScore: opponentScore[index],
            },
          ];
        } else {
          details.scoreDetails = [
            {
              playerScore: playerScore[index],
              opponentScore: opponentScore[index],
            },
          ];
        }
        fireBase
          .database()
          .ref()
          .child("details")
          .set(details);
      } else {
        alert("Please Enter Both Opponent and Player Scores");
      }
    } else {
      return;
    }
  };
  if (props.showTable) {
    return (
      <div className={classes.Table}>
        <h2>Round {props.rounds}</h2>
        <div className={classes.TableData}>
          <table>
            <tr>
              <th>MATCH NUMBER</th>
              <th>MATCH</th>
              {props.showPoints ? (
                <th>SCORE ( The Game point : {props.points} )</th>
              ) : null}
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
                  {console.log(props.details)}
                  {props.showPoints ? (
                    <td>
                      <div className={classes.Scores}>
                        {player + " score:"}
                        <input
                          type="text"
                          className={classes.PlayerScore}
                          onChange={event => playerScoreHandler(event, index)}
                          value={
                            props.details.scoreDetails
                              ? props.details.scoreDetails[index]
                                ? props.details.scoreDetails[index].playerScore
                                : playerScore[index]
                              : playerScore[index]
                          }
                        />
                        {props.choosedOpponents[index] + " score:"}
                        <input
                          type="text"
                          className={classes.PlayerScore}
                          onChange={event => opponentScoreHandler(event, index)}
                          value={
                            props.details.scoreDetails
                              ? props.details.scoreDetails[index]
                                ? props.details.scoreDetails[index]
                                    .opponentScore
                                : opponentScore[index]
                              : opponentScore[index]
                          }
                        />
                        <button
                          className={classes.SubmitButton}
                          onClick={() =>
                            submitButtonHandler(
                              index,
                              player,
                              props.choosedOpponents[index],
                            )
                          }
                        >
                          Submit
                        </button>
                      </div>
                    </td>
                  ) : null}
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

const mapDispatchToProps = dispatch => {
  return {
    storeResults: (winner, looser) => dispatch(storeResults(winner, looser)),
  };
};

export default connect(null, mapDispatchToProps)(Table);
