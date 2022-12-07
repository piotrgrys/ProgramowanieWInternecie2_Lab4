import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const genreRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.genre.findMany();
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.genre.findUnique({ where: { id: input } });
  }),
});
