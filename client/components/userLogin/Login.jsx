import React from 'react'; 
import { Image, Form, Grid, Button } from 'semantic-ui-react';
import axios from "axios";
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
import './index.css';
import {Redirect} from 'react-router-dom';


class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      fullName: "",
      newUsername: "",
      newPassword: "",
      isLoggedIn: false
    };
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  userAllInputFieldsChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleCreateAccount(event) {
    bcrypt.genSaltAsync(10) 
      .then(salt => {
        bcrypt.hashAsync(this.state.newPassword, salt, null)
          .then(hashedPassword => {
            const newUserInfo = {
              fullName: this.state.fullName,
              newUsername: this.state.newUsername,
              newPassword: hashedPassword,
              profilePicture:
                "https://source.unsplash.com/1600x900/?featured/?dog,cat,robots"
            };
            axios
              .post("/newAccount/", newUserInfo)
              .then(response => {
                console.log("Response from handleCreateAccount", response);
              })
              .catch(err => {
                console.log("Error from handleCreateAccount", err);
              });
            event.preventDefault();
          })
      })
  }

  handleLogin(event) {
    let component = this;
    axios
      .get(`/Login/${this.state.username}/${this.state.password}`)
      .then(response => {
        component.props.setAuth(response.data.id);
        component.setState({
          isLoggedIn: true
        });
      })
      .catch(err => {
        console.log("Error from handleLogin", err);
      });
    event.preventDefault();
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <Redirect to={"/main"}/>
      );
    }
    return (
      <div>
      <header id='login-header' >
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <Form>
              <Form.Field inline>
                <h1>ushanka icon placeholder</h1>
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column width={8}>
          <Form className='user-login' onSubmit={this.handleLogin} >
          <Form.Group >
            <Form.Input name='username' size={'small'} placeholder='username' width={6} onChange={this.userAllInputFieldsChange.bind(this)} />
            <Form.Input name='password' size={'small'} type='password' placeholder='password' autoComplete='off' width={6} onChange={this.userAllInputFieldsChange.bind(this)} />
            <Button type='submit'>Login</Button>
          </Form.Group >
          </Form> 
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </header>
    <div>
      <Grid>
        <Grid.Column width={8} className='left-side-Login' >
        <Image src='https://source.unsplash.com/1600x900/?featured/?dog,cat,robots' size='large' rounded/>

        </Grid.Column>
        <Grid.Column width={8} >
        <Form className='STARTING-FORM' onSubmit={this.handleCreateAccount} > 
          <Grid.Row className='create-account'>
              <h1>Create a new account </h1>
          </Grid.Row>
          <Grid.Row className='full-name-row'>
            <Form.Input name='fullName' size={'small'} placeholder='Full name'  width={14} onChange={this.userAllInputFieldsChange.bind(this)}/>
          </Grid.Row>
          <Grid.Row className='new-username-password'>
            <Form.Group>
              <Form.Input name='newUsername' size={'small'} placeholder='New username ' width={7} onChange={this.userAllInputFieldsChange.bind(this)} />
              <Form.Input name='newPassword' size={'small'} placeholder='New password ' type='password' autoComplete='off' width={7} onChange={this.userAllInputFieldsChange.bind(this)} />
            </Form.Group>
          </Grid.Row>
          <Grid.Row className='funny-stuff-cc-ssn'>
            <Form.Group>
              <Form.Input size={'small'} placeholder='Credit card information ' width={8} />
              <Form.Input size={'small'} placeholder='Social security number ' width={6} />
            </Form.Group>
          </Grid.Row>
          <Grid.Row className='funny-stuff-bd-ad'>
                <Form.Group>
                  <Form.Input size={'small'} placeholder='Birthday ' width={7} />
                  <Form.Input size={'small'} placeholder='Address ' width={7} />
                </Form.Group>
          </Grid.Row>
          <Grid.Row >
            <Grid.Column width={8}>
            <h6>
            By clicking Create Account, you agree to our Terms and that you have read our 
            Data Policy, including our Cookie Use. You may receive SMS Notifications from 
            ushanka and can opt out at any time.
            </h6>
            </Grid.Column>
            <Grid.Column width={8} >
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className='agree-terms'>
            <Form.Checkbox
              inline
              label='I agree to the terms and conditions'
              required />
          </Grid.Row>
          <Grid.Row className='create-account'>
            <Button type='submit'>Create Account</Button>
          </Grid.Row>
        </Form>
        </Grid.Column>
        </Grid>
      </div>
    </div>
    )
  } 
}

export default Login;