import React, { Component } from "react";
import "./Login.css";
import {
  Grid,
  Jumbotron,
  Form,
  Button,
  PageHeader,
  FormGroup,
  FormControl,
  Carousel
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router";

export default class Login extends Component {
  state = {
    usernameInput: this.props.usernameInput || "",
    passwordInput: this.props.passwordInput || "",
    loggedIn: false,
    message: "",
    user: null
  };

  /**
       * @func handleUserNameChange
       Handles the users value and Set the State to that value
       ~Kelvin
       */

  handleUsernameChange = e => {
    this.setState({
      usernameInput: e.target.value
    });
  };
  /**
       * @func handlePasswordChange
       Handles the users value/password and Set the State to that value
       ~Kelvin
       */

  handlePasswordChange = e => {
    this.setState({
      passwordInput: e.target.value
    });
  };

  /**
       * @func submitForm
       Submit/Post The Input to Database to retrieve User
       ~Kelvin
       */

  submitForm = e => {
    e.preventDefault();
    const { usernameInput, passwordInput } = this.state;

    axios
      .post("/login", {
        username: usernameInput,
        password: passwordInput
      })
      .then(res => {
        this.setState({
          loggedIn: true
        });
      })
      .catch(err => {
        this.setState({
          usernameInput: "",
          passwordInput: "",
          message: "username/password not found"
        });
      });
  };

  render() {
    const {
      usernameInput,
      passwordInput,
      message,
      loggedIn,
      user
    } = this.state;
    const { submitForm } = this;

    if (user) {
      return <Redirect to="/user/dashboard" />;
    }
    if (loggedIn) {
      return <Redirect to="/user/dashboard" />;
    }

    return (
      <div>
        <Carousel controls={false} interval={4000} indicators={false}>
          <Carousel.Item>
            <img src="/images/soccer-background.jpg" />
          </Carousel.Item>
          <Carousel.Item>
            <img src="/images/football-stadium-background.jpg" />
          </Carousel.Item>
          <Carousel.Item>
            <img src="/images/basketball-background.jpg" />
          </Carousel.Item>
        </Carousel>
        <Grid className="login_container">
          <div id="jumbo_container">
            <Jumbotron bsClass="LoginJumbotron">
              <PageHeader bsClass="pageHeader">
                <h1 id="Login Title">
                  Game On! <br />
                  <small>Let's Play. Game On!</small>
                </h1>
              </PageHeader>
            </Jumbotron>
          </div>
          <div id="form_container">
            <form onSubmit={this.submitForm}>
              <FormGroup controlId="formControlsSelect">
                <FormControl
                  bsSize="large"
                  type="input"
                  placeholder="Username or E-mail"
                  name="username"
                  value={usernameInput}
                  onChange={this.handleUsernameChange}
                />
                <br />
                <FormControl
                  bsSize="large"
                  type="password"
                  placeholder="Password"
                  name="username"
                  value={passwordInput}
                  onChange={this.handlePasswordChange}
                />
              </FormGroup>
              <Button id="loginSubmitButton" type="submit">
                Submit
              </Button>
              <p id="or">OR</p>
              <p>
                Don't have an account? <br />
                <Link to="/register">Sign Up</Link>
              </p>
            </form>
          </div>
        </Grid>
      </div>
    );
  }
}