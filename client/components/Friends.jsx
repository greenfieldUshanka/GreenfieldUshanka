// have search bar here and on profile, either search will send search result to server,
// which will route to correct endpoint in the controller, which will ping the database,
// which will then route to this page and display results
// state here will be search term and an array of people objects that will be displayed
// ultimately, will want to show friends first in search results and then everyone else
import React from 'react';
import SearchBar from './SearchBar.jsx';

class Friends extends React.Component {
  constructor() {
    super();

    this.state = {
      friends: [], // this is the array that the search results and friends will show in
    };

  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <SearchBar />
        <div>
          Map through friends array here and display new component friendCard or something like that
        </div>
      </div>
    )
  }
}

export default Friends;