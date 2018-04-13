import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../components/main';
import Login from '../components/Login.jsx';
import Friends from '../components/Friends.jsx';
import './index.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      id: ''
    };
    this.setAuth = this.setAuth.bind(this);
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
    return (
      <main>
        <Switch>
          <Route exact path='/' render={() => (component.isAuthenticated() ?
            (<Main />)
            : (<Redirect to={{
              pathname: '/login',
              state: { from: component.location}}}/>)
            )}/>
          <Route exact path='/login' render={() => <Login setAuth={(id) => component.setAuth(id)}/>} />
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