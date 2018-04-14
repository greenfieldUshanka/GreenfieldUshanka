import React from 'react';
import AppHeader from './appheader';
import HomePage from './homepage';
import axios from 'axios';
import Friends from './Friends.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      friends: [],
      potentialFriends: [],
    };
    this.fetchPostFeed = this.fetchPostFeed.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchPostFeed();
  }

  handleChange(obj) {
    console.log('handle change in main ', obj)
    this.setState({
      friends: obj.data.filter((data) => {
        return (data.id !== this.props.id && data.is_my_friend === '1')}),
      potentialFriends: obj.data.filter((data) => {
        return (data.id !== this.props.id && data.is_my_friend === '0')})
      });
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
        <AppHeader onChange={this.handleChange} id={this.props.id}/>
        <div className="container">
          <HomePage id={this.props.id} posts={this.state.messages} fetchPostFeed={this.fetchPostFeed}/>
          <Friends friends={this.state.friends} id={this.props.id} potentialFriends={this.state.potentialFriends}/>
        </div>
      </div>
    );
  }
}

export default Main;