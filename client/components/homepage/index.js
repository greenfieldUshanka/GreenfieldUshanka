import React from 'react';
import { Card, Image, Form, Grid, TextArea, Button, Icon, Header, Label } from 'semantic-ui-react';
import './index.css';
import Status from '../Status.jsx';
import PostInput from '../post/PostInput.js';
import PostList from '../post/PostList';
import axios from 'axios';
import moment from 'moment';


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      work: '',
      join: '',
      vodka: '',
      profilePic: ''
    }
    // {moment(this.state.join).fromNow()}
  }

  getUserInformation() {
    axios.get(`/userProfileInfo/${this.props.id}`)
      .then( response => {
        this.setState({
          username: response.data.username,
          work: response.data.work,
          join: response.data.join,
          vodka: response.data.vodka,
        })
      })
      .catch( err => {

      })
  }

  componentDidMount() {
    this.getUserInformation(); 
    this.props.changePage('homepage');
  }

  render() {
    return (
      <div>
      <header class='home-page-header' >
      <Grid >
        <Grid.Row>
          <Grid.Column width={5} > 
            <Form>
              <Form.Field inline>
                <h1>ushanka</h1>
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column width={9} className='search-friends-bar' >
            <Form>
              <Form.Input icon='users' iconPosition='left' placeholder='Search users...' />
            </Form>
          </Grid.Column>
          <Grid.Column width={2} className='logout-button'>
          <Button>Log out</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </header>
      <div className="container-full-page" >
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Image src='https://source.unsplash.com/1600x400/?nature' rounded  /> 
            </Grid.Column>
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
            <div className='profile-information'>
            <Card>
            <Card.Content header={ `${this.state.username}` } />
            <Card.Content extra >
              <Status  id={this.props.id}/>
            </Card.Content>
            <Card.Content  description={`Workplace: ${this.state.work}`} />
            <Card.Content name='cocktail' description={`Vodka Consumption: ${this.state.vodka}`} />
            <Card.Content  description={'Personal information'} />
            </Card>
            </div>
            </Grid.Column>
            <Grid.Column width={10}>
              <PostInput id={this.props.id} fetchPostFeed={this.props.fetchPostFeed}/>
              <PostList id={this.props.id} posts={this.props.posts} fetchPostFeed={this.props.fetchPostFeed}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </div>
      </div>
    )
  }
}


export default HomePage;