import React from 'react';
import axios from 'axios';

const Comment = (props) => (<div className="ui comments">
  <div className="comment">
    <a className="avatar">
      <img src={props.comment.profile_image}/>
    </a>
    <div className="content">
      <a className="author">{props.comment.id_author}</a>
      <div className="metadata">
        <div className="date">{props.comment.createdAt}</div>
      </div>
      <div className="text">{props.comment.post_text}</div>
    </div>
  </div>
</div>
);

export default Comment;