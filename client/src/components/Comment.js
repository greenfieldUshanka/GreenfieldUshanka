import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';

const Comment = (props) => (<div className="ui comments">
  <div className="comment">
    <a className="avatar">
      <img src={props.comment.profile_image}/>
    </a>
    <div className="content">
      <a className="author">Whoops</a>
      <div className="metadata">
        <div className="date"><Moment fromNow>{props.comment.created_at}</Moment></div>
      </div>
      <div className="text">{props.comment.text_comment}</div>
    </div>
  </div>
</div>
);

export default Comment;