import React from 'react';
const axios = require('axios');

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonMessage: 'Add Friend',
    };

    this.addFriend = this.addFriend.bind(this);
  }

  addFriend() {
    // ping server with request to add friend, server -> router -> controller sees if they are your friend
    // and adds them if they aren't and sends back a message with the result regardless, and changes the
    // button text with this message
    console.log('trying to add ', this.props.friend.full_name, ' as a friend')

    axios.post('/addfriend', {
      potentialFriendId: this.props.friend.id, // change this to data I know to test friend logic
      myId: 31, // this will be the id of the logged in user...using 31 bc it is in both columns of table
    })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="ui card">
        <a className="image" href="#">
          <img src={this.props.friend.profile_picture} />
        </a>
        <div className="content">
          <a className="header" href="#">{this.props.friend.full_name}</a>
          <div className="meta">
            <a>{this.props.friend.username}</a><br/>
            <a>Drinks {this.props.friend.vodka_consumption} handles of vodka a week</a>
          </div>
        </div>
        <div className="ui bottom attached button" onClick={this.addFriend}>
          <i className="add icon"></i>
          {this.state.buttonMessage}
        </div>
      </div>
    )
  }
}

export default Card;