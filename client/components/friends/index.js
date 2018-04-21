import React from 'react';
import FriendCard from '../FriendCard.jsx';
import {Grid} from 'semantic-ui-react';
import './index.css';


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
        <Grid>
          <Grid.Row>
            <Grid.Column width={2} >
            </Grid.Column>
            <Grid.Column width={12} >
              <div className="card-area">
                <br/>
              Friends
                <div className="ui stackable cards">
                  <br/>
                  {this.props.friends.length ? this.props.friends.map(f => <FriendCard friend={f} id={this.props.id} key={f.id}/>) : 'You have no friends with that name!'}
                </div>
                <br/>
              Potential Friends
                <div className="ui stackable cards">
                  {this.props.potentialFriends.map(f => <FriendCard friend={f} id={this.props.id} key={f.id}/>)}
                </div>
              </div>
            </Grid.Column>
            <Grid.Column width={2} >
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Friends;