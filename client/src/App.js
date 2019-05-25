import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import TodoList from "./components/TodoList";
import CreateTodo from "./components/CreateTodo";
import EditTodo from "./components/EditTodo";
import LandingPage from "./components/LandingPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/todo" component={TodoList} />
        <Route exact path="/todo/create" component={CreateTodo} />
        <Route exact path="/todo/update/:id" component={EditTodo} />
        <Route exact path="/todo/delete/:id" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
