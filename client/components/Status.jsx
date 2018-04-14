import React, { Component } from 'react'; 
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios'; 
const statusOptions = [{key: 'hacking', text: 'Hacking', value: 'Hacking'}, 
{key: 'drunk', text: 'Drunk', value: 'Drunk'}, 
{key: 'sad', text: 'Sad', value: 'Sad'}, 
{key: 'happy', text: 'Happy', value: 'Happy'}]

class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: 'Status', 
      id: props.id
    }
  }

  userState(e, data) {
    this.setState({mood: data.value})

    const payload = {
      id: this.state.id,
      mood: data.value
    }
    //Save status in the database? 
    
    // axios.post('/status', payload)
    //   .then( response => {
    //     console.log('Response from status.jsx', response);
    //   })
    //   .catch( err => {
    //     console.log('Error from Status.jsx', err);
    //   })
  }

  render() {
    return(
      <Dropdown
      onChange={this.userState.bind(this)}
      button 
      className='icon'
      floating
      labeled
      icon='barcode'
      options={statusOptions}
      search
      text={this.state.mood}
    />
    ) 
  }
}

export default Status; 