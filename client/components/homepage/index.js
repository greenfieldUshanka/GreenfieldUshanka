import React from 'react';
import { Card, Image, Form, Grid, Button, Icon, Label } from 'semantic-ui-react';
import './index.css';
import Status from '../Status.jsx';
import PostInput from '../post/PostInput.js';
import PostList from '../post/PostList';
import axios from 'axios';
import moment from 'moment';
import Dropzone from 'react-dropzone';


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      work: '',
      join: '',
      vodka: '',
      profilePic: ''
    };
    this.handleDrop = this.handleDrop.bind(this);
    this.getUserInformation = this.getUserInformation.bind(this);
  }

  getUserInformation() {
    axios.get(`/userProfileInfo/${this.props.id}`)
      .then( response => {
        this.setState({
          username: response.data.username,
          work: response.data.work,
          join: response.data.join,
          vodka: response.data.vodka,
          profilePic: response.data.profilePic
        });
      })
      .catch( err => {

      });
  }

  handleDrop(files) {
    const handleThis = this;
    const uploaders = files.map(file => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "qsfgq2uy"); // Replace the preset name with your own
      formData.append("api_key", "482543561232562"); // Replace API key with your own Cloudinary key
      formData.append("timestamp", (Date.now() / 1000) | 0);

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios.post("https://api.cloudinary.com/v1_1/ushanka/image/upload", formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }).then(response => {
        const data = response.data;
        const fileURL = data.secure_url // You should store this URL for future references in your app
        console.log('data!', data);
        console.log('url!', fileURL);
        axios.post('/upload', {
          url: fileURL,
          userid: this.props.id
        }).then(function(response) {
          console.log('saved to the db, response', response);
          handleThis.getUserInformation();
        })
      })
        .catch(err => {
          console.log(err);
        })
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
                  <Image src={this.state.profilePic} size='medium' rounded >
                  </Image>
                  <Dropzone
                    onDrop={this.handleDrop}
                    accept="image/*"
                  >
                    <p>Drop your files or click here to upload</p>
                  </Dropzone>
                </div>
              </Grid.Column>
            </Grid.Row>
            {/* /////////////////////////////////////////////////////////////////////////////// Friends information  */}
            <Grid.Row>
              <Grid.Column width={6}>
                <div className='friends-profile-information'>
                  <Card>
                    <Card.Content icon='world' header= {`Ushanka member since ${moment(this.state.join).fromNow()}`}/>
                    <Card.Content extra >
                      <Status id={this.props.id}/>
                    </Card.Content>
                    <Card.Content description={`Workplace: ${this.state.work}`} />
                    <Card.Content name='cocktail' description={`Vodka Consumption: ${this.state.vodka}`} />
                    <Card.Content description={'Personal information'} />
                  </Card>
                </div>
                {/* /////////////////////////////////////////////////////////////////////////////// Friends information  */}

                {/* ////////////////////////////////////////////////////////////////////////////////// User information  */}
                <div className='user-profile-information'>
                  <Form>
                    <div className='upi-personal-info'>
                      <Icon name='world' size={'large'} />
                      <Label />
                    </div>
                    <div className='upi-status'>
                      <Status id={this.props.id} />
                    </div>
                    <div className='upi-workplace' >
                      <Form.Input size={'small'} placeholder='Workplace ' width={8} />
                    </div>
                    <div className='upi-vodka'>
                      <Form.Input size={'small'} placeholder='Vodka consumption ' width={6} />
                    </div>
                    <div className='upi-text'>
                      <Form.Input size={'small'} placeholder='What else is on your mind? ' width={6} />
                    </div>
                    <div className='upi-submit'>
                      <Button type='submit'>Submit</Button>
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