import React from 'react';
import {Form, Input, Grid} from 'semantic-ui-react';
import './index.css';

const AppHeader = (props) => {
  return (
    <header>
      <Grid>
        <Grid.Row>
          <Grid.Column width={15}>
            <Form>
              <Form.Field inline>
                <label>Ushanka Icon placeholder</label>
                <Input size={'mini'} placeholder='Search for friends...'/>

              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column width={1}>
            Logout
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </header>
  );
};

export default AppHeader;