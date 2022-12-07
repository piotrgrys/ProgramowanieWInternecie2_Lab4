import { router } from "../trpc";
import { actorRouter } from "./actor";
import { authRouter } from "./auth";
import { genreRouter } from "./genre";
import { movieRouter } from "./movie";

export const appRouter = router({
  movie: movieRouter,
  auth: authRouter,
  genre: genreRouter,
  actor: actorRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
