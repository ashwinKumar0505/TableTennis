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
          const detailsObject = Response.val();
          delete detailsObject.scoreDetails;
          const details = Object.values(detailsObject);
          details.sort((a, b) => {
            if (a.matchesWon > b.matchesWon) {
              return -1;
            } else if (a.matchesWon === b.matchesWon) {
              if (a.pointDifference > b.pointDifference) {
                return -1;
              } else if (a.pointDifference === b.pointDifference) {
                if (a.score > b.score) {
                  return -1;
                } else if (a.score === b.score) {
                  if (a.recieved > b.recieved) {
                    return -1;
                  } else if (a.recieved === b.recieved) {
                    if (a.name > b.name) {
                      return -1;
                    } else {
                      return 1;
                    }
                  } else {
                    return 1;
                  }
                } else {
                  return 1;
                }
              } else {
                return 1;
              }
            } else {
              return 1;
            }
          });

          this.setState({
            details: details,
          });
        } else {
          this.setState({
            data: "No match have been scheduled yet!!",
          });
        }
      });
  }
  state = {
    details: [],
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
      value = details.map((detail, index) => {
        if (!details[index].name) {
          return null;
        }
        const playerPoints = (
          <React.Fragment>
            {" "}
            <tr>
              <td>{details[index].name}</td>
              <td>{details[index].totalMatches}</td>
              <td>{details[index].matchesWon}</td>
              <td>{details[index].matchesLost}</td>
              <td>{details[index].score}</td>
              <td>{details[index].recieved}</td>
              <td style={{ position: "relative" }}>
                <p>{details[index].pointDifference}</p>
                <p
                  className={classes.DownArrow}
                  onClick={() => this.showMoreDetails(details[index].name)}
                >
                  {details[index].win || details[index].lose ? (
                    this.state.showMoreDetailsName === details[index].name ? (
                      <IoIosArrowDropupCircle />
                    ) : (
                      <IoIosArrowDropdownCircle />
                    )
                  ) : null}
                </p>
              </td>
            </tr>
            {this.state.showMoreDetailsName === details[index].name &&
            (details[index].win || details[index].lose) ? (
              <tr className={classes.WinLoseDetails}>
                <td colSpan="8">
                  {details[index].win
                    ? details[index].win.map(match => {
                        return (
                          <div style={{ paddingBottom: "10px" }}>
                            Won against {match.opponent} by {match.Difference}{" "}
                            points
                          </div>
                        );
                      })
                    : null}
                  {details[index].lose
                    ? details[index].lose.map(match => {
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
    return (
      <div className={classes.OuterResultDiv}>
        <div className={classes.InnerResultDiv}>
          {Object.keys(details).length > 0 ? (
            <div className={classes.PlayerPoints}>
              <h1>Table-Tennis Points Table</h1>
              <table>
                <tbody>
                  <tr>
                    <th>Name</th>
                    <th>Total Matches</th>
                    <th>Won</th>
                    <th>Lost</th>
                    <th>PS</th>
                    <th>PR</th>
                    <th>PD</th>
                  </tr>
                  {value}
                </tbody>
              </table>
              <div className={classes.FullForm}>
                <p><span>PS</span>-->Points Scored</p>
                <p><span>PR</span>-->Points Recieved</p>
                <p><span>PD</span>-->Points Difference</p>
            </div>
            </div>
          ) : (
            <h3 style={{ padding: "20px",textAlign:"center" }}>{this.state.data}</h3>
          )}
        </div>
      </div>
    );
  }
}

export default Result;
