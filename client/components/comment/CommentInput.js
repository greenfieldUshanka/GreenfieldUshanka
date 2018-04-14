import React from 'react';
import axios from 'axios';

class CommentInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
    this.onChange = this.onChange.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }

  onChange (event) {
    this.setState({
      content: event.target.value
    });
  }

  submitComment(event) {
    let component = this;
    event.preventDefault();
    axios.post('/comments', {
      postText: component.state.content,
      authorId: component.props.authorId,
      idPost: component.props.postId
    }).then(function(response) {
      component.setState({
        content: ''
      });
      component.props.fetchComments();
    });
  }

  render() {
    return (<div className="ui comments">
      <form className="ui form">
        <div className="field">
          <textarea placeholder="Share big Amerikan opinion" rows="1" value={this.state.content} onChange={this.onChange}>
          </textarea>
        </div>
        <div className="field">
          <button className="small ui button" role="button" onClick={this.submitComment}>Komment</button>
        </div>
      </form>
    </div>);
  }
}

export default CommentInput;