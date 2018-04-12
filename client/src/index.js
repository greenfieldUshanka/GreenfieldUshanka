import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../components/main';
import Login from '../components/Login.jsx';
import Friends from '../components/Friends.jsx';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      id: ''
    };
  }

  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Main}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/friends' component={Friends}/>
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