import React, { Component } from 'react'; 
import { Dropdown } from 'semantic-ui-react';
const statusOptions = [{key: 'hacking', text: 'hacking', value: 'hacking'}, 
{key: 'drunk', text: 'drunk', value: 'drunk'}, 
{key: 'sad', text: 'sad', value: 'sad'}, 
{key: 'happy', text: 'happy', value: 'happy'}]

class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mood: '' 
        }
    }

    userState(data) {
      this.setState({mood: data.value})
    }

    render() {
      const {mood} = this.state; 
        return(
            <Dropdown
            onChange={this.userState}
            button 
            className='icon'
            floating
            labeled
            icon='barcode'
            options={statusOptions}
            search
            text='Status'
            value={mood}
          />
        ) 
    }
}

export default Status; 