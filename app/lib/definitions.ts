export interface Props {
  children: React.ReactNode;
}

export interface User {
  id: number;
  name: string;
  email: string;
  hashedPassword: string;
  googleId: string;
  profileId: number | null;
  profilePicture: string | null;
}

export interface PostProps {
  post: PostWithAuthor;
  index: number;
  userId: number;
}

export interface TimeLineTabsProps {
  forYouPosts: PostWithAuthor[];
  discoverPosts: PostWithAuthor[];
  userId: number;
}

export interface Author {
  id: number;
  googleId: string;
  name: string;
  email: string;
  hashedPassword: string;
  profileId: number | null;
  profilePicture: string | null;
}
export interface Post {
  id: number;
  content: string;
  imageUrl: string | null;
  authorId: number | null;
  createdAt: Date;
  author: Author;
}

export interface PostWithAuthor {
  id: number;
  content: string;
  imageUrl: string | null;
  authorId: number;
  createdAt: Date;
  author: Author;
  likes: {
    id: number;
    authorId: number;
    postId: number;
    createdAt: Date;
  }[];
  comments: {
    id: number;
    content: string;
    authorId: number;
    postId: number;
    createdAt: Date;
    author: Author;
    commentLikes: CommentLike[];
  }[];
}

export interface PostProps {
  post: PostWithAuthor;
  index: number;
}

export interface UserSession {
  name: string;
  email: string;
  image: string;
  id: number;
}

export interface Friend {
  id: number;
  user1Id: number;
  user2Id: number;
  status: string;
}

export interface Profile {
  id: number;
  bio: string | null;
  dateOfBirth: Date | null;
  gender: string | null;
  userId: number | null;
}

export interface Message {
  id: number;
  content: string;
  senderId: number;
  receiverId: number;
  createdAt: string;
  read: boolean;
}

export enum FriendshipStatus {
  PENDING,
  ACCEPTED,
  DECLINED,
  BLOCKED,
}

export interface CommentLike {
  id: number;
  authorId: number;
  commentId: number;
  createdAt: Date;
  postId: number | null;
}

export interface Comment {
  id: number;
  content: string;
  authorId: number;
  postId: number;
  createdAt: Date;
  author: Author;
  commentLikes: CommentLike[];
}

export interface CommentProps {
  comments: Comment[];
  post: PostWithAuthor;
  userId: number;
}
