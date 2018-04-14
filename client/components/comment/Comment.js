import React from 'react';
import Moment from 'react-moment';

const Comment = (props) => (<div className="ui comments">
  <div className="comment">
    <a className="avatar">
      <img src={props.comment.profileImage}/>
    </a>
    <div className="content">
      <a className="author">{props.comment.author}</a>
      <div className="metadata">
        <div className="date"><Moment fromNow>{props.comment.createdAt}</Moment></div>
      </div>
      <div className="text">{props.comment.textComment}</div>
    </div>
  </div>
</div>
);

export default Comment;