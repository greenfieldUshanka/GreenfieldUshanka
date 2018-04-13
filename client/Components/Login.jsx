<<<<<<< 2212b4bcb9798741d31778bc0ac2fc98672e1f36
=======
import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      fullName: '',
      newUsername: '',
      newPassword: '',
      isLoggedIn: false
    };
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.handleLogin = this.handleLogin.bind(this)
  }

  userAllInputFieldsChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log('thisStatefromInputs', this.state.newUsername, this.state.username)
  }


  handleCreateAccount(event) {
    const newUserInfo = {
      fullName: this.state.fullName,
      newUsername: this.state.newUsername,
      newPassword: this.state.newPassword,
      profilePicture: 'https://source.unsplash.com/1600x900/?featured/?dog,cat,robots'
    };

    axios.post('/newAccount/', newUserInfo)
      .then(response => {
        console.log('Response from handleCreateAccount', response)
      })
      .catch(err => {
        console.log('Error from handleCreateAccount', err)
      });
    event.preventDefault();
  }

  handleLogin(event) {
    let component = this;
    console.log(this);
    axios.get(`/Login/${this.state.username}/${this.state.password}`)
      .then(response => {
        component.props.setAuth(response.data.id);
        component.setState({
          isLoggedIn: true
        });
        console.log('Response from handleLogin', response.data.id)
      })
      .catch(err => {
        console.log('Error from handleLogin', err)
      });
    event.preventDefault();
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <Redirect to={"/"}/>
      );
    }
    return (
      <div>
        <div>
          <form onSubmit={this.handleLogin} autoComplete='off'>
            Username: <input name='username' autoComplete='off' onChange={this.userAllInputFieldsChange.bind(this)}/>
            <br/><br/>
            Password: <input name='password' type='password' autoComplete='off'
                             onChange={this.userAllInputFieldsChange.bind(this)}/>
            <br/><br/>
            <input type="submit" value="Login"/>
          </form>
          <br/><br/>
          <br/><br/>
          <form onSubmit={this.handleCreateAccount}>
            <div>Full name:
              <input name='fullName' onChange={this.userAllInputFieldsChange.bind(this)}/>
            </div>
            <div>Username:
              <input name='newUsername' onChange={this.userAllInputFieldsChange.bind(this)}/>
            </div>
            <div>Password:
              <input name='newPassword' type='password' autoComplete='off'
                     onChange={this.userAllInputFieldsChange.bind(this)}/>
            </div>
            <br/><br/>
            <input type="submit" value="CreateAccount"/>
          </form>
        </div>
      </div>
    )
  }
}

export default Login; 
>>>>>>> Finished basic login routing.
