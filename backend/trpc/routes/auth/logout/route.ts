import { protectedProcedure } from "../../../create-context";

export default protectedProcedure
  .mutation(async ({ ctx }) => {
    // In a real implementation, you'd get the token from the request
    // and delete the specific session
    return { success: true };
  });