import React from 'react';
import { useSocialMedia } from '../context/SocialMediaContext';
import PostCard from './PostCard';
import UserList from './UserList';

const Explore: React.FC = () => {
  const { posts } = useSocialMedia();

  // Sort all posts by timestamp (newest first)
  const sortedPosts = posts.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Posts */}
      <div className="lg:col-span-2 space-y-6">
        {sortedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {/* Sidebar */}
      <div className="space-y-6">
        <UserList />
      </div>
    </div>
  );
};

export default Explore;