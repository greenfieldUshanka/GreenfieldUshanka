import React from 'react';
import axios from 'axios';
import CommentInput from './CommentInput.js';
import CommentList from './CommentList.js';

const Post = (props) => (<div><div>
  <div className="ui top attached segment">
<div className="ui comments">
<div className="comment">
    <a className="avatar">
      <img src={props.post.profile_image}/>
    </a>
    <div className="content">
      <a className="author">{props.post.id_author}</a>
      <br></br>
      <div className="metadata">
        <div className="date">{props.post.createdAt}</div>
        <div className="rating">
          <i className="star icon"></i>{props.post.like_count}
        </div>
      </div>
    </div>
  </div>
</div>
<div className="text">{props.post.post_text}
      </div>
</div>
</div>
<div className="ui bottom attached segment">
  <CommentList />
  <CommentInput />
  </div>
  </div>
);

export default Post;