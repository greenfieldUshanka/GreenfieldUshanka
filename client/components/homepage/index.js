import React from 'react';
import GridColumn, { Card, Image, Form, Grid, TextArea, Button, Icon, Dropdown, Label, Header } from 'semantic-ui-react';
import './index.css';
import PostInput from '../post/PostInput.js';
import PostList from '../post/PostList';
import axios from 'axios';
import moment from 'moment';
import io from 'socket.io-client';
import GridRow from 'semantic-ui-react';

const vodkaOptions = [{key: '3', text: '0 - 3', value: '0 - 3'}, 
  {key: '7', text: '4 - 7', value: '4 - 7'}, 
  {key: '8', text: '8 - 12', value: '8 - 12'}, 
  {key: '13', text: '13++', value: '13++'}];

const statusOptions = [{key: 'hacking', text: 'Hacking', value: 'Hacking'}, 
  {key: 'drunk', text: 'Drunk', value: 'Drunk'}, 
  {key: 'sad', text: 'Sad', value: 'Sad'}, 
  {key: 'happy', text: 'Happy', value: 'Happy'}];

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      work: '',
      join: '',
      profilePic: '',
      friends: [],
      viewId: this.props.wallId,
      currentMsg: '',
      messages: [],
    };
    this.socket = io('http://localhost:3000');
    this.saveUserEditInformation = this.saveUserEditInformation.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  componentDidMount() {
    this.socket.on('msg', (msg) => {
      console.log('=> ', msg);
    }); 
  }

  submitMessage(event) {
    this.socket.emit('new-message', {message: this.state.currentMsg});
  }

  handleCurrentMsg(e) {
    this.setState({currentMsg: e.target.value});
    console.log('handleMsg', this.state.currentMsg);
  }

  getUserInformation() {
    axios.get(`/userProfileInfo/${this.state.viewId}`)
      .then( response => {
        this.setState({
          username: response.data.username,
          work: response.data.work,
          join: response.data.join,  
          extra: response.data.extra
        });
        if (response.data.vodka !== null) {
          this.setState({
            vodka: response.data.vodka,
          });
        } else {
          this.setState({
            vodka: 'Vodka Consumption',
          });
        }
        if (response.data.status !== null) {
          this.setState({
            mood: response.data.status,
          });
        } else {
          this.setState({
            mood: 'Status',
          });
        }
      })
      .catch( err => {
      });
  }

  getFriendInfo(id) {
    this.props.setWallId(id);
    this.setState({viewId: this.props.wallId});
    this.getUserInformation(this.props.wallId);
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
      });
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
    });
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
    console.log('id', this.props.id, 'wallId', this.props.wallId);
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
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column >
                <div className='profile-picture'>
                  <Image src='https://source.unsplash.com/300x300/?people' size='medium' rounded >
                  </Image>
                  <div className='friends-list'>
                    {
                      this.state.friends.length ? (
                        this.state.friends.map(friend =>
                          <div className='each-friend'>
                            <div className='each-friend-name'>
                              {friend.full_name.toUpperCase()}
                            </div> 
                            <div className='friend-image'>                      
                              <Image src={friend.profile_picture} onClick={() => this.getFriendInfo(friend.id)} floated='right' size='big' key={friend.id} />
                            </div>
                          </div>
                        )) : (
                        null
                      )
                    }
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              {
                this.props.id === this.props.wallId ? 
                  (<Grid.Column width={6}>
                    <div className='user-profile-information'>
                      <Form onSubmit={this.saveUserEditInformation}>
                        <div className='upi-personal-info'>
                          <Header size='medium'>
                            <Icon name='world' />
                            <Header.Content>
                                Personal Information
                            </Header.Content>
                          </Header>
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
                          <label>Add a workplace</label>
                          <Form.Input className='input-workplace' width={14} size={'mini'} placeholder={this.state.work} onChange={this.userWork.bind(this)}/>
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
                          <label>What else is on your mind?</label>
                          <Form.Input size={'mini'} width={14} placeholder={this.state.extra} onChange={this.userMind.bind(this)} />
                        </div>
                        <div className='upi-submit'>
                          <Button type='submit'>Update Changes</Button>
                        </div>
                      </Form>
                    </div>
                  </Grid.Column>)
                  :
                  (<Grid.Column width={6}>
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
                  </Grid.Column>)
              }
              <Grid.Column width={10}>
                <PostInput id={this.props.id} wallId={this.props.wallId} fetchPostFeed={this.props.fetchPostFeed}/>
                <PostList id={this.props.id} posts={this.props.posts} fetchPostFeed={this.props.fetchPostFeed}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={4}>
                <div className='chat-box'>
                  <Form onSubmit={this.submitMessage}>
                    <Form.Input type='text' name='msg' onChange={this.handleCurrentMsg.bind(this)} />
                    <Button type='submit'>Send</Button>
                  </Form>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div> 
    );
  }
}


export default HomePage;