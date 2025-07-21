import { z } from "zod";
import { protectedProcedure } from "../../../create-context";

export default protectedProcedure
  .input(z.object({ 
    category: z.enum(['music', 'tutorials', 'projects', 'assets']).optional()
  }).optional())
  .query(async ({ input, ctx }) => {
    if (input?.category) {
      return await ctx.storage.getVaultItemsByUserAndCategory(ctx.userId, input.category);
    }
    return await ctx.storage.getVaultItemsByUserId(ctx.userId);
  });