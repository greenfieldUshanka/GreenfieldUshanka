import React from 'react';
import { Card, Image, Form, Grid, TextArea, Button, Icon, Dropdown, Label } from 'semantic-ui-react';
import './index.css';
import PostInput from '../post/PostInput.js';
import PostList from '../post/PostList';
import axios from 'axios';
import moment from 'moment';

const vodkaOptions = [{key: '3', text: '0 - 3', value: '0 - 3'}, 
  {key: '7', text: '4 - 7', value: '4 - 7'}, 
  {key: '8', text: '8 - 12', value: '8 - 12'}, 
  {key: '13', text: '13++', value: '13++'}];

const statusOptions = [{key: 'hacking', text: 'Hacking', value: 'Hacking'}, 
{key: 'drunk', text: 'Drunk', value: 'Drunk'}, 
{key: 'sad', text: 'Sad', value: 'Sad'}, 
{key: 'happy', text: 'Happy', value: 'Happy'}]

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      work: '',
      join: '',
      profilePic: '',
      vodka: 'Vodka Consumption',
      friends: [],
      mood: 'Status',
    };
    this.saveUserEditInformation = this.saveUserEditInformation.bind(this);
  }

  getUserInformation() {
    axios.get(`/userProfileInfo/${this.props.id}`)
      .then( response => {
        this.setState({
          username: response.data.username,
          work: response.data.work,
          join: response.data.join,
          vodka: response.data.vodka,
          mood: response.data.status,
          extra: response.data.extra
        });
      })
      .catch( err => {
      });
  }
 
  getFriends() {
    let component = this;
    axios.get('/friends/' + this.props.id)
      .then(response => {
        if (response.data && response.data.length > 0) {
          component.setState({
            friends: response.data
          });
        }
      })
      .catch(err => {
        console.log('error getting friends:', err);
      })
  }

  getFriendsViewInformation() {
    axios.get(`/`)
  }

  saveUserEditInformation() {
    const profileUpdate = {
      status: this.state.mood, 
      work: this.state.work,
      vodka: this.state.vodka,
      extra: this.state.extra, 
      id: this.props.id
    };

    axios.post('/editprofile', profileUpdate)
      .then( response => {
        console.log('Response ', response);
      })
      .catch( err => {
        console.log('Error ', err);
      });
  }

  userVodkaTake(e, data) {
    this.setState({
      vodka: data.value, 
    });
  }

  userWork(e, data) {
    this.setState({
      work: data.value, 
    });
  }

  userMind(e, data) {
    this.setState({
      extra: data.value 
    })
  }

  userStatus(e, data) {
    this.setState({
      mood: data.value, 
    });
  }

  componentDidMount() {
    this.getUserInformation();
    this.getFriends();
    this.props.changePage('homepage');
  }

  render() {
    if (this.props.id === this.props.wallId){

      return (
        <div>
          <div className="container-full-page" >
            <Grid>
              <Grid.Row>
                <Grid.Column width={16}>
                  <div>
                    <Image src='https://source.unsplash.com/1600x400/?nature' rounded /> 
                    <div className='username-on-image'><h1>{this.state.username.toUpperCase()}</h1></div>
                  </div>
                </Grid.Column >
              </Grid.Row>
              <Grid.Row>
                <Grid.Column >
                  <div className='profile-picture'>
                    <Image src='https://source.unsplash.com/300x300/?people' size='medium' rounded >
                    </Image>


                    <div className='friends-list'>
                    <Card.Group>

                    {
                      this.state.friends.length ? (

                      this.state.friends.map(friend =>
                      <Card className='friend-entry'>
                        <Card.Header> 
                        <Image onClick={() => this.props.setWallId(friend.id)} floated='right' size='small' src={friend.profile_picture} key={friend.id} />
                          {friend.full_name.toUpperCase()}
                        </Card.Header>
                      </Card>
                      )) : (
                        <Card className='friend-entry'>
                        <Card.Header> 
                        </Card.Header>
                      </Card>
                      )
                    }
                    </Card.Group>
                  </div>
                  </div>


                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={6}>
                  <div className='user-profile-information'>
                    <Form onSubmit={this.saveUserEditInformation}>
                      <div className='upi-personal-info'>
                        <Icon name='world' size={'large'} />
                        <Label>Update your personal Information</Label>
                      </div>
                      <div className='upi-status'>
                      <Dropdown
                          onChange={this.userStatus.bind(this)}
                          button 
                          className='icon'
                          floating
                          labeled
                          icon='barcode'
                          options={statusOptions}
                          search
                          text={this.state.mood}
                        />
                      </div>
                      <div className='upi-workplace' >
                        <Form.Input className='input-workplace' size={'small'} placeholder='Workplace ' onChange={this.userWork.bind(this)}/>
                      </div>
                      <div className='upi-vodka'>
                        <Dropdown
                          onChange={this.userVodkaTake.bind(this)}
                          button 
                          className='icon'
                          floating
                          labeled
                          icon='cocktail'
                          options={vodkaOptions}
                          search
                          text={this.state.vodka}
                        />
                      </div>
                      <div className='upi-text'>
                        <Form.Input size={'small'} placeholder='What else is on your mind? ' onChange={this.userMind.bind(this)} />
                      </div>
                      <div className='upi-submit'>
                        <Button type='submit'>Update Changes</Button>
                      </div>
                    </Form>
                  </div>
                </Grid.Column>
                <Grid.Column width={10}>
                  <PostInput id={this.props.id} wallId={this.props.wallId} fetchPostFeed={this.props.fetchPostFeed}/>
                  <PostList id={this.props.id} posts={this.props.posts} fetchPostFeed={this.props.fetchPostFeed}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="container-full-page" >
            <Grid>
              <Grid.Row>
                <Grid.Column width={16}>
                  <div>
                    <Image src='https://source.unsplash.com/1600x400/?nature' rounded /> 
                    <div className='username-on-image'><h1>{this.state.username.toUpperCase()}</h1></div>
                  </div>
                </Grid.Column >
              </Grid.Row>
  
              <Grid.Row>
                <Grid.Column >
                  <div className='profile-picture'>
                    <Image src='https://source.unsplash.com/300x300/?people' size='medium' rounded >
                    </Image>
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={6}>
                  <div className='friends-profile-information'>
                    <Card>
                      <Card.Content header= {`Ushanka member since ${moment(this.state.join).fromNow()}`}/>
                      <Card.Content description={`Current status: ${this.state.mood} `} >
                      </Card.Content>
                      <Card.Content description={`Workplace: ${this.state.work}`} />
                      <Card.Content name='cocktail' description={`Vodka Consumption: ${this.state.vodka}`} />
                      <Card.Content maxLength="2" description={this.state.extra} />
                    </Card>
                  </div>
                </Grid.Column>
  
  
                <Grid.Column width={10}>
                  <PostInput id={this.props.id} wallId={this.props.wallId} fetchPostFeed={this.props.fetchPostFeed}/>
                  <PostList id={this.props.id} posts={this.props.posts} fetchPostFeed={this.props.fetchPostFeed}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
      );
    }
  }
}

export default HomePage;