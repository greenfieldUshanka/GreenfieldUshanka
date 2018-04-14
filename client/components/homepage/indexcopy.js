// import React from 'react';
// import { Card, Image, Form, Grid, TextArea, Button, Icon, Header } from 'semantic-ui-react';
// import './index.css';
// import Status from '../Status.jsx';
// import axios from 'axios';
// import moment from 'moment';


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
  }

  render() {
    return (
      <div className="container-full-page">
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Image src='https://source.unsplash.com/1600x400/?nature' rounded /> 
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column >
              <div className='profile-picture'>
              <Image src='https://source.unsplash.com/300x300/?people' size='medium' rounded />
            </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
            <div className='profile-information'>
            <Card>
            <Card.Content header={ `About ${this.state.username}` } />
            <Card.Content extra >
              <Status  id={this.props.id}/>
            </Card.Content>
            <Card.Content  description={`Workplace: ${this.state.work}`} />
            <Card.Content name='cocktail' description={`Vodka Consumption: ${this.state.vodka}`} />
            <Card.Content  description={`Workplace: ${this.state.work}`} />
            </Card>
            </div>
            </Grid.Column>
            <Grid.Column width={10}>
              <Form>
                <div>
                  <TextArea className="newPost" placeholder="Make a post" rows={3}></TextArea>
                </div>
                <div>
                  <Button>Post</Button>
                </div>
              </Form>
              <Card className="post" fluid>
                <Card.Content>
                  <Card.Header>
                    Username
                  </Card.Header>
                  <Card.Meta>
                    <span className='date'>
                      Date of post
                    </span>
                  </Card.Meta>
                  <Card.Description>
                    Post Content
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card className="post" fluid>
                <Card.Content>
                  <Card.Header>
                    Username
                  </Card.Header>
                  <Card.Meta>
                    <span className='date'>
                      Date of post
                    </span>
                  </Card.Meta>
                  <Card.Description>
                    Post Content2
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card className="post" fluid>
                <Card.Content>
                  <Card.Header>
                    Username
                  </Card.Header>
                  <Card.Meta>
                    <span className='date'>
                      Date of post
                    </span>
                  </Card.Meta>
                  <Card.Description>
                    Post Content3
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}


// export default HomePage;