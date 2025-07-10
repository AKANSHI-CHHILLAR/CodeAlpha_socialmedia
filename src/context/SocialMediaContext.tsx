import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Post, Comment, SocialMediaContextType } from '../types';

const SocialMediaContext = createContext<SocialMediaContextType | undefined>(undefined);

const initialUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    username: 'sarahj',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    bio: 'Frontend developer & UI/UX enthusiast. Love creating beautiful digital experiences ✨',
    followers: ['2', '3', '4'],
    following: ['2', '3'],
    joinDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Alex Chen',
    username: 'alexc',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    bio: 'Full-stack developer | Coffee addict ☕ | Building the future, one line of code at a time',
    followers: ['1', '3', '4'],
    following: ['1', '4'],
    joinDate: '2023-02-20',
  },
  {
    id: '3',
    name: 'Maya Patel',
    username: 'mayap',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    bio: 'Data scientist & AI researcher. Passionate about machine learning and data visualization 📊',
    followers: ['1', '2', '4'],
    following: ['1', '2', '4'],
    joinDate: '2023-03-10',
  },
  {
    id: '4',
    name: 'David Rodriguez',
    username: 'davidr',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    bio: 'Product designer & creative director. Crafting meaningful experiences through design 🎨',
    followers: ['1', '2', '3'],
    following: ['1', '2', '3'],
    joinDate: '2023-04-05',
  },
];

const initialPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    content: 'Just finished working on a new React component library! The developer experience is incredible. Can\'t wait to share it with the community. 🚀',
    timestamp: '2024-01-20T10:30:00Z',
    likes: ['2', '3', '4'],
    comments: [
      {
        id: '1',
        postId: '1',
        userId: '2',
        content: 'This looks amazing! Can\'t wait to try it out.',
        timestamp: '2024-01-20T11:00:00Z',
      },
      {
        id: '2',
        postId: '1',
        userId: '3',
        content: 'The component architecture looks really clean!',
        timestamp: '2024-01-20T11:15:00Z',
      },
    ],
    imageUrl: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
  },
  {
    id: '2',
    userId: '2',
    content: 'Beautiful morning at the coffee shop. Perfect coding atmosphere! ☕️ Sometimes the best ideas come when you step away from your desk.',
    timestamp: '2024-01-20T08:45:00Z',
    likes: ['1', '3'],
    comments: [
      {
        id: '3',
        postId: '2',
        userId: '1',
        content: 'That place looks so cozy! Great spot for productivity.',
        timestamp: '2024-01-20T09:00:00Z',
      },
    ],
    imageUrl: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
  },
  {
    id: '3',
    userId: '3',
    content: 'Exciting breakthrough in our AI research project! The model performance exceeded our expectations by 15%. Data science never ceases to amaze me. 🤖✨',
    timestamp: '2024-01-19T16:20:00Z',
    likes: ['1', '2', '4'],
    comments: [],
  },
  {
    id: '4',
    userId: '4',
    content: 'Working on a new design system for our upcoming product launch. The color palette and typography choices are coming together beautifully! 🎨',
    timestamp: '2024-01-19T14:10:00Z',
    likes: ['1', '2'],
    comments: [
      {
        id: '4',
        postId: '4',
        userId: '1',
        content: 'The attention to detail in your designs is always impressive!',
        timestamp: '2024-01-19T14:30:00Z',
      },
    ],
    imageUrl: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
  },
];

export const SocialMediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUsers = localStorage.getItem('socialMediaUsers');
    const savedPosts = localStorage.getItem('socialMediaPosts');
    const savedCurrentUser = localStorage.getItem('socialMediaCurrentUser');

    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      setUsers(initialUsers);
      localStorage.setItem('socialMediaUsers', JSON.stringify(initialUsers));
    }

    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(initialPosts);
      localStorage.setItem('socialMediaPosts', JSON.stringify(initialPosts));
    }

    if (savedCurrentUser) {
      setCurrentUser(JSON.parse(savedCurrentUser));
    } else {
      setCurrentUser(initialUsers[0]);
      localStorage.setItem('socialMediaCurrentUser', JSON.stringify(initialUsers[0]));
    }
  }, []);

  const updateCurrentUser = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('socialMediaCurrentUser', JSON.stringify(user));
  };

  const addPost = (content: string, imageUrl?: string) => {
    if (!currentUser) return;

    const newPost: Post = {
      id: Date.now().toString(),
      userId: currentUser.id,
      content,
      timestamp: new Date().toISOString(),
      likes: [],
      comments: [],
      imageUrl,
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('socialMediaPosts', JSON.stringify(updatedPosts));
  };

  const likePost = (postId: string) => {
    if (!currentUser) return;

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const hasLiked = post.likes.includes(currentUser.id);
        return {
          ...post,
          likes: hasLiked 
            ? post.likes.filter(id => id !== currentUser.id)
            : [...post.likes, currentUser.id]
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    localStorage.setItem('socialMediaPosts', JSON.stringify(updatedPosts));
  };

  const addComment = (postId: string, content: string) => {
    if (!currentUser) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      postId,
      userId: currentUser.id,
      content,
      timestamp: new Date().toISOString(),
    };

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    localStorage.setItem('socialMediaPosts', JSON.stringify(updatedPosts));
  };

  const followUser = (userId: string) => {
    if (!currentUser || currentUser.id === userId) return;

    const updatedUsers = users.map(user => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          following: [...user.following, userId]
        };
      }
      if (user.id === userId) {
        return {
          ...user,
          followers: [...user.followers, currentUser.id]
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    localStorage.setItem('socialMediaUsers', JSON.stringify(updatedUsers));
    
    const updatedCurrentUser = updatedUsers.find(u => u.id === currentUser.id)!;
    updateCurrentUser(updatedCurrentUser);
  };

  const unfollowUser = (userId: string) => {
    if (!currentUser || currentUser.id === userId) return;

    const updatedUsers = users.map(user => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          following: user.following.filter(id => id !== userId)
        };
      }
      if (user.id === userId) {
        return {
          ...user,
          followers: user.followers.filter(id => id !== currentUser.id)
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    localStorage.setItem('socialMediaUsers', JSON.stringify(updatedUsers));
    
    const updatedCurrentUser = updatedUsers.find(u => u.id === currentUser.id)!;
    updateCurrentUser(updatedCurrentUser);
  };

  return (
    <SocialMediaContext.Provider value={{
      users,
      posts,
      currentUser,
      setCurrentUser: updateCurrentUser,
      addPost,
      likePost,
      addComment,
      followUser,
      unfollowUser,
    }}>
      {children}
    </SocialMediaContext.Provider>
  );
};

export const useSocialMedia = () => {
  const context = useContext(SocialMediaContext);
  if (!context) {
    throw new Error('useSocialMedia must be used within a SocialMediaProvider');
  }
  return context;
};