import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useSocialMedia } from '../context/SocialMediaContext';
import { formatDate } from '../utils/dateUtils';
import { Post } from '../types';

interface CommentSectionProps {
  post: Post;
}

const CommentSection: React.FC<CommentSectionProps> = ({ post }) => {
  const { users, currentUser, addComment } = useSocialMedia();
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(post.id, commentText);
      setCommentText('');
    }
  };

  return (
    <div className="p-6 pt-4">
      {/* Existing Comments */}
      <div className="space-y-4 mb-4">
        {post.comments.map((comment) => {
          const commenter = users.find(user => user.id === comment.userId);
          if (!commenter) return null;

          return (
            <div key={comment.id} className="flex items-start space-x-3">
              <img
                src={commenter.avatar}
                alt={commenter.name}
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm text-gray-900">{commenter.name}</span>
                    <span className="text-xs text-gray-500">{formatDate(comment.timestamp)}</span>
                  </div>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Comment */}
      {currentUser && (
        <form onSubmit={handleSubmit} className="flex items-start space-x-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentSection;