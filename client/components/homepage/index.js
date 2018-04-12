import React from 'react';
import { Card, Image, Form, Grid, TextArea, Button } from 'semantic-ui-react';
import './index.css';
import Status from '../Status.jsx';

const HomePage = (props) => {
  return (
    <div className="container-full-page">
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Image src='https://source.unsplash.com/851x205/?cat' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            Username goes here
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            <Status />
            <div>Personal Info</div>
            <div>More stuff</div>
            <div>Even more profile info</div>
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
  );
};

export default HomePage;