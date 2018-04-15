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
      work: 'Unemployed',
      join: '',
      profilePic: '',
      vodkaTake: 'Vodka Consumption',
      status: '', 
      mood: 'Status',
    };
    
    this.saveUserEditInformation = this.saveUserEditInformation.bind(this);
  }

  getUserInformation() {
    axios.get(`/userProfileInfo/${this.props.id}`)
      .then( response => {
        console.log('Response from homepage', response)
        this.setState({
          username: response.data.username,
          work: response.data.work,
          join: response.data.join,
          vodkaTake: response.data.vodka,
          mood: response.data.status,
          extra: response.data.extra
        });
      })
      .catch( err => {
      });
  }

  saveUserEditInformation() {

    const profileupdate = {
      status: this.state.mood, 
      work: this.state.work,
      vodka: this.state.vodkaTake,
      extra: this.state.extra, 
      id: this.props.id
    };

    axios.post('/editprofile', profileupdate)
      .then( response => {
        console.log('Response ', response);
      })
      .catch( err => {
        console.log('Error ', err);
      });
  }

  userVodkaTake(e, data) {
    this.setState({
      vodkaTake: data.value, 
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
    this.props.changePage('homepage');
  }

  render() {
    return (
      <div>
        <div className="container-full-page" >
          <Grid>
            <Grid.Row>
              <Grid.Column width={16}>
                <div>
                  <Image src='https://source.unsplash.com/1600x400/?nature' rounded /> 
                  <div className='username-on-image'><h1>{this.state.username}</h1></div>
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
            {/* /////////////////////////////////////////////////////////////////////////////// Friends information  */}
            <Grid.Row>
              <Grid.Column width={6}>
                <div className='friends-profile-information'>
                  <Card>
                    <Card.Content header= {`Ushanka member since ${moment(this.state.join).fromNow()}`}/>
                    <Card.Content description={`Current status: ${this.state.mood} `} >
                    </Card.Content>
                    <Card.Content description={`Workplace: ${this.state.work}`} />
                    <Card.Content name='cocktail' description={`Vodka Consumption: ${this.state.vodkaTake}`} />
                    <Card.Content maxLength="2" description={this.state.extra} />
                  </Card>
                </div>
                {/* /////////////////////////////////////////////////////////////////////////////// Friends information  */}

                {/* ////////////////////////////////////////////////////////////////////////////////// User information  */}
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
                        text={this.state.vodkaTake}
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

                {/* ////////////////////////////////////////////////////////////////////////////////// User information  */}
              </Grid.Column>
              <Grid.Column width={10}>
                <PostInput id={this.props.id} fetchPostFeed={this.props.fetchPostFeed}/>
                <PostList id={this.props.id} posts={this.props.posts} fetchPostFeed={this.props.fetchPostFeed}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}


export default HomePage;