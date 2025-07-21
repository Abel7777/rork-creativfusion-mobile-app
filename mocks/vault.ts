export interface VaultCategory {
  id: string;
  titleKey: string;
  icon: string;
  count: number;
}

export const mockVaultCategories: VaultCategory[] = [
  {
    id: '1',
    titleKey: 'vault.categories.music',
    icon: 'musical-notes-outline',
    count: 24
  },
  {
    id: '2',
    titleKey: 'vault.categories.tutorials',
    icon: 'play-circle-outline',
    count: 12
  },
  {
    id: '3',
    titleKey: 'vault.categories.projects',
    icon: 'folder-outline',
    count: 8
  },
  {
    id: '4',
    titleKey: 'vault.categories.assets',
    icon: 'images-outline',
    count: 156
  }
];