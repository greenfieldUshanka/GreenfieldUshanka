import React from 'react';
import AppHeader from './appheader';
import HomePage from './homepage';
import axios from 'axios';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.fetchPostFeed = this.fetchPostFeed.bind(this);
  }

  componentDidMount() {
    this.fetchPostFeed();
  }

  fetchPostFeed() {
    let thisIndex = this;
    console.log('starting get request');
    axios.get('/postFeed')
      .then(function (response) {
        console.log('back in the client', response);
        thisIndex.setState({
          messages: response.data
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <AppHeader/>
        <div className="container">
          <HomePage id={this.props.id} posts={this.state.messages} fetchPostFeed={this.fetchPostFeed}/>
        </div>
      </div>
    );
  }
}

export default Main;