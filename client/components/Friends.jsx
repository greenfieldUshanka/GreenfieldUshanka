// have search bar here and on profile, either search will send search result to server,
// which will route to correct endpoint in the controller, which will ping the database,
// which will then route to this page and display results
// state here will be array of people objects that will be displayed
// ultimately, will want to show friends first in search results and then everyone else

import React from 'react';
import SearchBar from './SearchBar.jsx';
import FriendCard from './FriendCard.jsx';

class Friends extends React.Component {
  constructor() {
    super();

    this.state = {
      friends: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {

  }

  handleChange(obj) {
    this.setState({
      friends: obj.data,
    });
  }

  render() {
    return (
      <div>
        <SearchBar onChange={this.handleChange}/>
        <br/>
        <div className="ui stackable cards">
            {this.state.friends.map(f => <FriendCard friend={f} key={f.id}/>)}
        </div>
      </div>
    )
  }
}

export default Friends;