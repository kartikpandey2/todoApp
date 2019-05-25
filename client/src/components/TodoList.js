import React, { Component } from "react";
import { Spin, message, Button } from "antd";
import { Link, Redirect } from "react-router-dom";
import Todo from "./Todo";
import Fetch from "../helpers/Fetch";
import plus from "../plus.svg";

const styles = {
  todoListContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "2%"
  },
  heading: {
    marginBottom: "2%"
  },
  logOut: {
    position: "absolute",
    top: "2%",
    right: "2%"
  },
  addButton: {
    position: "absolute",
    bottom: "2%",
    right: "2%",
    height: "50px",
    width: "50px"
  }
};

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      loading: true
    };
  }

  async componentDidMount() {
    this.getTodo();
  }

  getTodo = async () => {
    const response = await Fetch("/todo", { method: "GET" });
    if (response.status) {
      this.setState({ todo: response.data, loading: false });
    } else {
      message.error("Something went wrong while fetching todo's");
    }
  };

  handleClick = () => {
    localStorage.removeItem("token");
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.loading) {
      return <Spin />;
    }
    const todoList = this.state.todo.map(({ title, description, _id }) => (
      <Todo
        title={title}
        description={description}
        key={_id}
        id={_id}
        getTodo={this.getTodo}
      />
    ));

    return (
      <div style={styles.todoListContainer}>
        <div style={styles.logOut}>
          <Button onClick={this.handleClick}>Log Out</Button>
        </div>
        <div style={styles.heading}>
          <h1>Hi, I am todo app</h1>
        </div>
        <div>{todoList}</div>
        <div style={styles.addButton}>
          <Link to="/todo/create">
            <img src={plus} alt="add todo " />
          </Link>
        </div>
      </div>
    );
  }
}
