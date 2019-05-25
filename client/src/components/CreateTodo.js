import React, { Component } from "react";
import { Input, Card, Button, Spin, message } from "antd";
import Fetch from "../helpers/Fetch";
import Label from "./Label";

const { TextArea } = Input;

const styles = {
  createContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingTop: "2%"
  },
  inputContainer: {
    margin: "2% 0"
  },
  card: {
    width: 400
  },
  button: {
    width: "100%",
    backgroundColor: "green",
    color: "white"
  }
};

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      loading: false
    };
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  handleClick = async () => {
    try {
      this.setState({ loading: true });
      const { title, description } = this.state;
      const payload = {
        title,
        description
      };
      const options = {
        body: JSON.stringify(payload)
      };
      const response = await Fetch("/todo", options);
      if (response.status) {
        message.success("Todo saved success");
      } else {
        message.error("Todo creation Failed");
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
      <div style={styles.createContainer}>
        <Card style={styles.card} title="Create Todo">
          <div style={styles.inputContainer}>
            <Label>Title</Label>
            <Input
              onChange={e => this.handleChange("title", e.target.value)}
              value={this.state.title}
            />
          </div>
          <div style={styles.inputContainer}>
            <Label>Description</Label>
            <TextArea
              onChange={e => this.handleChange("description", e.target.value)}
              value={this.state.description}
            />
          </div>
          <div style={styles.inputContainer}>
            <Button onClick={this.handleClick} style={styles.button}>
              Save Todo
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}
