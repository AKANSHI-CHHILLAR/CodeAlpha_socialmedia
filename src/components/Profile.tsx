import React from 'react';
import { useSocialMedia } from '../context/SocialMediaContext';
import UserProfile from './UserProfile';
import PostCard from './PostCard';

const Profile: React.FC = () => {
  const { currentUser, posts } = useSocialMedia();

  if (!currentUser) return null;

  const userPosts = posts
    .filter(post => post.userId === currentUser.id)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="space-y-6">
      <UserProfile user={currentUser} isOwnProfile={true} />
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Your Posts</h2>
        </div>
        
        <div className="p-6">
          {userPosts.length > 0 ? (
            <div className="space-y-6">
              {userPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">You haven't posted anything yet!</p>
              <p className="text-gray-400 mt-2">Share your thoughts with the community.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;