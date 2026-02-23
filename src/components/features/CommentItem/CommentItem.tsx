import React from 'react';
import './CommentItem.scss';
import { Comment } from '../../../types';
import { format } from 'date-fns';

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const formattedDate = format(new Date(comment.created_at), 'dd.MM.yyyy');

  return (
    <div className="comment-item">
      <div className="comment-item__header">
        <span className="comment-item__author">
          {comment.author_name}
        </span>
        <span className="comment-item__date">{formattedDate}</span>
      </div>
      <p className="comment-item__text">{comment.comment}</p>
    </div>
  );
};

export default CommentItem;