import React from 'react';
import axios from 'axios';
import CommentInput from './CommentInput.js';
import CommentList from './CommentList.js';

const Post = (post) => (<div><div>
  <div className="ui top attached segment">
  {/*<a>{post.id_author}</a>
  <p>{post.createdAt}</p>
  <br></br>
  <p>{post.post_text}</p>
</div>*/}
<div className="ui comments">
<div className="comment">
    <a className="avatar">
      <img src=""/>
    </a>
    <div className="content">
      <a className="author">Stevie Feliciano</a>
      <br></br>
      <div className="metadata">
        <div className="date">2 days ago</div>
        <div className="rating">
          <i className="star icon"></i>
          5 Faves
        </div>
      </div>
    </div>
  </div>
</div>
<div className="text">
        Hey guys, I hope this example comment is helping you read this documentation.
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