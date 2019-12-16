import React from "react";
import { storeResults } from "./Store/Action/ActionCreators";
import { connect } from "react-redux";
import fireBase from "./fireBaseConfig";
import classes from "./Table.module.css";

class Table extends React.Component {
  componentDidMount() {
    const newPlayerScore = [...this.state.playerScore];
    const newOpponentScore = [...this.state.opponentScore];
    if (this.props.details) {
      if (this.props.details.scoreDetails) {
        this.props.details.scoreDetails.map((scoreDetail, index) => {
          newPlayerScore[index] = scoreDetail.playerScore;
          newOpponentScore[index] = scoreDetail.opponentScore;
        });
        this.setState({
          playerScore: newPlayerScore,
          opponentScore: newOpponentScore,
        });
      }
    }
  }

  state = {
    playerScore: [],
    opponentScore: [],
    ActDetails: this.props.details,
  };

  playerScoreHandler = (event, index) => {
    const newPlayerScore = this.state.playerScore;
    newPlayerScore[index] = event.target.value;
    this.setState({
      playerScore: newPlayerScore,
    });
  };
  opponentScoreHandler = (event, index) => {
    const newOpponentScore = this.state.opponentScore;
    newOpponentScore[index] = event.target.value;
    this.setState({
      opponentScore: newOpponentScore,
    });
  };
  submitButtonHandler = (index, player, opponent) => {
    const playerScore = [...this.state.playerScore];
    const opponentScore = [...this.state.opponentScore];
    const confirm = prompt("Do you want to submit the score . Yes to submit");
    if (confirm) {
      const details = this.state.ActDetails;

      if (playerScore[index] && opponentScore[index]) {
        details[player].score =
          parseInt(details[player].score, 10) +
          parseInt(playerScore[index], 10);
        details[player].totalMatches = details[player].totalMatches + 1;
        details[opponent].score =
          parseInt(details[opponent].score) + parseInt(opponentScore[index]);
        details[opponent].totalMatches = details[opponent].totalMatches + 1;

        details[player].recieved =
          parseInt(details[player].recieved, 10) +
          parseInt(opponentScore[index], 10);

        details[opponent].recieved =
          parseInt(details[opponent].recieved, 10) +
          parseInt(playerScore[index], 10);

        details[player].pointDifference =
          details[player].score - details[player].recieved;

        details[opponent].pointDifference =
          details[opponent].score - details[opponent].recieved;

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
        const newScoreDetails = details.scoreDetails || [];
        newScoreDetails[index] = {
          playerScore: playerScore[index],
          opponentScore: opponentScore[index],
        };
        details.scoreDetails = newScoreDetails;
        fireBase
          .database()
          .ref()
          .child("details")
          .set(details)
          .then(() => {
            alert("Submitted Succesful");
            this.setState({
              ActDetails: details,
            });
          })
          .catch(error => alert(error));
      } else {
        alert("Please Enter Both Opponent and Player Scores");
      }
    } else {
      return;
    }
  };

  deleteButtonHandler = (
    index,
    player,
    opponent,
    playerScore,
    opponentScore,
  ) => {
    const details = this.state.ActDetails;
    if (playerScore > opponentScore) {
      details[player].matchesWon = details[player].matchesWon - 1;
      details[player].totalMatches = details[player].totalMatches - 1;
      details[opponent].matchesLost = details[opponent].matchesLost - 1;
      details[opponent].totalMatches = details[opponent].totalMatches - 1;
      details[player].score = details[player].score - playerScore;
      details[opponent].score = details[opponent].score - opponentScore;
      details[player].recieved = details[player].recieved - opponentScore;
      details[opponent].recieved = details[opponent].recieved - playerScore;
      details[player].pointDifference =
        details[player].score - details[player].recieved;
      details[opponent].pointDifference =
        details[opponent].score - details[opponent].recieved;
      details[player].win=details[player].win.filter(detail => {
        if (detail.opponent === opponent) {
          return null;
        } else {
          return detail;
        }
      });
     details[opponent].lose=details[opponent].lose.filter(detail => {
        if (detail.opponent === player) {
          return null;
        } else {
          return detail;
        }
      });
    } else {
      details[opponent].matchesWon = details[opponent].matchesWon - 1;
      details[opponent].totalMatches = details[opponent].totalMatches - 1;
      details[player].matchesLost = details[player].matchesLost - 1;
      details[player].totalMatches = details[player].totalMatches - 1;
      details[opponent].score = details[opponent].score - opponentScore;
      details[player].score = details[player].score - playerScore;
      details[opponent].recieved = details[opponent].recieved - playerScore;
      details[player].recieved = details[player].recieved - opponentScore;
      details[opponent].pointDifference =
        details[opponent].score - details[opponent].recieved;
      details[player].pointDifference =
        details[player].score - details[player].recieved;
      details[opponent].win=details[opponent].win.filter(detail => {
        if (detail.opponent === player) {
          return null;
        } else {
          return detail;
        }
      });
     details[player].lose= details[player].lose.filter(detail => {
        if (detail.opponent === opponent) {
          return null;
        } else {
          return detail;
        }
      });
    }
    details.scoreDetails.splice(index,1)
    const newOpponentScore=[...this.state.opponentScore]
    const newPlayerScore=[...this.state.playerScore]
    newOpponentScore[index]="";
    newPlayerScore[index]="";
    fireBase
      .database()
      .ref()
      .child("details")
      .set(details)
      .then(() => {
        alert("Deleted Succesful...You can now Edit");
        this.setState({
          ActDetails: details,
          playerScore:newPlayerScore,
          opponentScore:newOpponentScore
        });
      })
      .catch(error => alert(error));
  };
  render() {
    if (this.props.showTable) {
      return (
        <div className={classes.Table}>
          <h2>Round {this.props.rounds}</h2>
          <div className={classes.TableData}>
            <table>
              <tbody>
                <tr>
                  <th>MATCH NUMBER</th>
                  <th>MATCH</th>
                  {this.props.showPoints ? (
                    <th>SCORE ( The Game point : {this.props.points} )</th>
                  ) : null}
                </tr>
                {this.props.choosedPlayers.map((player, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        {player.toUpperCase() +
                          " vs " +
                          this.props.choosedOpponents[index].toUpperCase()}
                      </td>
                      {this.props.showPoints ? (
                        <td>
                          <div className={classes.Scores}>
                            {player + " score:"}
                            <input
                              type="text"
                              className={classes.PlayerScore}
                              onChange={event =>
                                this.playerScoreHandler(
                                  event,
                                  index +
                                    (this.props.rounds - 1) *
                                      this.props.totalMatches,
                                )
                              }
                              value={
                                this.state.playerScore[
                                  index +
                                    (this.props.rounds - 1) *
                                      this.props.totalMatches
                                ]
                              }
                              disabled={
                                this.state.ActDetails.scoreDetails
                                  ? this.state.ActDetails.scoreDetails[
                                      index +
                                        (this.props.rounds - 1) *
                                          this.props.totalMatches
                                    ]
                                    ? true
                                    : false
                                  : false
                              }
                            />
                            {this.props.choosedOpponents[index] + " score:"}
                            <input
                              type="text"
                              className={classes.PlayerScore}
                              onChange={event =>
                                this.opponentScoreHandler(
                                  event,
                                  index +
                                    (this.props.rounds - 1) *
                                      this.props.totalMatches,
                                )
                              }
                              value={
                                this.state.opponentScore[
                                  index +
                                    (this.props.rounds - 1) *
                                      this.props.totalMatches
                                ]
                              }
                              disabled={
                                this.state.ActDetails.scoreDetails
                                  ? this.state.ActDetails.scoreDetails[
                                      index +
                                        (this.props.rounds - 1) *
                                          this.props.totalMatches
                                    ]
                                    ? true
                                    : false
                                  : false
                              }
                            />
                            {/* {console.log(this.state.ActDetails.scoreDetails[index])} */}
                            {this.state.ActDetails.scoreDetails ? (
                              this.state.ActDetails.scoreDetails[index] ? (
                                <button
                                  className={classes.EditButton}
                                  onClick={() =>
                                    this.deleteButtonHandler(
                                      index +
                                        (this.props.rounds - 1) *
                                          this.props.totalMatches,
                                      player,
                                      this.props.choosedOpponents[index],
                                      this.state.playerScore[
                                        index +
                                          (this.props.rounds - 1) *
                                            this.props.totalMatches
                                      ],
                                      this.state.opponentScore[
                                        index +
                                          (this.props.rounds - 1) *
                                            this.props.totalMatches
                                      ],
                                    )
                                  }
                                >
                                  Delete
                                </button>
                              ) : (
                                <button
                                  className={classes.SubmitButton}
                                  onClick={() =>
                                    this.submitButtonHandler(
                                      index +
                                        (this.props.rounds - 1) *
                                          this.props.totalMatches,
                                      player,
                                      this.props.choosedOpponents[index],
                                    )
                                  }
                                >
                                  Submit
                                </button>
                              )
                            ) : (
                              <button
                                className={classes.SubmitButton}
                                onClick={() =>
                                  this.submitButtonHandler(
                                    index +
                                      (this.props.rounds - 1) *
                                        this.props.totalMatches,
                                    player,
                                    this.props.choosedOpponents[index],
                                  )
                                }
                              >
                                Submit
                              </button>
                            )}
                          </div>
                        </td>
                      ) : null}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeResults: (winner, looser) => dispatch(storeResults(winner, looser)),
  };
};

export default connect(null, mapDispatchToProps)(Table);
