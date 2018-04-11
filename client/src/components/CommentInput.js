import React from 'react';
import axios from 'axios'

class CommentInput extends React.Component {
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
      id_wall: null
    })
  }

  render() {
    return (<div className="ui comments">
  <form className="ui form">
    <div className="field">
      <textarea placeholder="Share big American opinion" rows="1" onChange={this.onChange}>
      </textarea>
    </div>
    <div className="field">
          <button className="small ui button" role="button" onClick={this.submitPost}>Comment</button>
        </div>
  </form>
</div>)
  }
}

export default CommentInput;