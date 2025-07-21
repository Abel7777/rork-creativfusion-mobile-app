import { protectedProcedure } from "../../../create-context";

export default protectedProcedure
  .query(async ({ ctx }) => {
    const items = await ctx.storage.getVaultItemsByUserId(ctx.userId);
    
    const categories = [
      { id: 'music', titleKey: 'vault.categories.music', icon: 'musical-notes-outline' },
      { id: 'tutorials', titleKey: 'vault.categories.tutorials', icon: 'play-circle-outline' },
      { id: 'projects', titleKey: 'vault.categories.projects', icon: 'folder-outline' },
      { id: 'assets', titleKey: 'vault.categories.assets', icon: 'images-outline' }
    ];

    return categories.map(category => ({
      ...category,
      count: items.filter(item => item.category === category.id).length
    }));
  });