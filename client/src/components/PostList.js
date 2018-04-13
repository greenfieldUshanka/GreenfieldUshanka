import React from 'react';
import Post from './Post.js';

const PostList = (props) => {
  console.log('postlist',props.posts);
  return (
    <div>
      {props.posts.map(post => <div><Post post={post} key={post._id} fetchPostFeed={props.fetchPostFeed}/><br></br><br></br></div>)}
    </div>
  );
}

export default PostList;