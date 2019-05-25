import React, { Component } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  heading: {
    marginBottom: "2%"
  },
  buttonContainer: {
    width: "30%"
  },
  signUpButton: {
    margin: "0 1% 0 0",
    width: "49%",
    backgroundColor: "blue",
    color: "white"
  },
  loginButton: {
    margin: "0 0 0 1%",
    width: "49%",
    backgroundColor: "green",
    color: "white"
  }
};

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      loading: true
    };
  }

  handleClick = () => {
    localStorage.removeItem("token");
    this.setState({ redirect: true });
  };

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.heading}>
          <h1>Hi, I am Todo-App</h1>
        </div>
        <div style={styles.heading}>
          <h3>Let's Get Started</h3>
        </div>
        <div style={styles.buttonContainer}>
          <Link to="/signup">
            <Button style={styles.signUpButton}>Sign Up</Button>
          </Link>
          <Link to="/login">
            <Button style={styles.loginButton}>Login</Button>
          </Link>
        </div>
      </div>
    );
  }
}
