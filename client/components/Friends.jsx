import React from 'react';
import FriendCard from './FriendCard.jsx';

class Friends extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <br/>
        Friends
        <div className="ui stackable cards">
            {this.props.friends.map(f => <FriendCard friend={f} id={this.props.id} key={f.id}/>)}
        </div>
        Potential Friends
        <div className="ui stackable cards">
            {this.props.potentialFriends.map(f => <FriendCard friend={f} id={this.props.id} key={f.id}/>)}
        </div>
      </div>
    )
  }
}

export default Friends;