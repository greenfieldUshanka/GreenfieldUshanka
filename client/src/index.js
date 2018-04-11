import React from 'react';
import ReactDOM from 'react-dom';
import AppHeader from '../components/AppHeader';
import 'semantic-ui-css/semantic.min.css';
import HomePage from '../components/HomePage';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <AppHeader/>
        <div className="container">
          <HomePage/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));