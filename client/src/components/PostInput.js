import React from 'react';
import axios from 'axios'

class PostInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
    this.onChange = this.onChange.bind(this);
    this.submitPost = this.submitPost.bind(this);
  }

  onChange (event) {
    this.setState({
      content: event.target.value
    });
  }

  submitPost(event) {
    console.log(this.state.content);
    event.preventDefault();
    axios.post('/posts', {
      id: null,
      post_text: this.state.content,
      createdAt: null,
      id_author: null,
      id_wall: null,
      profile_image: null,
      like_count: null
    }).then(function(response) {
      console.log('Saved message to databeeeesssss');
    })
  }

  render() {
    return (<div className= "ui segment">
      <form className="ui form">
        <div className="field">
          <label>Post Message</label>
          <textarea placeholder="Type American words" rows="3" onChange={this.onChange}>
          </textarea>
        </div>
        <div className="field">
          <button className="ui button" role="button" onClick={this.submitPost}>Post</button>
        </div>
      </form>
    </div>)
  }
}

export default PostInput;