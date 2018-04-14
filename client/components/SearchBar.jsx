import React from 'react';
const axios = require('axios');
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      toFriends: false,
      mounted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.searchFriends = this.searchFriends.bind(this);
    this.preventRedirect = this.preventRedirect.bind(this);
  }

  componentDidMount() {
    this.setState({
      mounted: true
    });
  }

  handleChange(e) {
    this.setState({ searchTerm: e.target.value });
  }



  searchFriends(e) {
    var searchThis = this;
    axios.get('/friends', {
      params: {
        term: searchThis.state.searchTerm,
        id: searchThis.props.id,
      }
    })
    .then(function (res) {
      searchThis.props.onChange(res);
      searchThis.setState({
        searchTerm: '',
        toFriends: true,
      });
    })
    .catch(function (err) {
      console.log(err);
    });
    e.preventDefault();
  }

  preventRedirect() {
      this.setState({
      toFriends: false,
    });
  }


  render() {
    if (this.state.toFriends && this.props.currentPage !== 'friends') {
      if(this.state.mounted) {
        this.preventRedirect();
      return <Redirect to={{
        pathname: '/main/friends',
    }}/>
      }
    }
    return (
      <Form onSubmit={this.searchFriends}>
        <Form.Group>
          <Form.Input size={'small'} placeholder='username' width={6} value={this.state.searchTerm} onChange={this.handleChange} placeholder="Search for friends"/>
          <Button type="submit">Search</Button>
        </Form.Group>
      </Form>
    )
  }
}

export default SearchBar;