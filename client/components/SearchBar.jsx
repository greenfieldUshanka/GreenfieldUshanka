import React from 'react';
const axios = require('axios');

class SearchBar extends React.Component {
  constructor() {
    super();

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
    axios.get(`/friends?ID=${this.state.searchTerm}`)
    .then(function (res) {
      console.log(res); // should be an array of people objects
      //set state in here....clear search box and pass array of friends up through props
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
          Search:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default SearchBar;