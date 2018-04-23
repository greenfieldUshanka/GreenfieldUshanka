import React from 'react'; 
import { Image, Form, Grid, Button } from 'semantic-ui-react';
import axios from 'axios';
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
import './index.css';
import {Redirect} from 'react-router-dom';


class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      fullName: '',
      newUsername: '',
      newPassword: '',
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
                'https://i.imgur.com/xNeChun.jpg'
            };
            let component = this;
            axios
              .post('/newAccount/', newUserInfo)
              .then(response => {
                if (response.data === 'exists') {
                  alert('Username is taken! Choose a new one.');
                } else if (response.data.id) {
                  component.props.setAuth(response.data.id);
                  component.setState({
                    isLoggedIn: true
                  });
                }
              })
              .catch(err => {
                console.log('Error from handleCreateAccount', err);
              });
            event.preventDefault();
          });
      });
  }

  handleLogin(event) {
    let component = this;
    console.log('FROM LOGIN.JSX', this.state.username);
    axios
      .get(`/Login/${this.state.username}/${this.state.password}`)
      .then(response => {
        if (response.data === 'wrong') {
          alert('Wrong username or password!');
        } else {
          component.props.setAuth(response.data.id);
          component.setState({
            isLoggedIn: true
          });
        }
      })
      .catch(err => {
        console.log('Error from handleLogin', err);
      });
    event.preventDefault();
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <Redirect to={'/main'}/>
      );
    }
    return (
      <div>
        <header className='login-header' >
          <Grid>
            <Grid.Row>
              <Grid.Column width={1}>
                <Image src='https://cdn1.iconfinder.com/data/icons/russian-icons-1/100/hat_fill-512.png' size='mini' />
              </Grid.Column>
              <Grid.Column width={7}> 
                <Form>
                  <Form.Field inline>
                    <h1 >ushanka</h1>
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column width={8}>
                <Form className='user-login' onSubmit={this.handleLogin} >
                  <Form.Group >
                    <Form.Input name='username' size={'small'} placeholder='username' width={6} onChange={this.userAllInputFieldsChange.bind(this)} />
                    <Form.Input name='password' size={'small'} type='password' placeholder='password' autoComplete='off' width={6} onChange={this.userAllInputFieldsChange.bind(this)} />
                    <Button type='submit'>Login</Button>
                  </Form.Group>
                </Form> 
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </header>
        <div>
          <Grid>
            <Grid.Column width={8} className='left-side-Login' >
              <div className='left-picture' >
                <Image src='https://pbs.twimg.com/profile_images/566996160204644352/W9hRSNuY.jpeg' size='large' rounded/>
              </div>
            </Grid.Column>
            <Grid.Column width={8} >
              <Form className='STARTING-FORM' onSubmit={this.handleCreateAccount} > 
                <Grid.Row className='create-account'>
                  <h1>Kreate new account </h1>
                </Grid.Row>
                <Grid.Row className='full-name-row'>
                  <Form.Input name='fullName' size={'small'} placeholder='Full Name' width={14} onChange={this.userAllInputFieldsChange.bind(this)}/>
                </Grid.Row>
                <Grid.Row className='new-username-password'>
                  <Form.Group>
                    <Form.Input name='newUsername' size={'small'} placeholder='New Username ' width={7} onChange={this.userAllInputFieldsChange.bind(this)} />
                    <Form.Input name='newPassword' size={'small'} placeholder='New Password ' type='password' autoComplete='off' width={7} onChange={this.userAllInputFieldsChange.bind(this)} />
                  </Form.Group>
                </Grid.Row>
                <Grid.Row className='funny-stuff-cc-ssn'>
                  <Form.Group>
                    <Form.Input size={'small'} placeholder='Kredit Kard ' width={8} />
                    <Form.Input size={'small'} placeholder='Social Sekurity ' width={6} />
                  </Form.Group>
                </Grid.Row>
                <Grid.Row className='funny-stuff-bd-ad'>
                  <Form.Group>
                    <Form.Input size={'small'} placeholder='Address ' width={7} />
                    <Form.Input size={'small'} placeholder='Mother Maiden Name ' width={7} />
                  </Form.Group>
                </Grid.Row>
                <Grid.Row >
                  <Grid.Column width={8}>
                    <h6>
                    Klick Kreate Account you agree to Term and Data Policies. Must include social sekurity and kredit kard. You receive much SMS and email from Ushanka. 
                    </h6>
                  </Grid.Column>
                  <Grid.Column width={8} >
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className='agree-terms'>
                  <Form.Checkbox
                    inline
                    label='Kneel to ushanka'
                    required />
                </Grid.Row>
                <Grid.Row className='create-account'>
                  <Button type='submit'>Kreate Account</Button>
                </Grid.Row>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  } 
}

export default Login;