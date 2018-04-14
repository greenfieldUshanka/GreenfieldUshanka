import React from 'react';
import {Form, Input, Grid} from 'semantic-ui-react';
import './index.css';
import SearchBar from '../SearchBar.jsx';

const AppHeader = (props) => {
  return (
    <header>
      <Grid>
        <Grid.Row>
          <Grid.Column width={15}>
              Ushanka Icon placeholder
            <SearchBar onChange={props.onChange} currentPage={props.currentPage} id={props.id}/>
          </Grid.Column>
          <Grid.Column width={1} onClick={props.logout}>
            Logout
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </header>
  );
};

export default AppHeader;