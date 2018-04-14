import React from 'react';
import axios from 'axios';

class CommentInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      post: props.postId
    };
    console.log(props);
    this.onChange = this.onChange.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }

  onChange (event) {
    this.setState({
      content: event.target.value
    });
  }

  submitComment(event) {
    var thisSubmitComment = this;
    event.preventDefault();
    axios.post('/comments', {
      id: null,
      postText: this.state.content,
      createdAt: null,
      idPost: this.state.post
    }).then(function(response) {
      thisSubmitComment.props.fetchComments();
    });
  }

  render() {
    return (<div className="ui comments">
      <form className="ui form">
        <div className="field">
          <textarea placeholder="Share big Amerikan opinion" rows="1" onChange={this.onChange}>
          </textarea>
        </div>
        <div className="field">
          <button className="small ui button" role="button" onClick={this.submitComment}>Comment</button>
        </div>
      </form>
    </div>);
  }
}

export default CommentInput;