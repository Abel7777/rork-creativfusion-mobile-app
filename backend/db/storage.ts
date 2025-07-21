import { User, Product, VaultItem, AuthSession } from '../types';

// In-memory storage (in production, this would be a real database)
class InMemoryStorage {
  private users: Map<string, User> = new Map();
  private products: Map<string, Product> = new Map();
  private vaultItems: Map<string, VaultItem> = new Map();
  private sessions: Map<string, AuthSession> = new Map();

  constructor() {
    this.seedData();
  }

  // Users
  async createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const newUser: User = {
      ...user,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(newUser.id, newUser);
    return newUser;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.products.get(id) || null;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.category === category);
  }

  // Vault Items
  async getVaultItemsByUserId(userId: string): Promise<VaultItem[]> {
    return Array.from(this.vaultItems.values()).filter(item => item.userId === userId);
  }

  async getVaultItemsByUserAndCategory(userId: string, category: string): Promise<VaultItem[]> {
    return Array.from(this.vaultItems.values()).filter(
      item => item.userId === userId && item.category === category
    );
  }

  // Sessions
  async createSession(session: AuthSession): Promise<void> {
    this.sessions.set(session.token, session);
  }

  async getSession(token: string): Promise<AuthSession | null> {
    const session = this.sessions.get(token);
    if (session && session.expiresAt > new Date()) {
      return session;
    }
    if (session) {
      this.sessions.delete(token);
    }
    return null;
  }

  async deleteSession(token: string): Promise<void> {
    this.sessions.delete(token);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private seedData(): void {
    // Seed products
    const products: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        title: 'Abstract Digital Art #1',
        price: 29.99,
        category: 'aiArt',
        imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop',
        description: 'A stunning abstract digital artwork created with AI technology.'
      },
      {
        title: 'Ambient Music Pack',
        price: 19.99,
        category: 'music',
        imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        description: 'Collection of ambient music tracks perfect for relaxation.'
      },
      {
        title: 'Minimalist Print Set',
        price: 39.99,
        category: 'prints',
        imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop',
        description: 'Set of 3 minimalist prints for modern home decor.'
      },
      {
        title: 'Cyberpunk Portrait',
        price: 49.99,
        category: 'aiArt',
        imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
        description: 'Futuristic cyberpunk-style portrait generated with AI.'
      },
      {
        title: 'Lo-Fi Hip Hop Beats',
        price: 24.99,
        category: 'music',
        imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        description: 'Chill lo-fi hip hop beats for studying and relaxation.'
      },
      {
        title: 'Nature Photography Print',
        price: 34.99,
        category: 'prints',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
        description: 'High-quality nature photography print on premium paper.'
      }
    ];

    products.forEach(product => {
      const newProduct: Product = {
        ...product,
        id: this.generateId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.products.set(newProduct.id, newProduct);
    });

    // Create a demo user
    const demoUser: User = {
      id: 'demo-user-1',
      email: 'demo@creativfusion.com',
      passwordHash: 'demo-hash', // In real app, this would be properly hashed
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(demoUser.id, demoUser);

    // Seed vault items for demo user
    const vaultItems: Omit<VaultItem, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        userId: demoUser.id,
        title: 'Classical Symphony Collection',
        category: 'music',
        assetUrl: 'https://example.com/music/classical.mp3'
      },
      {
        userId: demoUser.id,
        title: 'Digital Art Masterclass',
        category: 'tutorials',
        assetUrl: 'https://example.com/tutorials/digital-art.mp4'
      },
      {
        userId: demoUser.id,
        title: 'Brand Identity Project',
        category: 'projects',
        assetUrl: 'https://example.com/projects/brand-identity.zip'
      },
      {
        userId: demoUser.id,
        title: 'Premium Texture Pack',
        category: 'assets',
        assetUrl: 'https://example.com/assets/textures.zip'
      }
    ];

    vaultItems.forEach(item => {
      const newItem: VaultItem = {
        ...item,
        id: this.generateId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.vaultItems.set(newItem.id, newItem);
    });
  }
}

export const storage = new InMemoryStorage();