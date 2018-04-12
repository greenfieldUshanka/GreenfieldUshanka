import React from 'react';
import Comment from './Comment.js';

const PostList = (props) => {
  return (
    <div>
      {props.posts.map(post => <Post post={post} key={post._id} />)}
    </div>
  );
}

export default PostList;