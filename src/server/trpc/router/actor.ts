import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const actorRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.actor.findMany();
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.actor.findUnique({ where: { id: input } });
  }),
});
