import React from 'react';
import Post from './Post.js';

const PostList = (props) => {
  return (
    <div>
      {props.posts.map((post, i) => <Post id={props.id} post={post} key={i} fetchPostFeed={props.fetchPostFeed}/>)}
    </div>
  );
};

export default PostList;