import React, { Component } from "react";
import { Input, Card, Button, Spin, message } from "antd";
import Fetch from "../helpers/Fetch";
import { Redirect, Link } from "react-router-dom";
import Label from "./Label";

const styles = {
  inputContainer: {
    margin: "2% 0"
  },
  button: {
    width: "100%",
    backgroundColor: "green",
    color: "white"
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLogin: false,
      loading: false,
      redirect: false
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ redirect: true });
    }
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  handleClick = async () => {
    try {
      this.setState({ loading: true });
      const { email, password } = this.state;
      const payload = {
        email,
        password
      };
      const options = {
        body: JSON.stringify(payload)
      };
      const response = await Fetch("/login", options);
      if (response.status) {
        localStorage.setItem("token", response.token);
        message.success("Login success");
        this.setState({ redirect: true });
      } else {
        message.error("Login Failed");
      }
      this.setState({ loading: false });
    } catch (err) {
      message.error(err);
      this.setState({ loading: false });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/todo" />;
    }

    if (this.state.loading) {
      return <Spin />;
    }
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "2%"
        }}
      >
        <Card style={{ width: 400 }} title="Login">
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
              Login
            </Button>
          </div>
          <div>
            <Link to="/signup">New ? SignUp</Link>
          </div>
        </Card>
      </div>
    );
  }
}
