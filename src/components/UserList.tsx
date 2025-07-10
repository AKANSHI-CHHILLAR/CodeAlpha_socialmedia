import React from 'react';
import { Users } from 'lucide-react';
import { useSocialMedia } from '../context/SocialMediaContext';

const UserList: React.FC = () => {
  const { users, currentUser, followUser, unfollowUser } = useSocialMedia();

  const suggestedUsers = users.filter(user => 
    user.id !== currentUser?.id && !currentUser?.following.includes(user.id)
  );

  const handleFollowClick = (userId: string) => {
    if (!currentUser) return;
    
    const isFollowing = currentUser.following.includes(userId);
    if (isFollowing) {
      unfollowUser(userId);
    } else {
      followUser(userId);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Who to follow</h2>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
              </div>
              
              <button
                onClick={() => handleFollowClick(user.id)}
                className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors"
              >
                Follow
              </button>
            </div>
          ))}
        </div>
        
        {suggestedUsers.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No new users to follow!
          </p>
        )}
      </div>
    </div>
  );
};

export default UserList;