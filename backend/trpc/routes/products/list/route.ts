import { z } from "zod";
import { publicProcedure } from "../../../create-context";

export default publicProcedure
  .input(z.object({ 
    category: z.enum(['aiArt', 'music', 'prints']).optional()
  }).optional())
  .query(async ({ input, ctx }) => {
    if (input?.category) {
      return await ctx.storage.getProductsByCategory(input.category);
    }
    return await ctx.storage.getProducts();
  });