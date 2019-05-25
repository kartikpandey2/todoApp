import React, { Component } from "react";
import { Input, Card, Button, Spin, message } from "antd";
import { Redirect } from "react-router-dom";
import Fetch from "../helpers/Fetch";
import Label from "./Label";

const { TextArea } = Input;

const styles = {
  editContainer: {
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
    backgroundColor: "blue",
    color: "white"
  }
};

export default class EditTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      description: "",
      loading: false,
      ...props.location.state.todoData
    };
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  handleClick = async () => {
    try {
      this.setState({ loading: true });
      const { title, description, id } = this.state;
      const payload = {
        id,
        title,
        description
      };
      const options = {
        body: JSON.stringify(payload),
        method: "PUT"
      };
      const response = await Fetch("/todo", options);
      if (response.status) {
        message.success("Todo update success");
        this.setState({ loading: false, redirect: true });
      } else {
        message.error("Todo update Failed");
        throw new Error("");
      }
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
      <div style={styles.editContainer}>
        <Card style={styles.card} title="Update Todo">
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
              Update Todo
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}
