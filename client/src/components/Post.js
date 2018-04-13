import React from 'react';
import axios from 'axios';
import CommentInput from './CommentInput.js';
import CommentList from './CommentList.js';
import Moment from 'react-moment';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      postId: this.props.post.id
    }
    this.fetchComments = this.fetchComments.bind(this);
  }

  componentDidMount() {
    this.fetchComments();
  }

fetchComments() {
    var thisPost = this;
    console.log('starting get request for comments');
    axios.get('/comments', {
    params: {
      id: this.state.postId
    }
  })
    .then(function (response) {
      console.log('back in the client for comments', response);
      var reverseData = response.data.reverse();
      thisPost.setState({
        comments: reverseData
      });
    })
    .catch(function (err) {
      console.log(err);
    });
  }

render() {
    return (
     <div><div>
  <div className="ui top attached segment">
<div className="ui comments">
<div className="comment">
    <a className="avatar">
      {/*<img src={props.post.profile_image}/>*/}
      <img src="https://i.imgur.com/HbR0x7G.jpg"/>
    </a>
    <div className="content">
      <a className="author">{this.props.post.id_author}</a>
      <br></br>
      <div className="metadata">
        <div className="date"><Moment fromNow>{this.props.post.created_at}</Moment></div>
        <div className="rating">
          <i className="star icon"></i>{this.props.post.like_count}
        </div>
      </div>
    </div>
  </div>
</div>
<div className="text">{this.props.post.post_text}
      </div>
</div>
</div>
<div className="ui bottom attached segment">
  <CommentInput postId={this.state.postId} fetchComments={this.fetchComments}/>
  <CommentList comments={this.state.comments}/>
  </div>
  </div>
    )
  }
}
 
export default Post;