import React from "react";
import fireBase from "../fireBaseConfig";
import Spinner from "../Spinner/Spinner";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import classes from "./Result.module.css";

class Result extends React.Component {
  componentDidMount() {
    fireBase
      .database()
      .ref()
      .child("details")
      .once("value")
      .then(Response => {
        if (Response.val()) {
          this.setState({
            details: Response.val(),
          });
        } else {
          this.setState({
            data: "Match is not scheduled yet",
          });
        }
      });
  }
  state = {
    details: {},
    data: "Loading...",
    showMoreDetailsName: "",
  };
  showMoreDetails = name => {
    if (name === this.state.showMoreDetailsName) {
      this.setState({
        showMoreDetailsName: "",
      });
    } else {
      this.setState({
        showMoreDetailsName: name,
      });
    }
  };
  render() {
    const details = this.state.details;
    let value;
    if (details) {
      value = Object.keys(details).map(key => {
        if (!details[key].name) {
          return null;
        }
        const playerPoints = (
          <React.Fragment>
            {" "}
            <tr>
              <td>{details[key].name}</td>
              <td>{details[key].totalMatches}</td>
              <td>{details[key].matchesWon}</td>
              <td>{details[key].matchesLost}</td>
              <td style={{ position: "relative" }}>
                <p>{details[key].score}</p>
                <p
                  className={classes.DownArrow}
                  onClick={() => this.showMoreDetails(details[key].name)}
                >
                  {details[key].win || details[key].lose ? (
                    this.state.showMoreDetailsName === details[key].name ? (
                      <IoIosArrowDropupCircle />
                    ) : (
                      <IoIosArrowDropdownCircle />
                    )
                  ) : null}
                </p>
              </td>
            </tr>
            {this.state.showMoreDetailsName === details[key].name &&
            (details[key].win || details[key].lose) ? (
              <tr className={classes.WinLoseDetails}>
                <td colSpan="5">
                  {details[key].win
                    ? details[key].win.map(match => {
                        return (
                          <div style={{ paddingBottom: "10px" }}>
                            Won against {match.opponent} by {match.Difference}{" "}
                            points
                          </div>
                        );
                      })
                    : null}
                  {details[key].lose
                    ? details[key].lose.map(match => {
                        return (
                          <div style={{ paddingBottom: "10px" }}>
                            Lost against {match.opponent} by {match.Difference}{" "}
                            points
                          </div>
                        );
                      })
                    : null}
                </td>
              </tr>
            ) : null}
          </React.Fragment>
        );
        return playerPoints;
      });
    } else {
      value = <p>No match is scheduled</p>;
    }
    console.log(details);
    return (
      <div className={classes.OuterResultDiv}>
        <div className={classes.InnerResultDiv}>
          {Object.keys(details).length > 0 ? (
            <div className={classes.PlayerPoints}>
              <h1>Table-Tennis Points Table</h1>
              <table>
                <tbody>
                  <tr>
                    <th>Players</th>
                    <th>Matches Player</th>
                    <th>Won</th>
                    <th>Lost</th>
                    <th>Total Score</th>
                  </tr>
                  {value}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: "20px" }}>{this.state.data}</div>
          )}
        </div>
      </div>
    );
  }
}

export default Result;
