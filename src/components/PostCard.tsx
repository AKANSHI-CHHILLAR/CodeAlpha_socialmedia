import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';
import { useSocialMedia } from '../context/SocialMediaContext';
import { formatDate } from '../utils/dateUtils';
import { Post } from '../types';
import CommentSection from './CommentSection';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { users, currentUser, likePost } = useSocialMedia();
  const [showComments, setShowComments] = useState(false);
  
  const author = users.find(user => user.id === post.userId);
  const isLiked = currentUser && post.likes.includes(currentUser.id);

  if (!author) return null;

  const handleLike = () => {
    likePost(post.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      {/* Post Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={author.avatar}
              alt={author.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{author.name}</h3>
              <p className="text-sm text-gray-500">@{author.username} • {formatDate(post.timestamp)}</p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-6 pb-4">
        <p className="text-gray-900 leading-relaxed">{post.content}</p>
      </div>

      {/* Post Image */}
      {post.imageUrl && (
        <div className="px-6 pb-4">
          <img
            src={post.imageUrl}
            alt="Post content"
            className="w-full rounded-lg object-cover max-h-96"
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="px-6 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-colors ${
                isLiked ? 'text-red-500 hover:text-red-600' : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{post.likes.length}</span>
            </button>
            
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm font-medium">{post.comments.length}</span>
            </button>
            
            <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
              <Share className="h-5 w-5" />
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100">
          <CommentSection post={post} />
        </div>
      )}
    </div>
  );
};

export default PostCard;