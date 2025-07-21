import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../../create-context";

export default publicProcedure
  .input(z.object({ 
    email: z.string().email(),
    password: z.string().min(6)
  }))
  .mutation(async ({ input, ctx }) => {
    const existingUser = await ctx.storage.getUserByEmail(input.email);
    
    if (existingUser) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'User with this email already exists',
      });
    }

    // In a real app, you'd hash the password
    const user = await ctx.storage.createUser({
      email: input.email,
      passwordHash: input.password, // This should be hashed in production
    });

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
  });