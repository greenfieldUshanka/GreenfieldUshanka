import React from 'react';
import ReactDOM from 'react-dom';
import Friends from '../components/friends.jsx'
import Login from '../Components/Login.jsx';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Login />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));