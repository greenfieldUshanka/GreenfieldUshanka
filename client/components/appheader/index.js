import React from 'react';
import {Form, Grid, Button, Input, Icon, Header} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './index.css';
import SearchBar from '../SearchBar.jsx';


const AppHeader = (props) => {
console.log(props)
return (
<header className='home-page-header'>
<Grid>
<Grid.Row>
<Grid.Column width={4} >
<Form>
<Form.Field inline>
<Header as='h6' icon>
<Icon onClick={() => props.setWallId(props.id)} color={'grey'} name='home' />
</Header>
<Link className='name' to={'/main'}>ushanka</Link>
</Form.Field>
</Form>
</Grid.Column>
<Grid.Column width={1}>
</Grid.Column>
<Grid.Column width={6} className='search-friends-bar' >
<SearchBar onChange={props.onChange} currentPage={props.currentPage} id={props.id}/>
</Grid.Column>
<Grid.Column width={1}>
</Grid.Column>
<Grid.Column width={1}>
</Grid.Column>
<Grid.Column width={1}>
</Grid.Column>
<Grid.Column width={2} >
<Button className='logout-button' onClick={props.logout} >Log out</Button>
</Grid.Column>
</Grid.Row>
</Grid>
</header>
);
};

export default AppHeader;