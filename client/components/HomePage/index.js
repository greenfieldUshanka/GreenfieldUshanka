import React from 'react';
import { Header, Image, Form, Input, Grid } from 'semantic-ui-react';
import './index.css';

const AppHeader = (props) => {
  return (
    <div class="container-full-page">
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Image src='https://source.unsplash.com/851x205/?cat' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            Stuff
          </Grid.Column>
          <Grid.Column width={10}>
            Stuff2
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default AppHeader;