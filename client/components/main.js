import React from 'react';
import AppHeader from './appheader';
import HomePage from './homepage';
import axios from 'axios';
import Friends from './friends';
import { Switch, Route } from 'react-router-dom';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      friends: [],
      potentialFriends: [],
      currentPage: 'homepage', //update this to whatever is first loaded
      wallId: this.props.id, 
    };
    this.fetchPostFeed = this.fetchPostFeed.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changePage = this.changePage.bind(this);
    this.setWallId = this.setWallId.bind(this);
  }

  componentDidMount() {
    this.fetchPostFeed();
  }

  setWallId(id) {
    this.setState({
      wallId: id
    });
    this.fetchPostFeed(id); // XXX: fix this later
  }

  handleChange(obj) {
    this.setState({
      friends: obj.data.filter((data) => {
        return (data.id !== this.props.id && data.is_my_friend === '1');
      }),
      potentialFriends: obj.data.filter((data) => {
        return (data.id !== this.props.id && data.is_my_friend === '0');
      })
    });
  }

  fetchUsersInfo() {
    axios.get(`/render/wall/${this.state.wallId}`)
      .then( response => {
        console.log('RESPONSE FROM MAIN.JS ', response);
      })
      .catch( err => {
        console.log('Error from main.js', err);
      });
  }

  fetchPostFeed(wallId = this.state.wallId) {
    let thisIndex = this;
    axios.get('/postFeed/' + wallId)
      .then(function (response) {
        thisIndex.setState({
          messages: response.data || []
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  
  changePage(page) {
    this.setState({
      currentPage: page,
    });
  }

  render() {
    return (
      <div>
        <AppHeader logout={this.props.logout} onChange={this.handleChange} id={this.props.id} currentPage={this.state.currentPage}  setWallId={(id) => this.setWallId(id)}/>
        <div className="container">
          <Switch>
            <Route exact path ='/main/friends' render={() => <Friends onChange={this.handleChange} changePage={this.changePage} friends={this.state.friends} id={this.props.id} potentialFriends={this.state.potentialFriends}/>} />
            <Route exact path ='/main' render={() => <HomePage setWallId={(id) => this.setWallId(id)} wallId={this.state.wallId} posts={this.state.messages} fetchPostFeed={this.fetchPostFeed} changePage={this.changePage} id={this.props.id}/>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Main;