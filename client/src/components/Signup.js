import React, { Component } from "react";
import { Input, Card, Button, Spin, message } from "antd";
import { Link } from "react-router-dom";
import Fetch from "../helpers/Fetch";
import Label from "./Label";

const styles = {
  signupContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "2%"
  },
  card: {
    width: 400
  },
  inputContainer: {
    margin: "2% 0"
  },
  button: {
    width: "100%",
    backgroundColor: "green",
    color: "white"
  }
};

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      loading: false
    };
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  handleClick = async () => {
    try {
      this.setState({ loading: true });
      const { email, password, name } = this.state;
      const payload = {
        email,
        password,
        name
      };
      const options = {
        body: JSON.stringify(payload)
      };
      const response = await Fetch("/signup", options);
      if (response.status) {
        message.success("SignUp success");
      } else {
        message.error("SignUp Failed");
      }
      this.setState({ loading: false });
    } catch (err) {
      message.error(err);
      this.setState({ loading: false });
    }
  };

  render() {
    if (this.state.loading) {
      return <Spin />;
    }
    return (
      <div style={styles.signupContainer}>
        <Card style={styles.card} title="Sign Up">
          <div style={styles.inputContainer}>
            <Label>Name</Label>
            <Input
              onChange={e => this.handleChange("name", e.target.value)}
              value={this.state.name}
            />
          </div>
          <div style={styles.inputContainer}>
            <Label>Email</Label>
            <Input
              onChange={e => this.handleChange("email", e.target.value)}
              value={this.state.email}
            />
          </div>
          <div style={styles.inputContainer}>
            <Label>Password</Label>
            <Input
              type="password"
              onChange={e => this.handleChange("password", e.target.value)}
              value={this.state.password}
            />
          </div>
          <div style={styles.inputContainer}>
            <Button onClick={this.handleClick} style={styles.button}>
              Sign Up
            </Button>
          </div>
          <div>
            <Link to="/login">Existing User ? Login</Link>
          </div>
        </Card>
      </div>
    );
  }
}
