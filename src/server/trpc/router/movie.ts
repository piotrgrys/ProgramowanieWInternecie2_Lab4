import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const movieRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.movie.findMany({ include: { genre: true} });
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.movie.findUnique({ where: { id: input }, include:{actors:true} });
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        year: z.number(),
        rating: z.number(),
        link: z.string().url(),
        genreId: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.movie.create({
        data: {
          title: input.title,
          year: input.year,
          rating: input.rating,
          link: input.link,
          genreId: input.genreId,
        },
      });
    }),
  edit: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        year: z.number(),
        rating: z.number(),
        link: z.string().url(),
        genreId: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.movie.update({
        data: {
          title: input.title,
          year: input.year,
          rating: input.rating,
          link: input.link,
          genreId: input.genreId,
        },
        where: { id: input.id },
      });
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.movie.delete({
        where: { id: input },
      });
    }),
});
