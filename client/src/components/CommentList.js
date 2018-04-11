import React from 'react';
import Comment from './Comment.js';

const CommentList = (comments) => {
  return (
    <div>
      {comments.map(comment => <Comment comment={comment} key={comment._id} />)}
    </div>
  );
}

export default CommentList;