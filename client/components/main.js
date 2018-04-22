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
      profileInfo: {
        username: '',
        work: '',
        join: '',
        extra: '',
        profilePic: '',
        vodka: '',
        mood: '',
      }
    };
    this.fetchPostFeed = this.fetchPostFeed.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changePage = this.changePage.bind(this);
    this.setWallId = this.setWallId.bind(this);
    this.getUserProfile = this.getUserProfile.bind(this);
  }

  componentDidMount() {
    this.fetchPostFeed();
    this.getUserProfile();
  }

  setWallId(id) {
    this.setState({
      wallId: id
    });
    console.log('from main', this.state.wallId);
    this.fetchPostFeed(id);
    this.getUserProfile(id);
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
  getUserProfile(wallId = this.state.wallId) {
    axios.get(`/userProfileInfo/${wallId}`)
      .then( response => {
        let profileInfo = Object.assign({}, this.state.profileInfo); //creating copy of object
        profileInfo.username = response.data.username;
        profileInfo.work = response.data.work;
        profileInfo.join = response.data.join;
        profileInfo.extra = response.data.extra;
        profileInfo.profilePic = response.data.profilePic;
        if (response.data.vodka !== null) {
          profileInfo.vodka = response.data.vodka;
        } else {
          profileInfo.vodka = 'Vodka Consumption';
        }
        if (response.data.status !== null) {
          profileInfo.mood = response.data.status;
        } else {
          profileInfo.mood = 'Status';
        }
        this.setState({profileInfo});
        this.fetchPostFeed();
      })
      .catch( err => {
      });
  }
  render() {
    return (
      <div>
        <AppHeader logout={this.props.logout} onChange={this.handleChange} id={this.props.id} currentPage={this.state.currentPage} setWallId={this.setWallId}/>
        <div className="container">
          <Switch>
            <Route exact path ='/main/friends' render={() => <Friends onChange={this.handleChange} changePage={this.changePage} friends={this.state.friends} id={this.props.id} potentialFriends={this.state.potentialFriends}/>} />
            <Route exact path ='/main' render={() => <HomePage setWallId={(id) => this.setWallId(id)} wallId={this.state.wallId} posts={this.state.messages} fetchPostFeed={this.fetchPostFeed} changePage={this.changePage} id={this.props.id} userInfo={this.state.profileInfo} friendProfile={this.getUserProfile} />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Main;