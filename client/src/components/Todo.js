import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, message } from "antd";
import Fetch from "../helpers/Fetch";

const styles = {
  card: {
    width: "400px"
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white"
  },
  editButton: {
    backgroundColor: "blue",
    color: "white"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};

const Todo = props => {
  const handleDelete = async () => {
    const payload = { id: props.id };
    const body = JSON.stringify(payload);
    const options = {
      method: "DELETE",
      body
    };
    const response = await Fetch("/todo", options);
    if (response.status) {
      message.success("todo deleted");
      props.getTodo();
    } else {
      message.error("Something went wrong while deleting todo");
    }
  };

  const todoData = {
    title: props.title,
    id: props.id,
    description: props.description
  };

  return (
    <Card style={styles.card} title={props.title}>
      <p>{props.description}</p>
      <div>
        <Link
          to={{ pathname: `/todo/update/${props.id}`, state: { todoData } }}
        >
          <Button style={styles.editButton}>Edit</Button>
        </Link>
        <Button onClick={handleDelete} style={styles.deleteButton}>
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default Todo;
