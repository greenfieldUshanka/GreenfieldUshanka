import React from 'react';
const axios = require('axios');

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.searchFriends = this.searchFriends.bind(this);
  }

  componentDidMount() {

  }

  handleChange(e) {
    this.setState({ searchTerm: e.target.value });
  }



  searchFriends(e) {
    var searchThis = this;
    axios.get('/friends', {
      params: {
        term: searchThis.state.searchTerm,
        id: searchThis.props.id, // hard coded for now until i can get the ID
      }
    })
    .then(function (res) {
      searchThis.props.onChange(res);
      searchThis.setState({
        searchTerm: '',
      });
      
    })
    .catch(function (err) {
      console.log(err);
    });
    e.preventDefault();
  }


  render() {
    return (
      <form onSubmit={this.searchFriends}>
        <label>
          <input type="text" value={this.state.searchTerm} onChange={this.handleChange} placeholder="Search for friends"/>
        </label>
        <a> </a>
        <input type="submit" className="mini ui button" value="Search" />
      </form>
    )
  }
}

export default SearchBar;