import React from 'react';
const axios = require('axios');

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonMessage: props.friend.is_my_friend === '0' ? 'Add Friend' : 'Remove Friend',
    };

    this.toggleFriend = this.toggleFriend.bind(this);
  }

  toggleFriend() {
    // ping server with request to add friend, server -> router -> controller sees if they are your friend
    // and adds them if they aren't and sends back a message with the result regardless, and changes the
    // button text with this message
    var refThis = this;
    axios.post('/toggleFriend', {
      potentialFriendId: this.props.friend.id, // change this to data I know to test friend logic
      id: this.props.id, 
      button: this.state.buttonMessage,
    })
      .then(function (res) {
        if (res.data === 'added') {
          refThis.setState({
            buttonMessage: 'Friend Added!'
          });
          if (refThis.state.buttonMessage === 'Friend Added!') {
            setTimeout(() => {
              refThis.setState({
                buttonMessage: 'Remove Friend'
              });
            }, 1500);
          }
        } else if (res.data === 'deleted') {
          refThis.setState({
            buttonMessage: 'Friend Removed!'
          });
          if (refThis.state.buttonMessage === 'Friend Removed!') {
            setTimeout(() => {
              refThis.setState({
                buttonMessage: 'Add Friend'
              });
            }, 1500);
          }
        }
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
        <div className="ui bottom attached button" onClick={this.toggleFriend}>
          <i className="add icon"></i>
          {this.state.buttonMessage}
        </div>
      </div>
    );
  }
}

export default Card;