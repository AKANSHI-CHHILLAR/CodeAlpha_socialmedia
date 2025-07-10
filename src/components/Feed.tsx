import React from 'react';
import { useSocialMedia } from '../context/SocialMediaContext';
import PostCard from './PostCard';
import CreatePost from './CreatePost';

const Feed: React.FC = () => {
  const { posts, currentUser } = useSocialMedia();

  // Filter posts to show only posts from followed users and own posts
  const feedPosts = posts.filter(post => {
    if (!currentUser) return false;
    return post.userId === currentUser.id || currentUser.following.includes(post.userId);
  });

  // Sort posts by timestamp (newest first)
  const sortedPosts = feedPosts.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="space-y-6">
      <CreatePost />
      
      <div className="space-y-6">
        {sortedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        
        {sortedPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts in your feed yet!</p>
            <p className="text-gray-400 mt-2">Follow some users to see their posts here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;