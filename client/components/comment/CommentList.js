import React from 'react';
import Comment from './Comment.js';

const CommentList = (props) => {
  console.log('commentlist', props.comments);
  return (
    <div>
      {props.comments.map(comment => <Comment comment={comment} key={comment._id} />)}
    </div>
  );
};

export default CommentList;