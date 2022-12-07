import { useRouter } from "next/router";
import React from "react";
import MovieForm, { type MoviePayload } from "../../components/movie-form";
import { trpc } from "../../utils/trpc";

const Add = () => {
  const router = useRouter();
  const { isLoading, mutate, error } = trpc.movie.create.useMutation({
    onSuccess() {
      router.push("/");
    },
  });

  const onSubmit = (data: MoviePayload) => {
    mutate(data);
  };

  const errors = error?.data?.zodError?.fieldErrors;

  return (
    <MovieForm errors={errors} isLoading={isLoading} onSubmit={onSubmit} />
  );
};

export default Add;
