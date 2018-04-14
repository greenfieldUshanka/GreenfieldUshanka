import React from 'react';
import Post from './Post.js';

const PostList = (props) => {
  console.log('postlist', props.posts);
  return (
    <div>
      {props.posts.map(post => <div><Post id={props.id} post={post} key={post.id} fetchPostFeed={props.fetchPostFeed}/><br></br><br></br></div>)}
    </div>
  );
};

export default PostList;