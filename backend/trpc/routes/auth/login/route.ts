import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../../create-context";

export default publicProcedure
  .input(z.object({ 
    email: z.string().email(),
    password: z.string().min(1)
  }))
  .mutation(async ({ input, ctx }) => {
    const user = await ctx.storage.getUserByEmail(input.email);
    
    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid email or password',
      });
    }

    // In a real app, you'd compare hashed passwords
    // For demo purposes, we'll accept any password for the demo user
    if (user.email === 'demo@creativfusion.com' || input.password === 'password') {
      const token = Math.random().toString(36).substr(2, 15);
      const session = {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      };

      await ctx.storage.createSession(session);

      return {
        user: {
          id: user.id,
          email: user.email,
        },
        token,
      };
    }

    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Invalid email or password',
    });
  });