import React from 'react';
import ReactDOM from 'react-dom';
import AppHeader from '../components/appheader';
import HomePage from '../components/homepage';
import Friends from '../components/friends.jsx'
import Login from '../components/userLogin/Login.jsx';

class App extends React.Component {
  constructor() {
    super();
  }



  render() {
    return (
      <div>
        <AppHeader/>
      <div className="container">
        <HomePage />
      </div>
        <Friends/>
        <Login /> 
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

