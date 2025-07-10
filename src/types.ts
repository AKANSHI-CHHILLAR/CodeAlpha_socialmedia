export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: string[];
  following: string[];
  joinDate: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  likes: string[];
  comments: Comment[];
  imageUrl?: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  timestamp: string;
}

export interface SocialMediaContextType {
  users: User[];
  posts: Post[];
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  addPost: (content: string, imageUrl?: string) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
}