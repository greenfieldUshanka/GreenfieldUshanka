import React from 'react';
import {Form, Input, Grid} from 'semantic-ui-react';
import './index.css';
import SearchBar from '../SearchBar.jsx';

const AppHeader = (props) => {
  return (
    <header id='home-page-header'>
      <Grid>
        <Grid.Row>
          <Grid.Column width={5} > 
            <Form>
              <Form.Field inline>
                <h1>ushanka</h1>
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column width={9} className='search-friends-bar' >  
            <SearchBar onChange={props.onChange} currentPage={props.currentPage} id={props.id}/>
          </Grid.Column>
          <Grid.Column width={2} className='logout-button'  >
          <Button onClick={props.logout}>Log out</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </header>
  );
};

// export default AppHeader;