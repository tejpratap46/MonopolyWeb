import { Timestamp } from "firebase/firestore";

export interface User {
  uid: string;
  email: string;
  displayName?: string | null;
  profilePicture?: string | null;
  dateCreated: Timestamp | Date;
  lastLogin?: Timestamp | Date;

  // Optional additional user metadata
  phoneNumber?: string | null;
  emailVerified?: boolean;

  // Optional user roles or permissions
  role?: "user" | "admin" | "moderator";

  // Optional additional profile information
  firstName?: string;
  lastName?: string;
  bio?: string;

  // Social links (optional)
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

// Type for user creation input
export interface UserCreationInput {
  email: string;
  password: string;
  displayName?: string;
  profilePicture?: string;
}

// Type for user update input
export interface UserUpdateInput {
  displayName?: string;
  profilePicture?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  phoneNumber?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}
