export interface Product {
  id: string;
  title: string;
  price: number;
  category: 'aiArt' | 'music' | 'prints';
  imageUrl: string;
  description: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Abstract Digital Art #1',
    price: 29.99,
    category: 'aiArt',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop',
    description: 'A stunning abstract digital artwork created with AI technology.'
  },
  {
    id: '2',
    title: 'Ambient Music Pack',
    price: 19.99,
    category: 'music',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    description: 'Collection of ambient music tracks perfect for relaxation.'
  },
  {
    id: '3',
    title: 'Minimalist Print Set',
    price: 39.99,
    category: 'prints',
    imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop',
    description: 'Set of 3 minimalist prints for modern home decor.'
  },
  {
    id: '4',
    title: 'Cyberpunk Portrait',
    price: 49.99,
    category: 'aiArt',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
    description: 'Futuristic cyberpunk-style portrait generated with AI.'
  },
  {
    id: '5',
    title: 'Lo-Fi Hip Hop Beats',
    price: 24.99,
    category: 'music',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    description: 'Chill lo-fi hip hop beats for studying and relaxation.'
  },
  {
    id: '6',
    title: 'Nature Photography Print',
    price: 34.99,
    category: 'prints',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    description: 'High-quality nature photography print on premium paper.'
  }
];

export const filterCategories = ['aiArt', 'music', 'prints'] as const;