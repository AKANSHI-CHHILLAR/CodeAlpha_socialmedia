import React from 'react';
import { Calendar, MapPin, Link as LinkIcon } from 'lucide-react';
import { useSocialMedia } from '../context/SocialMediaContext';
import { User } from '../types';

interface UserProfileProps {
  user: User;
  isOwnProfile?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, isOwnProfile = false }) => {
  const { currentUser, followUser, unfollowUser, posts } = useSocialMedia();
  
  const isFollowing = currentUser && currentUser.following.includes(user.id);
  const userPosts = posts.filter(post => post.userId === user.id);

  const handleFollowClick = () => {
    if (!currentUser) return;
    
    if (isFollowing) {
      unfollowUser(user.id);
    } else {
      followUser(user.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Cover Photo */}
      <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-600 rounded-t-lg"></div>
      
      {/* Profile Info */}
      <div className="p-6">
        <div className="flex items-start justify-between -mt-16">
          <div className="flex items-end space-x-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-24 w-24 rounded-full object-cover border-4 border-white bg-white"
            />
            <div className="pb-2">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">@{user.username}</p>
            </div>
          </div>
          
          {!isOwnProfile && currentUser && currentUser.id !== user.id && (
            <button
              onClick={handleFollowClick}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                isFollowing
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
        
        <div className="mt-4">
          <p className="text-gray-700 leading-relaxed">{user.bio}</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Joined {new Date(user.joinDate).toLocaleDateString('en-US', { 
              month: 'long', 
              year: 'numeric' 
            })}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-6 mt-4">
          <div className="flex items-center space-x-1">
            <span className="font-bold text-gray-900">{user.following.length}</span>
            <span className="text-gray-600">Following</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-bold text-gray-900">{user.followers.length}</span>
            <span className="text-gray-600">Followers</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-bold text-gray-900">{userPosts.length}</span>
            <span className="text-gray-600">Posts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;