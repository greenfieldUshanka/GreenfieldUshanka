import React from 'react';
import AppHeader from './appheader';
import HomePage from './homepage';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AppHeader/>
        <div className="container">
          <HomePage/>
        </div>
      </div>
    );
  }
}

export default Main;