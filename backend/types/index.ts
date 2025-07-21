export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'aiArt' | 'music' | 'prints';
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VaultItem {
  id: string;
  userId: string;
  title: string;
  category: 'music' | 'tutorials' | 'projects' | 'assets';
  assetUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthSession {
  userId: string;
  token: string;
  expiresAt: Date;
}