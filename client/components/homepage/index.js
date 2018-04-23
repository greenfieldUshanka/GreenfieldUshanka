import React from 'react';
import GridColumn, { Card, Image, Form, Grid, TextArea, Button, Icon, Dropdown, Label, Header } from 'semantic-ui-react';
import './index.css';
import PostInput from '../post/PostInput.js';
import PostList from '../post/PostList';
import axios from 'axios';
import moment from 'moment';
import io from 'socket.io-client';
import GridRow from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
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
      currentMsg: '',
      messages: [],
      newMsg: ''
    };
    this.socket = io('http://localhost:9001');
    this.saveUserEditInformation = this.saveUserEditInformation.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  submitMessage(event) {
    this.socket.emit('new-message', {message: this.state.currentMsg});
  }
  handleCurrentMsg(e) {
    this.setState({currentMsg: e.target.value});
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

  handleDrop(files) {
    const handleThis = this;
    const uploaders = files.map(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', 'codeinfuse, medium, gist');
      formData.append('upload_preset', 'qsfgq2uy'); // Replace the preset name with your own
      formData.append('api_key', '482543561232562'); // Replace API key with your own Cloudinary key
      formData.append('timestamp', (Date.now() / 1000) | 0);
    
      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios.post('https://api.cloudinary.com/v1_1/ushanka/image/upload', formData, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      }).then(response => {
        const data = response.data;
        const fileURL = data.secure_url; // You should store this URL for future references in your app
        const resizedURL = [fileURL.slice(0, 48), 'w_300,h_300/', fileURL.slice(48)].join('');
        console.log('data!', data);
        console.log('url!', fileURL);
        console.log('resized url!', resizedURL);
        axios.post('/upload', {
          url: resizedURL,
          userid: this.props.id
        }).then(function(response) {
          console.log('saved to the db, response', response);
          handleThis.props.friendProfile(handleThis.props.id);
        });
      })
        .catch(err => {
          console.log(err);
        });
    });
  }
  componentDidMount() {
    this.getFriends();
    this.props.changePage('homepage');
    this.socket.on('msg', (msg) => {
      console.log(msg);
    }); 
  }
  render() {
    console.log('props', this.props);
    console.log('id', this.props.id, 'wall', this.props.wallId, 'view', this.state.viewId);
    return (
      <div>
        <div className="container-full-page" >
          <Grid>
            <Grid.Row>
              <Grid.Column width={16}>
                <div>
                  <Image src='https://source.unsplash.com/1600x400/?nature' rounded /> 
                  <div className='username-on-image'><h1>{this.props.userInfo.username.toUpperCase()}</h1></div>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column >
                <div className='profile-picture'>
                  <Dropzone
                    className="dropzone"
                    onDrop={this.handleDrop}
                    accept="image/*"
                  >
                    <Image src={this.props.userInfo.profilePic} size='massive' rounded >
                  </Image>
                  </Dropzone>
                  <div className='friends-list'>
                    {
                      this.state.friends.length ? (
                        this.state.friends.map(friend =>
                          <div className='each-friend'>
                            <div className='each-friend-name'>
                              {friend.full_name.toUpperCase()}
                            </div> 
                            <div className='friend-image'>                      
                              <Image src={friend.profile_picture} onClick={() => this.props.friendProfile(friend.id)} onClick={() => this.props.setWallId(friend.id)} floated='right' size='big' key={friend.id} />
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
                            text={this.props.userInfo.mood}
                          />
                        </div>
                        <div className='upi-workplace' >
                          <label>Add a workplace</label>
                          <Form.Input className='input-workplace' width={14} size={'mini'} placeholder={this.props.userInfo.work} onChange={this.userWork.bind(this)}/>
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
                            text={this.props.userInfo.vodka}
                          />
                        </div>
                        <div className='upi-text'>
                          <label>What else is on your mind?</label>
                          <Form.Input size={'mini'} width={14} placeholder={this.props.userInfo.extra} onChange={this.userMind.bind(this)} />
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
                        <Card.Content description={`Current status: ${this.props.userInfo.mood} `} >
                        </Card.Content>
                        <Card.Content description={`Workplace: ${this.props.userInfo.work}`} />
                        <Card.Content name='cocktail' description={`Vodka Consumption: ${this.props.userInfo.vodka}`} />
                        <Card.Content maxLength="2" description={this.props.userInfo.extra} />
                      </Card>
                    </div>
                  </Grid.Column>)
              }
              <Grid.Column width={10}>
                <PostInput id={this.props.id} wallId={this.props.wallId} profilePic={this.props.userInfo.profilePic} fetchPostFeed={this.props.fetchPostFeed}/>
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