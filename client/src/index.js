import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../components/main';
import Login from '../components/userLogin/Login.jsx';
import './index.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import PostInput from './components/PostInput.js';
import Friends from './components/Friends.jsx'
import Login from './components/Login.jsx';
import PostList from './components/PostList.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      messages: []
    };
    this.setAuth = this.setAuth.bind(this);
    this.fetchPostFeed = this.fetchPostFeed.bind(this);
  }

  isAuthenticated() {
    console.log('isAuth:', !!this.state.id);
    return !!this.state.id;
  }

  setAuth(id) {
    console.log('Setting id: ', id);
    this.setState({id: id});
  }

  componentDidMount() {
    this.fetchPostFeed();
  }

  fetchPostFeed() {
    var thisIndex = this;
    console.log('starting get request');
    axios.get('/postFeed')
    .then(function (response) {
      console.log('back in the client', response);
      var reverseData = response.data.reverse();
      thisIndex.setState({
        messages: reverseData
      });
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  render() {
    let component = this;
    return (
      <main>
        <Switch>
          <Route exact path='/' render={() => (component.isAuthenticated() ?
            (<Main />)
            : (<Redirect to={{
              pathname: '/login',
              state: { from: component.location}}}/>)
          )}/>
          <Route exact path='/login' render={() => <Login setAuth={(id) => component.setAuth(id)}/>} />
          <Route exact path='/friends' component={Friends}/>
        </Switch>
        <div>
          <PostInput fetchPostFeed={this.fetchPostFeed}/>
          <PostList posts={this.state.messages} fetchPostFeed={this.fetchPostFeed}/>
          <Login />
        </div>
      </main>
    );
  }
}

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'));