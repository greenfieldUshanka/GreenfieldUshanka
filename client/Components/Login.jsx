import React, { Component } from 'react'; 
import axios from 'axios';

class Login extends Component {
    constructor() {
        super(); 
        this.state = {
            username: '',
            password: '',
            fullName: '', 
            newUsername: '',
            newPassword: '',
        }
        this.handleCreateAccount = this.handleCreateAccount.bind(this);
        this.handleLogin = this.handleLogin.bind(this)
    }
    
    userAllInputFieldsChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log('thisStatefromInputs', this.state.newUsername, this.state.username)
    }


    handleCreateAccount(event) {
        const newUserInfo = {
            fullName: this.state.fullName,
            newUsername: this.state.newUsername,
            newPassword: this.state.newPassword,
            profilePicture: 'https://source.unsplash.com/1600x900/?featured/?dog,cat,robots'
        }

        axios.post('/api/newAccount/', newUserInfo)
            .then( response => {
                console.log('Response from handleCreateAccount', response)
            })
            .catch( err => {
                console.log('Error from handleCreateAccount', err)
            })
            event.preventDefault();
    }

    handleLogin(event) {
        axios.get(`/api/Login/${this.state.username}/${this.state.password}`)
            .then( response => {
                console.log('Response from handleLogin', response)
            })
            .catch( err => {
                console.log('Error from handleLogin', err)
            })
        event.preventDefault();
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleLogin} autoComplete='off' >
                Username: <input name='username' autoComplete='off' onChange={this.userAllInputFieldsChange.bind(this)} />
                <br/><br/>
                Password: <input name='password' type='password' autoComplete='off' onChange={this.userAllInputFieldsChange.bind(this)}/>
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
                    <input name='newPassword' type='password' autoComplete='off' onChange={this.userAllInputFieldsChange.bind(this)} />
                </div>
                <br/><br/>
                <input type="submit" value="CreateAccount"/>
                </form>
            </div>
        )
    }
}

export default Login; 