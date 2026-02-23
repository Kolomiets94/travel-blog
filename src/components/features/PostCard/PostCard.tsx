import React from 'react';
import './PostCard.scss';
import { Post } from '../../../types';

interface PostCardProps {
  post: Post;
  onReadMore: (id: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onReadMore }) => {
  const excerpt = post.excerpt || 
    (post.description.length > 100 
      ? post.description.substring(0, 100) + '...' 
      : post.description);

  const imageUrl = post.photo || '/assets/images/Rectangle17.png';

  return (
    <article className="post-card">
      <div 
        className="post-card__image"
        style={{ 
          backgroundImage: `url(${imageUrl})` 
        }}
      />
      <div className="post-card__content">
        <h3 className="post-card__title">{post.title}</h3>
        <p className="post-card__excerpt">{excerpt}</p>
        <div className="post-card__location">
          <span className="post-card__country-city">{post.country}, {post.city}</span>
        </div>
        <button 
          className="post-card__link" 
          onClick={() => onReadMore(post.id)}
        >
          Подробнее
        </button>
      </div>
    </article>
  );
};

export default PostCard;