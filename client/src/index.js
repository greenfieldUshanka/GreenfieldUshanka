import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../components/main';
import Login from '../components/userLogin/Login.jsx';
import './index.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Friends from '../components/Friends.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
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
            (<Main id={component.state.id}/>)
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