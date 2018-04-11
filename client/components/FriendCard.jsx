import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props);
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
        <div className="ui bottom attached button">
          <i className="add icon"></i>
          Add Friend
        </div>
      </div>
    )
  }
}

export default Card;