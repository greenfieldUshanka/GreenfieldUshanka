import React from 'react';
import axios from 'axios';
import CommentInput from '../comment/CommentInput.js';
import CommentList from '../comment/CommentList.js';
import Moment from 'moment';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      postId: this.props.post.id
    };
    this.fetchComments = this.fetchComments.bind(this);
  }

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments() {
    var thisPost = this;
    axios.get('/comments', {
      params: {
        id: this.state.postId
      }
    })
      .then(function (response) {
        thisPost.setState({
          comments: response.data
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div className="ui top attached segment">
          <div className="ui comments">
            <div className="comment">
              <a className="avatar">
                <img src="https://i.imgur.com/HbR0x7G.jpg"/>
              </a>
              <div className="content">
                <a className="author">{this.props.post.idAuthor}</a>
                <br />
                <div className="metadata">
                  {/* <div className="date"><Moment fromNow>{this.props.post.createdAt}</Moment></div> */}
                  <div className="rating">
                    <i className="star icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text">
            {this.props.post.postText}
          </div>
        </div>
        <div className="ui bottom attached segment">
          <CommentInput authorId={this.props.id} postId={this.state.postId} fetchComments={this.fetchComments}/>
          <CommentList comments={this.state.comments}/>
        </div>
      </div>
    );
  }
}
 
export default Post;