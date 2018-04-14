import React from 'react';
import { Card, Image, Form, Grid, Button } from 'semantic-ui-react';
import './index.css';
import Status from '../Status.jsx';
import PostInput from '../post/PostInput.js';
import PostList from '../post/PostList';

const HomePage = (props) => {
  return (
    <div className="container-full-page">
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Image src='https://source.unsplash.com/960x205/?cat' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            Username goes here
            <div><Status /></div>
            <div>Personal Info</div>
            <div>More stuff</div>
            <div>Even more profile info</div>
          </Grid.Column>
          <Grid.Column width={10}>
            <PostInput id={props.id} fetchPostFeed={props.fetchPostFeed}/>
            <PostList id={props.id} posts={props.posts} fetchPostFeed={props.fetchPostFeed}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default HomePage;