import React from "react";
import Table from "../../Table";
import fireBase from "../../fireBaseConfig";
import "./Schedule.css";
import Modal from "../Modal/Modal";

class Schedule extends React.Component {
  state = {
    playersTotal: "",
    players: [],
    choosedPlayers: [],
    choosedOpponents: [],
    showTable: false,
    rounds: "",
    points: "",
    loading: false,
    totalMatches: "",
  };

  checkHandler = () => {
    if (this.state.players.includes("")) {
      alert("Please  Enter All The Player Names");
      return;
    }
    if (this.state.rounds === "" || this.state.points === "") {
      alert("please Fill the details to proceed");
      return;
    }
    let newPlayers = [...this.state.players];
    newPlayers = newPlayers.map((player) => player.toLowerCase());
    let duplicate = false;
    newPlayers.forEach((player, index) => {
      if (newPlayers.indexOf(player) !== index) {
        duplicate = true;
      }
    });
    if (duplicate) {
      alert("No duplicate names");
      return;
    }
    let i = 1;

    const choosedPlayers = this.state.choosedPlayers;
    const choosedOpponents = this.state.choosedOpponents;

    choosedPlayers.length = 0;
    choosedOpponents.length = 0;

    this.setState({
      choosedPlayers: choosedPlayers,
      choosedOpponents: choosedOpponents,
    });

    while (i <= this.state.rounds) {
      this.generateHandler();
      i++;
    }
  };

  generateHandler = () => {
    let players = [...this.state.players];

    const totalRounds = 1;

    const playerDetails = {};

    let choosedPlayers = [];

    let choosedOpponents = [];

    let totalPlayers = this.state.playersTotal;

    let totalOpponents = totalPlayers - 1;

    const finishedPlayers = [];

    function fact(number) {
      if (number > 0) {
        return number + fact(number - 1);
      } else {
        return 0;
      }
    }

    const totalMatches = fact(totalPlayers - 1) * totalRounds;

    this.setState({
      totalMatches: totalMatches,
    });

    players.forEach((player) => {
      let currentPlayer = player;
      let opponents = [];
      playerDetails[currentPlayer] = {
        opponents: players.filter((player) => {
          if (player !== currentPlayer) {
            opponents.push(player);
            return player;
          }
          return null;
        }),
        totalRounds: 0,
      };
      opponents.forEach((opponent) => {
        playerDetails[currentPlayer].playedWith = {
          ...playerDetails[currentPlayer].playedWith,
          [opponent]: 0,
        };
      });
    });

    let recentlyPlayed = "fgkfgjsjkg";

    let recentlyPlayed1 = "gfmgkfjgkf";

    let finish = 0;

    let choosedPlayer;

    let choosedOpponent;

    const findPlayers = (leaveThis) => {
      let flag = 1;

      let count = 0;

      finish = 0;

      choosedPlayer = players[Math.floor(Math.random() * totalPlayers)];

      let flagLeaveThis = 1;

      while (flagLeaveThis) {
        if (leaveThis && leaveThis === choosedPlayer) {
          choosedPlayer = players[Math.floor(Math.random() * totalPlayers)];
        } else {
          flagLeaveThis = 0;
        }
      }

      while (flag) {
        if (count === totalPlayers) {
          finish = 1;
          break;
        }

        if (
          recentlyPlayed === choosedPlayer ||
          recentlyPlayed1 === choosedPlayer
        ) {
          choosedPlayer = players[Math.floor(Math.random() * totalPlayers)];
        } else {
          flag = 0;
        }
        count = count + 1;
      }

      findOpponents(choosedPlayer);
    };

    const findOpponents = (choosedPlayer) => {
      let flagOpponent = 1;

      let checkedOpponents = [];

      finish = 0;

      let searchFlag = 0;

      let opponentsToChoose = [...playerDetails[choosedPlayer].opponents];

      choosedOpponent =
        opponentsToChoose[Math.floor(Math.random() * opponentsToChoose.length)];

      while (flagOpponent) {
        if (
          playerDetails[choosedPlayer].playedWith[choosedOpponent] ===
            totalRounds ||
          recentlyPlayed === choosedOpponent ||
          recentlyPlayed1 === choosedOpponent ||
          finishedPlayers.includes(choosedOpponent)
        ) {
          opponentsToChoose.splice(
            opponentsToChoose.indexOf(choosedOpponent),
            1
          );
          choosedOpponent =
            opponentsToChoose[
              Math.floor(Math.random() * opponentsToChoose.length)
            ];
        } else {
          break;
        }
        if (!checkedOpponents.includes(choosedOpponent)) {
          checkedOpponents.push(choosedOpponent);
        }

        if (
          checkedOpponents.length === totalOpponents ||
          opponentsToChoose.length === 0
        ) {
          if (playerDetails[choosedPlayer].totalRounds !== totalOpponents) {
            searchFlag = 1;
            break;
          }
          finish = 1;
          break;
        }
      }
      if (searchFlag === 1) {
        findPlayers(choosedPlayer);
      }
    };

    for (let i = 0; i < totalMatches; i++) {
      totalPlayers = players.length;

      if (finishedPlayers.length === totalOpponents) {
        break;
      }
      if (players.length === 0) {
        break;
      }

      findPlayers();
      if (finish === 1) {
        if (!finishedPlayers.includes(choosedPlayer)) {
          finishedPlayers.push(choosedPlayer);
          players.splice(players.indexOf(choosedPlayer), 1);
        }
        continue;
      }

      if (finish === 1) {
        if (!finishedPlayers.includes(choosedPlayer)) {
          finishedPlayers.push(choosedPlayer);
          players.splice(players.indexOf(choosedPlayer), 1);
        }
        continue;
      }

      playerDetails[choosedPlayer].playedWith[choosedOpponent] = 1;
      playerDetails[choosedOpponent].playedWith[choosedPlayer] = 1;
      playerDetails[choosedPlayer].totalRounds =
        playerDetails[choosedPlayer].totalRounds + 1;
      playerDetails[choosedOpponent].totalRounds =
        playerDetails[choosedOpponent].totalRounds + 1;

      choosedPlayers.push(choosedPlayer);
      choosedOpponents.push(choosedOpponent);

      recentlyPlayed = choosedPlayer;
      recentlyPlayed1 = choosedOpponent;

      if (playerDetails[choosedPlayer].totalRounds === totalOpponents) {
        finishedPlayers.push(choosedPlayer);
        players.splice(players.indexOf(choosedPlayer), 1);
      }

      if (playerDetails[choosedOpponent].totalRounds === totalOpponents) {
        finishedPlayers.push(choosedOpponent);
        players.splice(players.indexOf(choosedOpponent), 1);
      }
    }
    let finalListPlayers = this.state.choosedPlayers;
    let finalListOpponents = this.state.choosedOpponents;
    finalListPlayers.push(choosedOpponents);
    finalListOpponents.push(choosedPlayers);
    this.setState({
      showTable: true,
      choosedPlayers: finalListPlayers,
      choosedOpponents: finalListOpponents,
    });
  };

  changeHandler = (event) => {
    this.setState({
      playersTotal: event.target.value,
    });
  };

  generatePlayers = () => {
    if (this.state.playersTotal === 0) {
      alert("Enter Number Of Players");
      return;
    }
    if (this.state.playersTotal < 2) {
      alert("sorry , There should be atleast 2 players");
      return;
    }
    if (this.state.playersTotal > 20) {
      alert("There can be only 20 players.");
      return;
    }
    let newPlayers = [...this.state.players];
    for (let i = newPlayers.length; i < this.state.playersTotal; i++) {
      newPlayers.push("");
    }
    this.setState({
      players: newPlayers,
      choosedPlayers: [],
      choosedOpponents: [],
    });
  };

  playersHandler = (index, event) => {
    let playersChange = this.state.players.map((player, ind) => {
      if (ind === index) {
        return event.target.value;
      } else {
        return player;
      }
    });
    this.setState({
      players: playersChange,
    });
  };
  closeModalHandler = () => {
    this.setState({
      loading: false,
    });
  };

  checkSchedule = () => {
    this.setState({
      loading: true,
    });
    fireBase
      .database()
      .ref()
      .once("value")
      .then((Response) => {
        const value = Response.val();
        if (value) {
          this.setState({
            loading: false,
          });
          const reschedule = window.prompt(
            "You already have a schedule.To reschedule type yes else no"
          );
          if (reschedule) {
            this.saveSchedule();
          } else {
            this.setState({
              playersTotal: "",
              players: [],
              choosedPlayers: [],
              choosedOpponents: [],
              showTable: false,
              rounds: "",
              points: "",
            });
            return;
          }
        } else {
          this.saveSchedule();
        }
      })
      .catch((error) => {
        alert("something went wrong");
      });
  };

  saveSchedule = () => {
    const details = {};
    this.state.players.forEach((player) => {
      details[player] = {
        name: player,
        score: 0,
        recieved: 0,
        pointDifference: 0,
        totalMatches: 0,
        matchesWon: 0,
        matchesLost: 0,
        win: [],
        lose: [],
      };
    });
    fireBase
      .database()
      .ref()
      .set({
        choosedPlayers: this.state.choosedPlayers,
        choosedOpponents: this.state.choosedOpponents,
        rounds: this.state.rounds,
        points: this.state.points,
        details: details,
        totalMatches: this.state.totalMatches,
      })
      .then((Response) => {
        alert("The matches are scheduled");
      })
      .catch((error) => {
        alert("something went wrong");
      });
    this.setState({
      playersTotal: "",
      players: [],
      choosedPlayers: [],
      choosedOpponents: [],
      showTable: false,
      rounds: "",
      points: "",
      loading: false,
    });
  };

  render() {
    return (
      <div className="Schedule">
        <h1>SCHEDULING MATCH</h1>
        <div className="generatePlayers">
          <input
            type="text"
            placeholder="Number of players"
            onChange={this.changeHandler}
            value={this.state.playersTotal}
            name="players"
            className="totalPlayers"
            onKeyDown={(event) => {
              if (event.key === "Enter") this.generatePlayers();
            }}
          />
          <button onClick={this.generatePlayers} className="generate">
            GENERATE
          </button>
        </div>
        {this.state.players.length > 1 ? <h2>PLAYERS</h2> : null}
        <div className="allPlayers">
          {this.state.players.length > 1 &&
            this.state.players.map((player, index) => {
              return (
                <input
                  type="text"
                  placeholder={"player " + (index + 1)}
                  className="players"
                  key={index}
                  onChange={(event) => this.playersHandler(index, event)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") this.checkHandler();
                  }}
                />
              );
            })}
        </div>
        <br></br>
        {this.state.players.length > 1 ? (
          <div>
            <h2 style={{ textAlign: "center" }}>ROUNDS & POINTS</h2>
            <div className="RoundsAndPoints">
              <input
                type="text"
                placeholder="Number of Rounds"
                className="rounds"
                onChange={(event) =>
                  this.setState({ rounds: event.target.value })
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") this.checkHandler();
                }}
              />
              <input
                type="text"
                placeholder="Number of Match Points"
                className="points"
                onChange={(event) =>
                  this.setState({ points: event.target.value })
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") this.checkHandler();
                }}
              />
            </div>
          </div>
        ) : null}
        <br></br>
        {this.state.players.length > 1 ? (
          <button onClick={this.checkHandler} className="schedule">
            SCHEDULE MATCH
          </button>
        ) : null}
        {this.state.choosedPlayers.map((player, index) => {
          return (
            <Table
              showTable={this.state.showTable}
              showPoints={false}
              choosedOpponents={this.state.choosedOpponents[index]}
              choosedPlayers={player}
              rounds={index + 1}
              points={this.state.points}
            />
          );
        })}
        {this.state.choosedPlayers.length > 0 ? (
          <button onClick={this.checkSchedule} className="saveSchedule">
            SAVE THIS SCHEDULE
          </button>
        ) : null}
        <Modal show={this.state.loading} close={this.closeModalHandler} />
      </div>
    );
  }
}

export default Schedule;
