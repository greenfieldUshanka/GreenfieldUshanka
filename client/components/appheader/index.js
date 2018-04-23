import React from 'react';
import {Form, Grid, Button, Input, Icon, Header} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './index.css';
import SearchBar from '../SearchBar.jsx';



class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.backToUserProfile = this.backToUserProfile.bind(this);
  }
  backToUserProfile() {
    this.props.setWallId(this.props.id);
    console.log('FROM APPHEADER', this.props.id);
  }

  render() {
    console.log('APPHEADER', this.props);
    return (
      <header className='home-page-header'>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Form>
                <Form.Field inline>
                  <Header as='h6' icon>
                    <Icon onClick={this.backToUserProfile} color={'grey'} name='home' />
                  </Header>
                  <Link className='name' to={'/main'}>ushanka</Link>
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column width={1}>
            </Grid.Column>
            <Grid.Column width={7} className='search-friends-bar'>
              <SearchBar onChange={this.props.onChange} currentPage={this.props.currentPage} id={this.props.id}/>
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
            <Grid.Column width={1}>
            </Grid.Column>
            <Grid.Column width={1}>
            </Grid.Column>
            <Grid.Column width={2} className='logout-button'>
              <Button floated='right' size={'mini'} onClick={this.props.logout}>Log out</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </header>
    );
  }
}

export default AppHeader;