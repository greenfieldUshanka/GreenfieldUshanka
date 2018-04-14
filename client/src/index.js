import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../components/main';
import Login from '../components/userLogin/Login.jsx';
import './index.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Friends from '../components/Friends.jsx';
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      hasSession: false
    };
    this.setAuth = this.setAuth.bind(this);
    this.getSessionId();
  }

  getSessionId() {
    axios
      .get("/userSession")
      .then(response => {
        if (response.data.id) {
          console.log('good stuff', response.data.id);
          this.setState({
            id: response.data.id,
            hasSession: true
          });
        } else {
          this.setState({
            hasSession: true
          });
        }
      })
      .catch(err => {
        console.log("Error getting session id", err);
      });
  }

  isAuthenticated() {
    console.log('isAuth:', !!this.state.id);
    return !!this.state.id;
  }

  setAuth(id) {
    console.log('Setting id: ', id);
    this.setState({id: id});
  }

  render() {
    let component = this;
    if (!this.state.hasSession) {
      return (
        <div>Waiting for server</div>
      );
    }
    return (
      <main>
        <Switch>
          <Route exact path ='/' render={() => <Redirect to={{ pathname: '/main'}}/>}/>
          <Route path='/main' render={() => (component.isAuthenticated() ?
            (<Main id={this.state.id}/>)
            : (<Redirect to={{
              pathname: '/login',
              state: { from: component.location}}}/>)
          )}/>
          <Route exact path='/login' render={() => <Login setAuth={(id) => component.setAuth(id)}/>} />
        </Switch>
      </main>
    );
  }
}

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'));