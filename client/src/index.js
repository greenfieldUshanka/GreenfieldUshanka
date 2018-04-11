import React from 'react';
import ReactDOM from 'react-dom';
import Friends from '../components/friends.jsx'

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Friends />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));