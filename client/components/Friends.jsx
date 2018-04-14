import React from 'react';
import FriendCard from './FriendCard.jsx';
import AppHeader from './appheader/index.js';

class Friends extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.changePage('friends');
  }

  render() {
    return (
      <div>
      {/* <AppHeader onChange={this.props.onChange} id={this.props.id}/> */}
        <br/>
        Friends
        <div className="ui stackable cards">
          <br/>
            {this.props.friends.length ? this.props.friends.map(f => <FriendCard friend={f} id={this.props.id} key={f.id}/>) : "You have no friends with that name!"}
        </div>
        <br/>
        Potential Friends
        <div className="ui stackable cards">
            {this.props.potentialFriends.map(f => <FriendCard friend={f} id={this.props.id} key={f.id}/>)}
        </div>
      </div>
    )
  }
}

export default Friends;