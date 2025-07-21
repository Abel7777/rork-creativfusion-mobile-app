import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../../create-context";

export default publicProcedure
  .input(z.object({ 
    id: z.string()
  }))
  .query(async ({ input, ctx }) => {
    const product = await ctx.storage.getProductById(input.id);
    
    if (!product) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Product not found',
      });
    }

    return product;
  });